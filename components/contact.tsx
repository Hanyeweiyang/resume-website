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
import { toast } from "@/components/ui/use-toast"
import { Github, Mail, MapPin, Phone, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { DouyinIcon, KuaishouIcon, BilibiliIcon, XiaohongshuIcon, GiteeIcon } from "./social-icons"

// Form validation types
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

// Form submission states
type SubmissionState = "idle" | "submitting" | "success" | "error"

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Form state management
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle")
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "姓名不能为空"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "姓名至少需要2个字符"
    }

    if (!formData.email.trim()) {
      newErrors.email = "邮箱不能为空"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "主题不能为空"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "主题至少需要5个字符"
    }

    if (!formData.message.trim()) {
      newErrors.message = "留言不能为空"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "留言至少需要10个字符"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Simulate form submission with realistic scenarios
  const submitForm = async (data: FormData): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000))

    // Simulate different outcomes based on email domain (for demo purposes)
    const emailDomain = data.email.split("@")[1]?.toLowerCase()

    // Simulate server errors for certain domains
    if (emailDomain === "error.com") {
      throw new Error("服务器暂时无法处理您的请求，请稍后重试")
    }

    if (emailDomain === "timeout.com") {
      throw new Error("请求超时，请检查您的网络连接")
    }

    // Simulate validation errors
    if (data.message.toLowerCase().includes("spam")) {
      return {
        success: false,
        message: "检测到可疑内容，请修改您的留言后重试",
      }
    }

    // Success case
    return {
      success: true,
      message: "感谢您的留言！我会在24小时内回复您。",
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "表单验证失败",
        description: "请检查并修正表单中的错误",
        variant: "destructive",
      })
      return
    }

    setSubmissionState("submitting")

    try {
      const result = await submitForm(formData)

      if (result.success) {
        setSubmissionState("success")
        toast({
          title: "消息发送成功！",
          description: result.message,
        })

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset submission state after showing success
        setTimeout(() => {
          setSubmissionState("idle")
        }, 3000)
      } else {
        setSubmissionState("error")
        toast({
          title: "发送失败",
          description: result.message,
          variant: "destructive",
        })

        setTimeout(() => {
          setSubmissionState("idle")
        }, 3000)
      }
    } catch (error) {
      setSubmissionState("error")
      const errorMessage = error instanceof Error ? error.message : "发送失败，请稍后重试"

      toast({
        title: "发送失败",
        description: errorMessage,
        variant: "destructive",
      })

      setTimeout(() => {
        setSubmissionState("idle")
      }, 3000)
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
            发送成功
          </>
        )
      case "error":
        return (
          <>
            <XCircle className="h-4 w-4" />
            发送失败
          </>
        )
      default:
        return "发送消息"
    }
  }

  // Get button variant based on submission state
  const getButtonVariant = () => {
    switch (submissionState) {
      case "success":
        return "default"
      case "error":
        return "destructive"
      default:
        return "default"
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
                { icon: Mail, label: "邮箱", value: "zheng.jiahuang@example.com" },
                { icon: Phone, label: "电话", value: "+86 138 0000 0000" },
                { icon: MapPin, label: "位置", value: "深圳，广东省" },
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
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">社交媒体</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/zhengjiahuang",
                    label: "GitHub",
                    color: "hover:text-gray-900 dark:hover:text-white",
                    bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
                  },
                  {
                    icon: GiteeIcon,
                    href: "https://gitee.com/zhengjiahuang",
                    label: "Gitee",
                    color: "hover:text-red-600",
                    bgColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
                  },
                  {
                    icon: DouyinIcon,
                    href: "https://www.douyin.com/user/zhengjiahuang",
                    label: "抖音",
                    color: "hover:text-black dark:hover:text-white",
                    bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
                  },
                  {
                    icon: KuaishouIcon,
                    href: "https://www.kuaishou.com/profile/zhengjiahuang",
                    label: "快手",
                    color: "hover:text-orange-500",
                    bgColor: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
                  },
                  {
                    icon: BilibiliIcon,
                    href: "https://space.bilibili.com/zhengjiahuang",
                    label: "哔哩哔哩",
                    color: "hover:text-pink-500",
                    bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
                  },
                  {
                    icon: XiaohongshuIcon,
                    href: "https://www.xiaohongshu.com/user/profile/zhengjiahuang",
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
          >
            <Card className="bg-background/50 backdrop-blur-sm border-muted/20">
              <CardContent className="p-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Label htmlFor="name">姓名 *</Label>
                      <Input
                        id="name"
                        placeholder="您的姓名"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`bg-background/50 ${errors.name ? "border-destructive" : ""}`}
                        disabled={submissionState === "submitting"}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>
                    <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Label htmlFor="email">邮箱 *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="您的邮箱"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`bg-background/50 ${errors.email ? "border-destructive" : ""}`}
                        disabled={submissionState === "submitting"}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Label htmlFor="subject">主题 *</Label>
                    <Input
                      id="subject"
                      placeholder="我能为您做些什么？"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`bg-background/50 ${errors.subject ? "border-destructive" : ""}`}
                      disabled={submissionState === "submitting"}
                    />
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Label htmlFor="message">留言 *</Label>
                    <Textarea
                      id="message"
                      placeholder="告诉我您的项目..."
                      className={`min-h-[150px] bg-background/50 ${errors.message ? "border-destructive" : ""}`}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      disabled={submissionState === "submitting"}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: submissionState === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: submissionState === "submitting" ? 1 : 0.98 }}
                  >
                    <Button
                      type="submit"
                      className={`w-full transition-all duration-300 ${
                        submissionState === "success"
                          ? "bg-green-600 hover:bg-green-700"
                          : submissionState === "error"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      }`}
                      disabled={submissionState === "submitting"}
                      variant={getButtonVariant()}
                    >
                      {getButtonContent()}
                    </Button>
                  </motion.div>

                  <motion.p
                    className="text-xs text-muted-foreground text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    * 必填字段。您的信息将被安全处理，不会与第三方共享。
                  </motion.p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
