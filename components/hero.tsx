"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Download, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollToNextSection = () => {
    const nextSection = scrollRef.current?.nextElementSibling
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  const handleResumeDownload = async () => {
    setIsDownloading(true)

    try {
      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real application, you would trigger the actual download here
      // For demo purposes, we'll show a success message
      toast({
        title: "简历下载成功！",
        description: "感谢您对我的关注，简历已开始下载。",
      })

      // Simulate file download
      const link = document.createElement("a")
      link.href = "/resume.pdf" // This would be your actual resume file
      link.download = "郑嘉煌_全栈开发工程师_简历.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({
        title: "下载失败",
        description: "简历下载遇到问题，请稍后重试或直接联系我。",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section
      ref={scrollRef}
      className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ 
            willChange: 'background-position', 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
      </div>

      {/* Floating elements */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -20, null],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{ 
                willChange: 'transform, opacity', 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          ))}
        </div>
      )}

      <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-medium text-primary"
            >
              您好，我是
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent"
              style={{ 
                willChange: 'transform', 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              郑嘉煌
            </motion.h1>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl sm:text-3xl font-medium text-muted-foreground"
              style={{ 
                willChange: 'transform', 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              全栈开发工程师
            </motion.h3>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-muted-foreground max-w-md"
            style={{ 
              willChange: 'transform', 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            我专注于使用现代Web技术构建卓越的数字体验，注重性能优化、可访问性和精美的设计。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
            style={{ 
              willChange: 'transform', 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Contact Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none"
              style={{ 
                willChange: 'transform', 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground font-semibold px-8 py-3 h-12 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                aria-label="联系我，讨论项目合作"
              >
                <span>联系我</span>
              </Button>
            </motion.div>

            {/* Enhanced Resume Download Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none"
              style={{ 
                willChange: 'transform', 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={handleResumeDownload}
                disabled={isDownloading}
                className="group w-full sm:w-auto relative overflow-hidden bg-background/80 backdrop-blur-sm border-2 border-muted/40 hover:border-primary/60 text-foreground hover:text-primary font-semibold px-6 py-3 h-12 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label={isDownloading ? "正在下载简历" : "下载我的简历PDF文件"}
              >
                {/* Background gradient effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Button content */}
                <div className="relative flex items-center gap-2.5">
                  {isDownloading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        style={{ 
                          willChange: 'transform', 
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <Download className="h-5 w-5" />
                      </motion.div>
                      <span className="hidden sm:inline">下载中...</span>
                      <span className="sm:hidden">下载中</span>
                    </>
                  ) : (
                    <>
                      <motion.div className="flex items-center" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}
                        style={{ 
                          willChange: 'transform', 
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        <Download className="h-4 w-4 -ml-1" />
                      </motion.div>
                      <span className="hidden sm:inline">下载简历</span>
                      <span className="sm:hidden">简历</span>
                    </>
                  )}
                </div>

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-md border-2 border-primary/20 opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileHover={{
                    scale: [1, 1.02, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  style={{ 
                    willChange: 'transform, opacity', 
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Resume Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
            style={{ 
              willChange: 'transform', 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <FileText className="h-4 w-4" />
            <span>PDF格式 • 最后更新：2025年7月</span>
            <motion.div whileHover={{ scale: 1.1 }} className="ml-2"
              style={{ 
                willChange: 'transform', 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="h-6 px-2 text-xs hover:text-primary transition-colors"
                aria-label="在新窗口预览简历"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                预览
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative aspect-square max-w-md mx-auto lg:ml-auto"
          style={{ 
            willChange: 'transform', 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ 
              willChange: 'transform', 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
          <motion.div
            className="relative h-full w-full rounded-full border border-muted/20 overflow-hidden backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ 
              willChange: 'transform', 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <Image src="/placeholder.svg?height=500&width=500" alt="郑嘉煌" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute bottom-8 z-10"
        style={{ 
          willChange: 'transform', 
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <Button variant="ghost" size="icon" onClick={scrollToNextSection}>
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">向下滚动</span>
        </Button>
      </motion.div>
    </section>
  )
}
