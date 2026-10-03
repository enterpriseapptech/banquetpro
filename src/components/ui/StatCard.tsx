import React from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/utils'

export interface StatCardProps {
  title: string
  value: string | number
  trend?: {
    value: string
    direction: 'up' | 'down'
  }
  chartData?: number[]
  highlightIndex?: number
  colorScheme?: 'blue' | 'green' | 'amber' | 'purple'
  className?: string
}

const COLOR_CONFIGS = {
  blue: {
    activeBar: 'bg-[#0065FF]',
    bar: 'bg-[#0065FF]/20',
  },
  green: {
    activeBar: 'bg-[#00875A]',
    bar: 'bg-[#00875A]/20',
  },
  amber: {
    activeBar: 'bg-[#FFAB00]',
    bar: 'bg-[#FFAB00]/25',
  },
  purple: {
    activeBar: 'bg-[#6554C0]',
    bar: 'bg-[#6554C0]/20',
  },
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  chartData = [40, 60, 100, 65, 80, 55],
  highlightIndex = 2,
  colorScheme = 'blue',
  className,
}) => {
  const colors = COLOR_CONFIGS[colorScheme] || COLOR_CONFIGS.blue

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 transition-all hover:shadow-xs',
        className
      )}
    >
      <div className="space-y-3 min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-tight">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          {value}
        </h3>

        {trend && (
          <div className="flex items-center gap-1 text-xs font-semibold">
            {trend.direction === 'up' ? (
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{trend.value}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-600">
                <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{trend.value}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {chartData && chartData.length > 0 && (
        <div className="flex items-end gap-1.5 h-14 w-24 shrink-0 pb-1 pt-2">
          {chartData.map((heightPct, idx) => {
            const isHighlight = idx === highlightIndex
            return (
              <div
                key={idx}
                className={cn(
                  'flex-1 rounded-xs transition-all duration-300',
                  isHighlight ? colors.activeBar : colors.bar
                )}
                style={{ height: `${Math.max(15, Math.min(100, heightPct))}%` }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StatCard
