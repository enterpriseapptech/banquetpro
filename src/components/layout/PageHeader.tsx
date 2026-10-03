import React from 'react'
import { cn } from '@/utils'

export interface PageHeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
}) => {
  if (!title && !subtitle && !actions) return null

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2',
        className
      )}
    >
      <div>
        {typeof title === 'string' ? (
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        ) : (
          title
        )}
        {subtitle && (
          typeof subtitle === 'string' ? (
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {subtitle}
            </p>
          ) : (
            subtitle
          )
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader
