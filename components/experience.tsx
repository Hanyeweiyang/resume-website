"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin, Building2, TrendingUp, Clock, CheckCircle2, Users, Award } from "lucide-react"

type EmploymentStatus = "current" | "past" | "contract" | "freelance" | "gap"

type Experience = {
  id: string
  title: string
  company: string
  location: string
  period: string
  startDate: string
  endDate?: string
  status: EmploymentStatus
  description: string[]
  achievements?: string[]
  technologies?: string[]
  teamSize?: number
  companyType?: string
}

const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "智能化工程师",
    company: "福建三丰科技有限公司",
    location: "福建，福州",
    period: "2024年3月 - 至今",
    startDate: "2024-03",
    status: "current",
    companyType: "制造企业",
    description: [
      "工业视觉：机器学习开发设备，多场景节省人力",
      "数字化系统：前后端建设，支持决策咨询",
      "大模型：本地部署AI，提供并发咨询",
      "技术铺垫：图像生成参考，提前布局趋势",
    ],
    achievements: [
      "参与IP/IPF倍率检测，提高产品质量20%，节省人力1人",
      "参与针车布标正反检测，提高生产品质，0错误针车缝合产物",
      "FMA品质咨询系统，减少产品质量与生产环境沟通时间",
      "车间数字化看板，信息汇总，减少信息差，建设数字化",
    ],
    technologies: ["Vue", "React","FastAPI", "Python", "OpenCV","Yolo"],
  },
  {
    id: "exp-2",
    title: "全栈开发工程师",
    company: "福建乐想天成信息科技有限公司",
    location: "福建，福州",
    period: "2021年3月 - 2024年2月",
    startDate: "2021-03",
    endDate: "2024-02",
    status: "past",
    companyType: "软件公司",
    description: [
      "XR开发​​：Unity眼镜端应用设计，多硬件适配及游戏网络",
      "数字孪生​​：three.js/Cesium构建模型，数据仿真应用实现",
      "AI生成技术​​：数字人语音口型驱动，AIGC图像功能开发",
    ],
    achievements: [
      "参与医学虚拟仿真、教育虚拟仿真、工业虚拟仿真应用开发",
      "参与 AI 绘画页面业务开发与设计并训练专属模型与上线网站",
      "参与数字人与大模型相关研究，参与数字人陪伴、数字人直播、数字人教育等多项技术研讨和项目分享",      
      "参与2023年华为数字世界 一触即达担任讲解员、2023年创客中国比赛、2023年世界 VR 博览会新闻阅读分享等等多项活动",
    ],
    technologies: ["Vue", "NodeJS", "Gin", "Python", "Unity 3D"],
  },
]

const getStatusConfig = (status: EmploymentStatus) => {
  switch (status) {
    case "current":
      return {
        label: "当前职位",
        color: "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
        icon: TrendingUp,
        iconColor: "text-green-600 dark:text-green-400",
      }
    case "past":
      return {
        label: "过往经历",
        color: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
        icon: CheckCircle2,
        iconColor: "text-blue-600 dark:text-blue-400",
      }
    case "contract":
      return {
        label: "合同工作",
        color: "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400",
        icon: Briefcase,
        iconColor: "text-purple-600 dark:text-purple-400",
      }
    case "freelance":
      return {
        label: "自由职业",
        color: "bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-400",
        icon: Users,
        iconColor: "text-orange-600 dark:text-orange-400",
      }
    case "gap":
      return {
        label: "学习提升",
        color: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20 dark:text-cyan-400",
        icon: Award,
        iconColor: "text-cyan-600 dark:text-cyan-400",
      }
    default:
      return {
        label: "工作经历",
        color: "bg-gray-500/10 text-gray-700 border-gray-500/20 dark:text-gray-400",
        icon: Briefcase,
        iconColor: "text-gray-600 dark:text-gray-400",
      }
  }
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="experience" ref={ref} className="py-20 bg-muted/10 backdrop-blur-sm relative">
      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Floating geometric elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border border-primary/5 rounded-lg"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 2) * 30}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
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
            职业经历
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">工作经验</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">我的职业发展历程和重要里程碑</p>
        </motion.div>

        <div className="relative">
          {/* Enhanced timeline line with gradient */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-cyan-500 -ml-px md:block hidden rounded-full"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8 relative">
            {experiences.map((exp, index) => {
              const statusConfig = getStatusConfig(exp.status)
              const StatusIcon = statusConfig.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <Card
                    className={`md:w-[calc(50%-32px)] ${
                      isLeft ? "md:ml-auto md:mr-8" : "md:ml-8"
                    } relative bg-background/60 backdrop-blur-md border-muted/30 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-xl group`}
                  >
                    {/* Enhanced timeline dot with status indication */}
                    <motion.div
                      className={`absolute top-8 ${
                        isLeft ? "md:-right-[45px]" : "md:-left-[45px]"
                      } -left-[21px] w-8 h-8 rounded-full border-4 border-background shadow-lg hidden md:flex items-center justify-center ${
                        exp.status === "current"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : exp.status === "gap"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-gradient-to-r from-primary to-purple-500"
                      }`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                    >
                      <StatusIcon className="h-4 w-4 text-white" />
                    </motion.div>

                    {/* Status indicator for mobile */}
                    <div className="md:hidden absolute top-4 right-4">
                      <Badge className={`${statusConfig.color} border text-xs font-medium`}>
                        <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.iconColor}`} />
                        {statusConfig.label}
                      </Badge>
                    </div>

                    <motion.div whileHover={{ scale: 1.01, y: -2 }} transition={{ duration: 0.3 }} className="relative">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {exp.title}
                              </h3>
                              {/* Desktop status badge */}
                              <Badge
                                className={`${statusConfig.color} border text-xs font-medium hidden md:inline-flex`}
                              >
                                <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.iconColor}`} />
                                {statusConfig.label}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2 text-primary font-semibold">
                              <Building2 className="h-4 w-4" />
                              <span>{exp.company}</span>
                              {exp.companyType && (
                                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary/80">
                                  {exp.companyType}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Enhanced metadata section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-muted/20 rounded-lg border border-muted/20">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{exp.period}</span>
                          </div>
                          {exp.teamSize && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4 text-primary" />
                              <span>团队规模: {exp.teamSize}人</span>
                            </div>
                          )}
                          {exp.status === "current" && (
                            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                              <Clock className="h-4 w-4" />
                              <span>在职中</span>
                            </div>
                          )}
                        </div>

                        {/* Job responsibilities */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            主要职责
                          </h4>
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <motion.li
                                key={i}
                                className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed"
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.5, delay: 1.2 + index * 0.15 + i * 0.1 }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Key achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <Award className="h-4 w-4 text-primary" />
                              关键成就
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  className="flex gap-3 items-start text-sm text-foreground leading-relaxed"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                  transition={{ duration: 0.5, delay: 1.4 + index * 0.15 + i * 0.1 }}
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="font-medium">{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies used */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground text-sm">技术栈</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <motion.div
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.3, delay: 1.6 + index * 0.15 + i * 0.05 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="text-xs bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-default"
                                  >
                                    {tech}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Career summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </section>
  )
}
