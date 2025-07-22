"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"

interface ResumeDownloadButtonProps {
  variant?: "default" | "card" | "minimal"
  size?: "sm" | "md" | "lg"
  showPreview?: boolean
  className?: string
}

export default function ResumeDownloadButton({
  variant = "default",
  size = "md",
  showPreview = true,
  className = "",
}: ResumeDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleResumeDownload = async () => {
    setIsDownloading(true)

    try {
      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "简历下载成功！",
        description: "感谢您对我的关注，简历已开始下载。",
      })

      // Simulate file download
      const link = document.createElement("a")
      link.href = "/resume.pdf"
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

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-9 px-4 text-sm"
      case "lg":
        return "h-12 px-8 text-base"
      default:
        return "h-10 px-6 text-sm"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "lg":
        return "h-5 w-5"
      default:
        return "h-4 w-4"
    }
  }

  if (variant === "card") {
    return (
      <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={className}>
        <Card className="bg-background/50 backdrop-blur-sm border-muted/20 hover:border-primary/20 transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-3 rounded-full group-hover:from-primary/20 group-hover:to-purple-500/20 transition-all duration-300">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">我的简历</h3>
                  <p className="text-sm text-muted-foreground">PDF格式 • 最后更新：2024年1月</p>
                </div>
              </div>
              <Button
                onClick={handleResumeDownload}
                disabled={isDownloading}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (variant === "minimal") {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={className}>
        <Button
          variant="ghost"
          onClick={handleResumeDownload}
          disabled={isDownloading}
          className={`group relative ${getSizeClasses()} hover:bg-primary/10 focus:ring-2 focus:ring-primary/20`}
          aria-label={isDownloading ? "正在下载简历" : "下载我的简历PDF文件"}
        >
          <div className="flex items-center gap-2">
            {isDownloading ? (
              <Loader2 className={`${getIconSize()} animate-spin`} />
            ) : (
              <Download className={`${getIconSize()} group-hover:text-primary transition-colors`} />
            )}
            <span className="group-hover:text-primary transition-colors">
              {isDownloading ? "下载中..." : "下载简历"}
            </span>
          </div>
        </Button>
      </motion.div>
    )
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleResumeDownload}
          disabled={isDownloading}
          className={`group relative overflow-hidden bg-background/80 backdrop-blur-sm border-2 border-muted/40 hover:border-primary/60 text-foreground hover:text-primary font-semibold transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-70 ${getSizeClasses()}`}
          variant="outline"
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
                >
                  <Download className={getIconSize()} />
                </motion.div>
                <span>下载中...</span>
              </>
            ) : (
              <>
                <motion.div className="flex items-center" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <FileText className={`${getIconSize()} mr-1`} />
                  <Download className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"} -ml-1`} />
                </motion.div>
                <span>下载简历</span>
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
          />
        </Button>
      </motion.div>

      {/* Additional Resume Info */}
      {showPreview && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-3 w-3" />
          <span>PDF • 2024年1月</span>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="h-5 px-2 text-xs hover:text-primary transition-colors"
              aria-label="在新窗口预览简历"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              预览
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
