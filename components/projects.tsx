"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, X } from "lucide-react"

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
    title: "电商平台系统",
    description: "功能完整的在线商城，包含购物车、结算和支付处理",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    github: "https://github.com/zhengjiahuang/ecommerce",
    demo: "https://ecommerce-demo.com",
    details:
      "这个电商平台具有响应式设计、产品筛选、用户认证、购物车功能和Stripe安全结账集成。使用Next.js进行服务端渲染和性能优化，包含无头CMS内容管理和订单跟踪仪表板。",
  },
  {
    id: "project-2",
    title: "任务管理应用",
    description: "支持实时更新的协作任务管理器",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Material UI", "Redux"],
    github: "https://github.com/zhengjiahuang/taskmanager",
    demo: "https://taskmanager-demo.com",
    details:
      "这个任务管理应用允许团队实时协作项目。功能包括拖拽任务组织、优先级设置、截止日期、文件附件和团队成员分配。使用Firebase实现实时数据库和身份验证，Redux进行状态管理。",
  },
  {
    id: "project-3",
    title: "健身追踪仪表板",
    description: "具有数据可视化的综合健身追踪器",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
    github: "https://github.com/zhengjiahuang/fitnesstracker",
    details:
      "这个健身追踪仪表板通过交互式图表帮助用户监控锻炼进度。包括锻炼记录、目标设定、进度跟踪和个性化建议。前端使用Vue.js构建，D3.js提供数据可视化，后端使用Node.js和MongoDB数据库。",
  },
  {
    id: "project-4",
    title: "天气预报应用",
    description: "精美的天气应用，提供7天预报和位置搜索",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "OpenWeather API", "地理定位"],
    github: "https://github.com/zhengjiahuang/weatherapp",
    demo: "https://weather-demo.com",
    details:
      "这个天气预报应用为任何位置提供当前天气状况和7天预报。功能包括自动本地天气地理定位、位置搜索、小时预报、天气警报和不同天气条件的精美可视化。使用React Native构建，支持跨平台兼容性。",
  },
  {
    id: "project-5",
    title: "社交媒体仪表板",
    description: "社交媒体管理的分析仪表板",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Angular", "Chart.js", "Express", "PostgreSQL"],
    github: "https://github.com/zhengjiahuang/socialdashboard",
    details:
      "这个社交媒体仪表板将多个平台的分析数据聚合到单一界面中。跟踪参与度指标、粉丝增长、帖子表现和受众人口统计。前端使用Angular构建，Chart.js进行数据可视化，后端使用Express和PostgreSQL数据库。",
  },
  {
    id: "project-6",
    title: "食谱分享平台",
    description: "社区驱动的食谱分享和发现平台",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "GraphQL", "MongoDB", "AWS S3"],
    github: "https://github.com/zhengjiahuang/recipeplatform",
    demo: "https://recipes-demo.com",
    details:
      "这个食谱分享平台允许用户发现、分享和保存食谱。功能包括带有分步说明的食谱创建、配料清单、烹饪时间、难度等级和用户评分。图片存储在AWS S3中，应用使用GraphQL进行高效数据获取和MongoDB数据库。",
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-20 bg-background/80 backdrop-blur-sm relative">
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
          className="space-y-2 text-center mb-16"
        >
          <Badge variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm">
            作品集
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">精选项目</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">我的近期作品和个人项目展示</p>
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
          <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{selectedProject?.description}</DialogDescription>
            </DialogHeader>

            <div className="relative aspect-video overflow-hidden rounded-md">
              {selectedProject && (
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
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

              <div className="flex gap-4">
                {selectedProject?.github && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" asChild>
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
                    <Button size="sm" asChild className="bg-gradient-to-r from-primary to-purple-600">
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

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setSelectedProject(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">关闭</span>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
