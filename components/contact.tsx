"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactEmail, contactMaxLength, contactMessageSchema, type ContactMessage } from "@/lib/contact"
import { Github, Mail, MapPin, Phone, CheckCircle, ExternalLink, Loader2 } from "lucide-react"
import { DouyinIcon, KuaishouIcon, BilibiliIcon, XiaohongshuIcon, GiteeIcon } from "./social-icons"
import ResumeDownloadButton from "./resume-download-button"

const emptyForm: ContactMessage = { name: "", email: "", subject: "", message: "" }
const maxDraftUrlLength = 5000
type FormErrors = Partial<Record<keyof ContactMessage, string[]>>
type Submission =
  | { status: "idle" | "submitting" }
  | { status: "success" | "error"; message: string }

function getEmailDraft(form: ContactMessage) {
  const subject = form.subject.trim() || "简历站联系"
  const details = [
    form.name.trim() && "姓名：" + form.name.trim(),
    form.email.trim() && "联系邮箱：" + form.email.trim(),
  ].filter(Boolean).join("\n")
  const body = [form.message.trim(), details].filter(Boolean).join("\n\n")

  const gmail = new URL("https://mail.google.com/mail/")
  gmail.search = new URLSearchParams({ view: "cm", fs: "1", to: contactEmail, su: subject, body }).toString()
  // Long, percent-encoded messages can exceed Gmail's URL limit.
  const copyBody = gmail.href.length > maxDraftUrlLength
  if (copyBody) gmail.searchParams.delete("body")

  const native = new URLSearchParams({ subject })
  if (!copyBody) native.set("body", body.replace(/\r?\n/g, "\r\n"))
  const mailto = "mailto:" + contactEmail + "?" + native.toString().replace(/\+/g, "%20")
  return { gmail: gmail.href, mailto, body, copyBody }
}

