import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ResumeDownloadButton, { ResumePreviewLink } from "./resume-download-button"

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden px-4 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="container relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xl font-medium text-primary">您好，我是</p>
            <h1 className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              郑嘉煌
            </h1>
            <p className="text-2xl font-medium text-muted-foreground sm:text-3xl">全栈开发工程师</p>
          </div>

          <p className="max-w-md text-lg text-muted-foreground">
            我专注于使用现代Web技术构建卓越的数字体验，注重性能优化、可访问性和精美的设计。
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 bg-gradient-to-r from-primary to-purple-600 px-8 font-semibold shadow-lg hover:from-primary/90 hover:to-purple-600/90"
            >
              <a href="#contact">联系我</a>
            </Button>
            <ResumeDownloadButton size="lg" showPreview={false} />
          </div>

          <ResumePreviewLink />
        </div>
      </div>

      <Button
        asChild
        variant="ghost"
        size="icon"
        className="absolute inset-x-0 bottom-8 mx-auto"
      >
        <a href="#skills" aria-label="向下滚动">
          <ArrowDown aria-hidden="true" className="h-6 w-6 motion-safe:animate-bounce" />
        </a>
      </Button>
    </section>
  )
}
