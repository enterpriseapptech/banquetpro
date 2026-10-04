import React from 'react'
import { cn } from '@/utils'

export interface SummaryCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  iconBgColor?: string
  className?: string
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex items-start justify-between min-w-0 font-['Inter']",
        className
      )}
    >
      <div className="space-y-2 min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium text-gray-500 tracking-tight truncate">
          {title}
        </p>
        <p className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-none truncate">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-400 font-normal truncate pt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {icon && (
        <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100/80 shrink-0 ml-3 flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  )
}

export default SummaryCard