export default function Contact({ canSubmit }: { canSubmit: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submission, setSubmission] = useState<Submission>({ status: "idle" })
  const [copyNotice, setCopyNotice] = useState("")
  const submissionState = submission.status
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleInputChange = (field: keyof ContactMessage, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setCopyNotice("")
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (submissionState === "success" || submissionState === "error") setSubmission({ status: "idle" })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSubmit || submitting.current) return
    const payload = contactMessageSchema.safeParse(formData)
    if (!payload.success) {
      setErrors(payload.error.flatten().fieldErrors)
      setSubmission({ status: "error", message: "请检查标出的字段。" })
      return
    }

    submitting.current = true
    setSubmission({ status: "submitting" })
    const fallback = "暂时无法确认发送结果。"
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.data),
      })
      const result = await response.json()
      if (response.ok && typeof result.message === "string") {
        setFormData(emptyForm)
        setSubmission({ status: "success", message: result.message })
        return
      }
      setSubmission({ status: "error", message: typeof result.message === "string" ? result.message : fallback })
    } catch {
      setSubmission({ status: "error", message: fallback })
    } finally {
      submitting.current = false
    }
  }

  const emailDraft = getEmailDraft(formData)
  const copyDraftBody = async () => {
    try {
      await navigator.clipboard.writeText(emailDraft.body)
      setCopyNotice("正文已复制，到写信窗口粘贴即可。")
    } catch {
      setCopyNotice("复制失败，请手动复制上方留言内容。")
    }
  }

  // Get button content based on submission state
  const getButtonContent = () => {
    switch (submissionState) {
      case "submitting":
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            发送中...
          </>
        )
      case "success":
        return (
          <>
            <CheckCircle className="h-4 w-4" />
            已提交
          </>
        )
      default:
        return "发送消息"
    }
  }

  // Don't render dynamic content during SSR to avoid hydration issues
  if (!isClient) {
    return (
      <section id="contact" ref={ref} className="py-20 bg-muted/10 backdrop-blur-sm relative">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="space-y-2 text-center mb-16">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm">
              联系方式
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">联系我</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              有项目想法或想讨论合作机会？我很乐意听到您的声音。
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">联系信息</h3>
                <p className="text-muted-foreground">
                  欢迎通过以下任何方式与我联系。我始终乐于讨论新项目、创意想法或合作机会。
                </p>
              </div>
            </div>
            <div>
              <Card className="bg-background/50 backdrop-blur-sm border-muted/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center text-muted-foreground">正在加载联系表单...</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" ref={ref} className="py-20 bg-muted/10 backdrop-blur-sm relative">
      {/* Animated background waves */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(45deg, transparent 30%, #3b82f6 50%, transparent 70%), 
                        linear-gradient(-45deg, transparent 30%, #8b5cf6 50%, transparent 70%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-2 text-center mb-16"
        >
          <Badge variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm">
            联系方式
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">联系我</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">有项目想法或想讨论合作机会？我很乐意听到您的声音。</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">联系信息</h3>
              <p className="text-muted-foreground">
                欢迎通过以下任何方式与我联系。我始终乐于讨论新项目、创意想法或合作机会。
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: Mail, label: "邮箱", value: contactEmail, href: "mailto:" + contactEmail },
                { icon: Phone, label: "电话", value: "+86 136 1693 2995" },
                { icon: MapPin, label: "位置", value: "福州，福建省" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="bg-background/50 backdrop-blur-sm border-muted/20 hover:border-primary/20 transition-all duration-300">
                    <CardContent className="flex items-center gap-4 p-4">
                      <motion.div
                        className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-3 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-medium hover:underline">{item.value}</a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Resume Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="font-medium">获取我的简历</h4>
              <ResumeDownloadButton variant="card" />
            </motion.div>

            <div className="space-y-4">
              <h4 className="font-medium">社交媒体</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/Hanyeweiyang",
                    label: "GitHub",
                    color: "hover:text-gray-900 dark:hover:text-white",
                    bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
                  },
                  {
                    icon: GiteeIcon,
                    href: "https://gitee.com/hanyeweiyang",
                    label: "Gitee",
                    color: "hover:text-red-600",
                    bgColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
                  },
                  {
                    icon: DouyinIcon,
                    href: "https://www.douyin.com/user/MS4wLjABAAAAPmVGFR9EI1mJ7UerU7e2LvM5ifv2FoybOuT1sJuHhTu5igHhV_SoWlcTUB2VlXZJ?from_tab_name=main",
                    label: "抖音",
                    color: "hover:text-black dark:hover:text-white",
                    bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
                  },
                  {
                    icon: KuaishouIcon,
                    href: "https://www.kuaishou.com/profile/3xecm9wvvrc3hqg",
                    label: "快手",
                    color: "hover:text-orange-500",
                    bgColor: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
                  },
                  {
                    icon: BilibiliIcon,
                    href: "https://space.bilibili.com/36657163?spm_id_from=333.337.0.0",
                    label: "哔哩哔哩",
                    color: "hover:text-pink-500",
                    bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
                  },
                  {
                    icon: XiaohongshuIcon,
                    href: "https://www.xiaohongshu.com/user/profile/65dc9ab1000000000500a0f6?xsec_token=ABo-IAzKpdlIhhpl7m9Jp9wFyyz3F4_ydjOCyymPPTOxg%3D&xsec_source=pc_search&m_source=bingpz",
                    label: "小红书",
                    color: "hover:text-red-500",
                    bgColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className={`bg-background/50 backdrop-blur-sm transition-all duration-300 border-muted/20 ${social.color} ${social.bgColor} hover:border-primary/20 hover:shadow-lg`}
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.label}</span>
                      </a>
                    </Button>
                    <span className="text-xs text-muted-foreground text-center font-medium">{social.label}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="text-xs text-muted-foreground/80 text-center mt-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                关注我的社交媒体获取最新动态
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:flex lg:flex-col"
          >
            <Card className="border-muted/20 bg-background/50 backdrop-blur-sm lg:flex lg:grow lg:flex-col">
              <CardContent className="p-6 lg:flex lg:grow lg:flex-col">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 lg:grow">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Label htmlFor="name">姓名{canSubmit && " *"}</Label>
                      <Input
                        id="name"
                        autoComplete="name"
                        required={canSubmit}
                        maxLength={contactMaxLength.name}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        placeholder="您的姓名"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`bg-background/50 ${errors.name ? "border-destructive" : ""}`}
                        disabled={submissionState === "submitting"}
                      />
                      {errors.name && (
                        <motion.p
                          id="contact-name-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.name[0]}
                        </motion.p>
                      )}
                    </motion.div>
                    <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Label htmlFor="email">邮箱{canSubmit && " *"}</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required={canSubmit}
                        maxLength={contactMaxLength.email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        placeholder="您的邮箱"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`bg-background/50 ${errors.email ? "border-destructive" : ""}`}
                        disabled={submissionState === "submitting"}
                      />
                      {errors.email && (
                        <motion.p
                          id="contact-email-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.email[0]}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Label htmlFor="subject">主题{canSubmit && " *"}</Label>
                    <Input
                      id="subject"
                      required={canSubmit}
                      maxLength={contactMaxLength.subject}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      placeholder="我能为您做些什么？"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`bg-background/50 ${errors.subject ? "border-destructive" : ""}`}
                      disabled={submissionState === "submitting"}
                    />
                    {errors.subject && (
                      <motion.p
                        id="contact-subject-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.subject[0]}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div className="flex flex-col gap-2 lg:grow" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Label htmlFor="message">留言{canSubmit && " *"}</Label>
                    <Textarea
                      id="message"
                      required={canSubmit}
                      maxLength={contactMaxLength.message}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      placeholder="告诉我您的项目..."
                      className={`min-h-[150px] bg-background/50 lg:grow ${errors.message ? "border-destructive" : ""}`}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      disabled={submissionState === "submitting"}
                    />
                    {errors.message && (
                      <motion.p
                        id="contact-message-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.message[0]}
                      </motion.p>
                    )}
                  </motion.div>

                  {canSubmit && (
                    <motion.div
                      whileHover={{ scale: submissionState === "submitting" ? 1 : 1.02 }}
                      whileTap={{ scale: submissionState === "submitting" ? 1 : 0.98 }}
                    >
                      <Button
                        type="submit"
                        className={`w-full transition-all duration-300 ${
                          submissionState === "success"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                        }`}
                        disabled={submissionState === "submitting"}
                      >
                        {getButtonContent()}
                      </Button>
                    </motion.div>
                  )}

                  <div className="space-y-2 text-center">
                    {canSubmit && (
                      <div role="status" className={submissionState === "error" ? "text-sm text-destructive" : "text-sm"}>
                        {"message" in submission ? submission.message : null}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                      <Button
                        asChild
                        size={canSubmit ? "sm" : "default"}
                        variant={canSubmit ? "outline" : "default"}
                        className={canSubmit ? undefined : "w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"}
                      >
                        <a href={emailDraft.gmail} target="_blank" rel="noopener noreferrer">
                          在 Gmail 写邮件
                          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <a href={emailDraft.mailto} className="text-sm font-medium text-primary underline">
                        用邮件客户端写信
                      </a>
                    </div>
                    {emailDraft.copyBody && (
                      <div className="text-xs text-muted-foreground">
                        留言较长，可先{" "}
                        <button type="button" onClick={copyDraftBody} className="font-medium text-primary underline">
                          复制正文
                        </button>
                        {" "}再到写信窗口粘贴。
                        <p role="status">{copyNotice}</p>
                      </div>
                    )}
                    {canSubmit && <p className="text-xs text-muted-foreground">站内留言同一 IP 每 24 小时可提交一次。</p>}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
