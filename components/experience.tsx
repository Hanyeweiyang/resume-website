"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin } from "lucide-react"

type Experience = {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  current?: boolean
}

const experiences: Experience[] = [
  {
    title: "高级前端开发工程师",
    company: "科技创新有限公司",
    location: "深圳，广东",
    period: "2022年1月 - 至今",
    description: [
      "领导5人开发团队，使用Next.js和TypeScript构建新一代SaaS平台",
      "实施CI/CD流水线，将部署时间缩短40%",
      "架构组件库，提高开发效率30%",
      "优化应用性能，加载时间提升25%",
    ],
    current: true,
  },
  {
    title: "前端开发工程师",
    company: "数字解决方案科技",
    location: "广州，广东",
    period: "2019年3月 - 2021年12月",
    description: [
      "使用React和Redux开发响应式Web应用程序",
      "与UX设计师协作实现像素级完美界面",
      "集成RESTful API和GraphQL端点",
      "指导初级开发人员并进行代码审查",
    ],
  },
  {
    title: "Web开发工程师",
    company: "创意设计工作室",
    location: "上海，上海",
    period: "2017年6月 - 2019年2月",
    description: [
      "为不同行业的客户构建交互式网站",
      "使用HTML5、CSS3和JavaScript实现响应式设计",
      "使用WordPress和自定义PHP解决方案",
      "与设计团队协作确保视觉一致性",
    ],
  },
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="experience" ref={ref} className="py-20 bg-muted/10 backdrop-blur-sm relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
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
            职业经历
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">工作经验</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">我的职业发展历程和重要里程碑</p>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple-500 to-cyan-500 -ml-px md:block hidden"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12 relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <Card
                  className={`md:w-[calc(50%-20px)] ${index % 2 === 0 ? "md:ml-auto" : ""} relative bg-background/50 backdrop-blur-sm border-muted/20 hover:border-primary/20 transition-all duration-300`}
                >
                  {/* Animated timeline dot */}
                  <motion.div
                    className="absolute top-8 md:-left-[21px] -left-[11px] w-5 h-5 rounded-full border-4 border-background bg-gradient-to-r from-primary to-purple-500 hidden md:block"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  />

                  <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.3 }}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        {exp.current && (
                          <Badge className="bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary hover:from-primary/30 hover:to-purple-500/30 border-none">
                            当前职位
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex gap-2 items-baseline"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.5, delay: 1 + index * 0.2 + i * 0.1 }}
                          >
                            <Briefcase className="h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
