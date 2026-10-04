import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils'

export type ContactTone = 'blue' | 'green' | 'purple'

const TONE_STYLES: Record<ContactTone, string> = {
  blue: 'bg-blue-50 text-[#0052cc]',
  green: 'bg-emerald-50 text-emerald-600',
  purple: 'bg-purple-50 text-purple-600',
}

export interface ContactCardProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel: string
  href?: string
  onAction?: () => void
  tone?: ContactTone
  className?: string
}

/**
 * Reusable contact channel card (email / phone / chat / ...).
 */
export const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  actionLabel,
  href,
  onAction,
  tone = 'blue',
  className,
}) => (
  <div
    className={cn(
      'bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow min-w-0 space-y-3',
      className
    )}
  >
    <div
      className={cn(
        'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0',
        TONE_STYLES[tone]
      )}
    >
      {icon}
    </div>

    <div className="space-y-1 min-w-0">
      <h3 className="text-sm sm:text-base font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 font-medium">{description}</p>
    </div>

    <Button
      variant="link"
      size="sm"
      href={href}
      onClick={onAction}
      className="px-0 py-0 h-auto text-[#0052cc] font-medium text-xs sm:text-sm break-all justify-start text-left cursor-pointer"
    >
      {actionLabel}
    </Button>
  </div>
)

export default ContactCard
