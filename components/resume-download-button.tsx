import { Download, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const resumeUrl = "/resume.pdf"
const resumeFilename = "郑嘉煌_全栈工程师_简历.pdf"
const resumeVersion = "2026年11月"
const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-6 text-base",
}

export function ResumePreviewLink() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <FileText aria-hidden="true" className="h-4 w-4" />
        PDF格式 · 最后更新：{resumeVersion}
      </span>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="预览简历 PDF"
        className="flex items-center gap-2 text-xs hover:text-primary focus-visible:outline-primary"
      >
        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        预览
      </a>
    </div>
  )
}

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
  className,
}: ResumeDownloadButtonProps) {
  if (variant === "card") {
    return (
      <Card className={cn("bg-background/50 backdrop-blur-sm border-muted/20", className)}>
        <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <FileText aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold">我的简历</p>
              <p className="text-sm text-muted-foreground">PDF · {resumeVersion}</p>
            </div>
          </div>
          <Button asChild size="icon">
            <a href={resumeUrl} download={resumeFilename} aria-label="下载简历 PDF">
              <Download aria-hidden="true" className="h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (variant === "minimal") {
    return (
      <Button asChild variant="ghost" className={cn(sizes[size], className)}>
        <a href={resumeUrl} download={resumeFilename}>
          <Download aria-hidden="true" className="h-4 w-4" />
          下载简历
        </a>
      </Button>
    )
  }

  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <Button asChild variant="outline" className={cn("border-muted/50 bg-background/80 font-semibold shadow-md hover:shadow-lg", sizes[size])}>
        <a href={resumeUrl} download={resumeFilename}>
          <span aria-hidden="true" className="flex items-center">
            <FileText className="h-4 w-4" />
            <Download className="h-4 w-4" />
          </span>
          下载简历
        </a>
      </Button>
      {showPreview && <ResumePreviewLink />}
    </div>
  )
}
