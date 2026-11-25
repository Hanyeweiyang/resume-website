"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github } from "lucide-react"

type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  details: string
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "多功能单位转换器",
    description: "电商领域设计的实用工具集合",
    image: "/project/unit-converter.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Hanyeweiyang/unit-converter",
    demo: "https://unit-converter-nine-beige.vercel.app/",
    details:
      "多功能单位转换器是一个为电商领域设计的实用工具集合，帮助用户轻松完成各种计算和转换任务。项目采用现代化前端技术栈，提供直观友好的用户界面和多语言支持。",
  },
  {
    id: "project-2",
    title: "AI 提示工程应用",
    description: "支持中英文的文本与图像提示词库",
    image: "/project/prompt-engineering.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Hanyeweiyang/prompt-engineering",
    demo: "https://prompt-engineering-five.vercel.app/",
    details:
      "提供文本和图像提示词的中英文示例，支持搜索、分类浏览与一键复制。",
  },
  {
    id: "project-3",
    title: "个人官网简历",
    description: "在线简历与项目作品集",
    image: "/project/resume-website.png",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Hanyeweiyang/resume-website",
    demo: "https://resume-website-alpha-lac.vercel.app/",
    details:
      "响应式简历站，提供工作经历、项目展示、深色模式以及 PDF 简历的预览和下载。",
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="relative scroll-mt-16 bg-background/80 py-20 backdrop-blur-sm">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border border-primary/5 rounded-lg"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-2 text-center"
        >
          <Badge variant="outline" className="bg-background/50 px-3 py-1 text-sm backdrop-blur-sm">
            作品集
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">精选项目</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">我的近期作品和个人项目展示</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden h-full flex flex-col group bg-background/50 backdrop-blur-sm border-muted/20 hover:border-primary/20 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="flex-grow flex flex-col p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      查看详情
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-h-[90svh] w-[calc(100%_-_1.5rem)] max-w-3xl overflow-y-auto rounded-lg bg-background/95 p-4 backdrop-blur-md sm:p-6 md:max-w-2xl lg:max-w-3xl">
            <DialogHeader className="pr-6">
              <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{selectedProject?.description}</DialogDescription>
            </DialogHeader>

            <div className="relative aspect-video overflow-hidden rounded-md">
              {selectedProject && (
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  sizes="(min-width: 768px) 720px, 90vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="space-y-4">
              <p>{selectedProject?.details}</p>

              <div className="flex flex-wrap gap-2">
                {selectedProject?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                {selectedProject?.github && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub 仓库
                      </a>
                    </Button>
                  </motion.div>
                )}
                {selectedProject?.demo && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" asChild className="bg-gradient-to-r from-primary to-purple-600 flex-1">
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        在线演示
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
