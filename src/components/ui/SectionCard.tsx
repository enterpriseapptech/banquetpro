import React from 'react'
import { cn } from '@/utils'

export interface SectionCardProps {
  title?: React.ReactNode
  icon?: React.ReactNode
  /** Optional element rendered on the right side of the header (e.g. a button). */
  headerAction?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}

/**
 * Reusable white card with an optional header (icon + title + action).
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  headerAction,
  children,
  className,
  bodyClassName,
}) => (
  <section
    className={cn(
      'bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs min-w-0',
      className
    )}
  >
    {(title || headerAction) && (
      <header className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="shrink-0 text-[#0052cc]">{icon}</span>}
          {title && (
            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight truncate">
              {title}
            </h2>
          )}
        </div>
        {headerAction}
      </header>
    )}
    <div className={bodyClassName}>{children}</div>
  </section>
)

export default SectionCard
