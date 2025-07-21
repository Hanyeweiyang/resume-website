"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, CheckCircle2, Briefcase, Users, Award, Clock } from "lucide-react"

type EmploymentStatus = "current" | "past" | "contract" | "freelance" | "gap" | "seeking"

interface EmploymentStatusIndicatorProps {
  status: EmploymentStatus
  variant?: "default" | "compact" | "detailed"
  showIcon?: boolean
  className?: string
}

const statusConfigs = {
  current: {
    label: "当前职位",
    shortLabel: "在职",
    color: "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400",
    icon: TrendingUp,
    iconColor: "text-green-600 dark:text-green-400",
    description: "目前正在此职位工作",
  },
  past: {
    label: "过往经历",
    shortLabel: "已离职",
    color: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400",
    icon: CheckCircle2,
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "已完成的工作经历",
  },
  contract: {
    label: "合同工作",
    shortLabel: "合同",
    color: "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400",
    icon: Briefcase,
    iconColor: "text-purple-600 dark:text-purple-400",
    description: "基于合同的项目工作",
  },
  freelance: {
    label: "自由职业",
    shortLabel: "自由",
    color: "bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-400",
    icon: Users,
    iconColor: "text-orange-600 dark:text-orange-400",
    description: "独立承接的项目工作",
  },
  gap: {
    label: "学习提升",
    shortLabel: "学习",
    color: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20 dark:text-cyan-400",
    icon: Award,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    description: "专注于技能提升和学习",
  },
  seeking: {
    label: "求职中",
    shortLabel: "求职",
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400",
    icon: Clock,
    iconColor: "text-yellow-600 dark:text-yellow-400",
    description: "正在寻找新的工作机会",
  },
}

export default function EmploymentStatusIndicator({
  status,
  variant = "default",
  showIcon = true,
  className = "",
}: EmploymentStatusIndicatorProps) {
  const config = statusConfigs[status]
  const StatusIcon = config.icon

  if (variant === "compact") {
    return (
      <motion.div whileHover={{ scale: 1.05 }} className={className}>
        <Badge className={`${config.color} border text-xs font-medium`}>
          {showIcon && <StatusIcon className={`h-3 w-3 mr-1 ${config.iconColor}`} />}
          {config.shortLabel}
        </Badge>
      </motion.div>
    )
  }

  if (variant === "detailed") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`flex items-center gap-3 p-3 rounded-lg border ${config.color} ${className}`}
      >
        {showIcon && (
          <div className={`p-2 rounded-full bg-background/50 ${config.iconColor}`}>
            <StatusIcon className="h-4 w-4" />
          </div>
        )}
        <div>
          <div className="font-medium text-sm">{config.label}</div>
          <div className="text-xs opacity-80">{config.description}</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} className={className}>
      <Badge className={`${config.color} border text-xs font-medium`}>
        {showIcon && <StatusIcon className={`h-3 w-3 mr-1 ${config.iconColor}`} />}
        {config.label}
      </Badge>
    </motion.div>
  )
}

// Hook for managing employment status
export function useEmploymentStatus() {
  const getCurrentStatus = (endDate?: string): EmploymentStatus => {
    if (!endDate) return "current"

    const end = new Date(endDate)
    const now = new Date()
    const monthsDiff = (now.getFullYear() - end.getFullYear()) * 12 + (now.getMonth() - end.getMonth())

    // If ended recently (within 2 months), might be seeking
    if (monthsDiff <= 2) return "seeking"

    return "past"
  }

  const getStatusLabel = (status: EmploymentStatus, isCompact = false): string => {
    const config = statusConfigs[status]
    return isCompact ? config.shortLabel : config.label
  }

  const getStatusColor = (status: EmploymentStatus): string => {
    return statusConfigs[status].color
  }

  return {
    getCurrentStatus,
    getStatusLabel,
    getStatusColor,
    statusConfigs,
  }
}
