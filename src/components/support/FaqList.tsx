import React from 'react'
import { cn } from '@/utils'

export interface FaqListItem {
  id: string
  question: string
  answer: string
}

export interface FaqListProps {
  items: FaqListItem[]
  className?: string
}

/**
 * Reusable FAQ list with dividers between entries.
 */
export const FaqList: React.FC<FaqListProps> = ({ items, className }) => (
  <dl className={cn('divide-y divide-gray-100', className)}>
    {items.map((item) => (
      <div key={item.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
        <dt className="text-sm font-semibold text-gray-900">{item.question}</dt>
        <dd className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
          {item.answer}
        </dd>
      </div>
    ))}
  </dl>
)

export default FaqList
