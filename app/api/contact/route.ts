import { createHmac, randomUUID } from "node:crypto"
import { isIP, SocketAddress } from "node:net"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { contactEmail, contactMessageSchema } from "@/lib/contact"
import { getContactConfig, type ContactConfig } from "@/lib/contact-config"

export const runtime = "nodejs"

const quotaSeconds = 24 * 60 * 60
const maxBodyBytes = 16 * 1024

const reserveQuota = `
  if redis.call("SET", KEYS[1], ARGV[1], "NX", "EX", ARGV[2]) then
    return 0
  end
  return math.max(redis.call("TTL", KEYS[1]), 1)
`
const releaseQuota = `
  if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
  end
  return 0
`

function response(message: string, status: number, retryAfter?: number) {
  return NextResponse.json({ message }, {
    status,
    headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
  })
}

function clientIp(request: Request) {
  if (process.env.NODE_ENV === "development" && process.env.VERCEL !== "1") return "127.0.0.1"
  const ip = request.headers.get("x-vercel-forwarded-for")?.trim()
  if (process.env.VERCEL !== "1" || !ip || ip.includes("%")) return

  const version = isIP(ip)
  if (version === 4) return ip
  if (version === 6) {
    const normalized = new SocketAddress({ address: ip, family: "ipv6" }).address
    return normalized.replace(/^::ffff:(?=\d+\.)/, "")
  }
}

async function quotaCommand(config: ContactConfig, script: string, key: string, ...arguments_: (string | number)[]) {
  const result = await fetch(config.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.UPSTASH_REDIS_REST_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["EVAL", script, 1, key, ...arguments_]),
    signal: AbortSignal.timeout(4000),
    redirect: "error",
    cache: "no-store",
  })
  if (!result.ok) throw new Error("Redis request failed")
  const { result: value } = await result.json()
  if (!Number.isInteger(value) || value < 0) throw new Error("Unexpected Redis response")
  return value as number
}

async function readPayload(request: Request) {
  const reader = request.body?.getReader()
  if (!reader) return { tooLarge: false, data: null }

  const decoder = new TextDecoder("utf-8", { fatal: true })
  let body = ""
  let bytes = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > maxBodyBytes) {
      await reader.cancel()
      return { tooLarge: true }
    }
    body += decoder.decode(value, { stream: true })
  }
  return { tooLarge: false, data: JSON.parse(body + decoder.decode()) as unknown }
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return response("请通过页面提交留言。", 415)
  }
  const body = await readPayload(request).catch(() => null)
  if (body?.tooLarge) return response("留言内容过长，请缩短后重试。", 413)
  const message = contactMessageSchema.safeParse(body?.data)
  if (!message.success) return response("请检查姓名、邮箱、主题和留言。", 400)

  const config = getContactConfig()
  const ip = clientIp(request)
  if (!config || !ip) {
    return response("在线留言暂不可用。", 503)
  }

  const hashedIp = createHmac("sha256", config.CONTACT_IP_HASH_SECRET).update(ip).digest("hex")
  const quotaKey = "resume-website:contact:" + (process.env.VERCEL_ENV ?? process.env.NODE_ENV) + ":" + hashedIp
  const reservationId = randomUUID()
  try {
    const retryAfter = await quotaCommand(config, reserveQuota, quotaKey, reservationId, quotaSeconds)
    if (retryAfter > 0) {
      return response("同一网络 24 小时内只能提交一次。", 429, retryAfter)
    }
  } catch {
    console.error("Contact form: rate limiter unavailable")
    return response("在线留言暂不可用。", 503)
  }

  const transport = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: { user: contactEmail, pass: config.QQ_SMTP_AUTH_CODE },
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  })
  const { name, email, subject, message: text } = message.data
  let rejected = false
  try {
    const sent = await transport.sendMail({
      from: { name: "简历站留言", address: contactEmail },
      to: contactEmail,
      replyTo: email,
      subject: "[简历站留言] " + subject,
      text: "姓名：" + name + "\n回复邮箱：" + email + "\n\n" + text,
      signal: AbortSignal.timeout(18000),
    })
    if (sent.accepted.length > 0) return response("留言已提交。谢谢你的联系！", 200)
    rejected = true
  } catch (error) {
    const { code, responseCode } = error as {
      code?: string
      responseCode?: number
    }
    // An interrupted SMTP connection can leave delivery uncertain after the message body is sent.
    rejected = (typeof responseCode === "number" && responseCode >= 400 && responseCode < 600)
      || code === "EAUTH" || code === "EDNS"
    console.error("Contact form: SMTP send was not confirmed", { rejected })
  }
  if (rejected) {
    await quotaCommand(config, releaseQuota, quotaKey, reservationId).catch(() => {
      console.error("Contact form: could not release rate-limit reservation")
    })
    return response("邮件暂时发送失败，请稍后重试。", 503)
  }
  return response("暂时无法确认留言是否已发出。", 503)
}
