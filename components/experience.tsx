import { Award, Briefcase, Building2, Calendar, CheckCircle2, MapPin, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const experiences = [
  {
    company: "紫讯技术（福建）股份有限公司",
    title: "AI 研发工程师",
    period: "2025年8月 - 至今",
    current: true,
    description: [
      "参与跨境电商 AIGC 产品 SellerPic 和 B2B 展会线索 SaaS Lensmor 的迭代。",
      "负责 Web/H5、运营后台、服务端 API、任务队列、消息与支付接入。",
    ],
    achievements: [
      "从零参与 Lensmor 搭建，交付登录注册、用户管理、飞书通知、联系人筛选和异步导出等功能。",
      "建设批量清洗、数据归一化、去重与人工复核流程，提供质量看板和异常诊断入口。",
      "打通从广告来源、注册激活到付费和 CRM 商机的归因链路，支持转化回传和数据核验。",
      "推动分层频率调度，无效扫描任务量周均下降约 53%。完成数据抓取供应商评估，按用量测算月成本可降低约 40%。",
      "参与 SellerPic Agent、品牌资产库和官网工具页开发，调研图像修复方案并实践 ComfyUI 工作流。",
    ],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "PostHog", "GA4", "HubSpot", "ComfyUI"],
  },
  {
    company: "福建三丰鞋业有限公司",
    title: "算法工程师",
    period: "2024年3月 - 2025年8月",
    location: "福建，福州",
    companyType: "制造企业",
    current: false,
    description: [
      "负责工业视觉检测和产线设备调试。",
      "参与 ISQ 品质咨询系统、FMA 监管平台与车间可视化看板开发。",
      "在内网部署大模型，支持多个岗位使用。",
    ],
    achievements: [
      "主导 IP/IPF 倍率检测与针车布标正反检测。倍率检测项目提高产品质量 20%，节省 1 个岗位的人力。",
      "参与开发 ISQ 品质咨询系统，支持产线实时反馈和质量追踪，整体 A 品率提升 5%。",
      "部署 34B 至 72B 规模的内网模型，支持 2 至 3 人并发使用，文员和协调岗位的文字编辑用时减少 30% 至 40%。",
    ],
    technologies: ["Python", "OpenCV", "YOLO", "Vue", "FastAPI"],
  },
  {
    company: "福建乐想天成信息科技有限公司",
    title: "全栈工程师",
    period: "2021年3月 - 2024年2月",
    location: "福建，福州",
    companyType: "软件公司",
    current: false,
    description: [
      "参与 XR 多设备适配和数字孪生可视化。",
      "参与数字人和 AIGC 应用开发，覆盖 Web、小程序、PC 和眼镜端。",
    ],
    achievements: [
      "参与医疗、教育和工业虚拟仿真，以及气象、电力、仓储数字孪生应用开发。",
      "开发数字人的语音合成与口型驱动模块，参与 AI 绘画平台开发、LoRA 模型训练及上线。",
      "获 2023 年华为鲲鹏比赛福建区域创新赛三等奖。",
    ],
    technologies: ["Unity", "three.js", "ECharts", "Cesium", "Vue", "Stable Diffusion", "LoRA"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-16 bg-muted/10 py-20 backdrop-blur-sm">
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="mb-16 space-y-2 text-center">
          <Badge variant="outline" className="bg-background/50 px-3 py-1 text-sm backdrop-blur-sm">
            职业经历
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">工作经验</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">我的职业发展历程和重要里程碑</p>
        </div>

        <div className="relative md:px-8">
          <div aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-purple-500 to-cyan-500 md:block" />
          <ol className="space-y-8">
            {experiences.map((experience, index) => {
              const StatusIcon = experience.current ? TrendingUp : CheckCircle2
              const statusColor = experience.current
                ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                : "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400"
              const markerColor = experience.current ? "from-green-500 to-emerald-500" : "from-primary to-purple-500"
              const side = index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"

              return (
                <li key={experience.company} className="relative md:grid md:grid-cols-2 md:gap-x-10">
                  <span aria-hidden="true" className={"absolute left-1/2 top-8 z-10 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-r text-white shadow-lg md:flex " + markerColor}>
                    <StatusIcon className="h-4 w-4" />
                  </span>
                  <Card className={"group min-w-0 border-muted/30 bg-background/60 shadow-lg backdrop-blur-md transition-shadow hover:shadow-xl " + side}>
                    <CardHeader className="space-y-2 p-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold transition-colors group-hover:text-primary">{experience.title}</h3>
                        <Badge variant="outline" className={"gap-1 text-xs font-medium " + statusColor}>
                          <StatusIcon aria-hidden="true" className="h-3 w-3" />
                          {experience.current ? "当前职位" : "过往经历"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-semibold text-primary">
                        <span className="flex items-center gap-2">
                          <Building2 aria-hidden="true" className="h-4 w-4 shrink-0" />
                          {experience.company}
                        </span>
                        {experience.companyType && (
                          <Badge variant="secondary" className="bg-primary/10 text-xs text-primary/80">
                            {experience.companyType}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 px-5 pb-5 sm:px-6 sm:pb-6">
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 rounded-lg border border-muted/20 bg-muted/20 p-4 text-sm text-muted-foreground">
                        {experience.location && (
                          <span className="flex items-center gap-2">
                            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                            {experience.location}
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                          {experience.period}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-semibold">
                          <Briefcase aria-hidden="true" className="h-4 w-4 text-primary" />
                          主要职责
                        </h4>
                        <ul className="space-y-2">
                          {experience.description.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-semibold">
                          <Award aria-hidden="true" className="h-4 w-4 text-primary" />
                          关键成就
                        </h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement) => (
                            <li key={achievement} className="flex gap-3 text-sm font-medium leading-relaxed">
                              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">技术栈</h4>
                        <ul className="flex flex-wrap gap-2" aria-label="技术栈">
                          {experience.technologies.map((technology) => (
                            <li key={technology}>
                              <Badge variant="secondary" className="bg-primary/5 text-primary">{technology}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
