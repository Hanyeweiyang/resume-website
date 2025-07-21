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
    title: "高级前端开发工程师",
    company: "科技创新有限公司",
    location: "深圳，广东",
    period: "2022年1月 - 至今",
    startDate: "2022-01",
    status: "current",
    companyType: "科技公司",
    teamSize: 8,
    description: [
      "领导前端开发团队，负责新一代SaaS平台的架构设计和开发",
      "制定前端技术标准和最佳实践，提升团队开发效率",
      "与产品和设计团队紧密合作，确保用户体验的一致性",
      "负责技术选型和架构决策，推动技术栈现代化升级",
    ],
    achievements: [
      "成功领导团队完成3个大型项目交付，获得客户高度认可",
      "建立完善的前端工程化体系，部署效率提升40%",
      "设计并实现组件库，代码复用率提升30%",
      "应用性能优化，页面加载速度提升25%",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js"],
  },
  {
    id: "exp-2",
    title: "前端开发工程师",
    company: "数字解决方案科技",
    location: "广州，广东",
    period: "2019年3月 - 2021年12月",
    startDate: "2019-03",
    endDate: "2021-12",
    status: "past",
    companyType: "软件公司",
    teamSize: 5,
    description: [
      "负责多个企业级Web应用的前端开发和维护",
      "参与产品需求分析和技术方案设计",
      "与后端团队协作，完成API集成和数据交互",
      "指导初级开发人员，参与代码审查和技术分享",
    ],
    achievements: [
      "独立完成5个中大型项目的前端开发",
      "建立团队代码规范，提升代码质量",
      "优化应用性能，用户体验评分提升20%",
    ],
    technologies: ["React", "Redux", "JavaScript", "SCSS", "Webpack"],
  },
  {
    id: "exp-3",
    title: "Web开发工程师",
    company: "创意设计工作室",
    location: "上海，上海",
    period: "2017年6月 - 2019年2月",
    startDate: "2017-06",
    endDate: "2019-02",
    status: "past",
    companyType: "设计工作室",
    teamSize: 3,
    description: [
      "为不同行业客户开发定制化网站和Web应用",
      "与设计师密切合作，实现高保真度的视觉效果",
      "负责网站性能优化和SEO优化",
      "维护和更新现有项目，提供技术支持",
    ],
    achievements: [
      "成功交付15+个客户项目，客户满意度95%+",
      "掌握多种CMS系统，提升开发效率",
      "建立项目模板库，缩短开发周期30%",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP"],
  },
  {
    id: "exp-gap",
    title: "技能提升与学习",
    company: "自主学习",
    location: "深圳，广东",
    period: "2021年12月 - 2022年1月",
    startDate: "2021-12",
    endDate: "2022-01",
    status: "gap",
    description: ["专注于现代前端技术栈的深入学习", "完成多个开源项目，提升技术能力", "参与技术社区活动和在线课程学习"],
    achievements: ["完成Next.js和TypeScript的系统学习", "贡献开源项目，获得社区认可", "获得相关技术认证"],
    technologies: ["Next.js", "TypeScript", "React Hooks", "GraphQL"],
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
          <Card className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">年工作经验</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">完成项目</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">技术栈</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
