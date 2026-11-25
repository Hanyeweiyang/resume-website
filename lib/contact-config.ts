import { z } from "zod"

const contactConfigSchema = z.object({
  QQ_SMTP_AUTH_CODE: z.string().trim().min(1),
  CONTACT_IP_HASH_SECRET: z.string().min(32),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
})

export type ContactConfig = z.infer<typeof contactConfigSchema>

export function getContactConfig(): ContactConfig | undefined {
  const config = contactConfigSchema.safeParse(process.env)
  if (!config.success) return

  const redisUrl = new URL(config.data.UPSTASH_REDIS_REST_URL)
  const localRedis = process.env.NODE_ENV === "development"
    && redisUrl.protocol === "http:"
    && redisUrl.hostname === "127.0.0.1"

  if (redisUrl.protocol === "https:" || localRedis) return config.data
}
