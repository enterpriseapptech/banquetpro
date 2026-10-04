import React from 'react'
import { cn } from '@/utils'

export interface StatusBadgeProps {
  label: string
  className?: string
}

const BADGE_STYLES: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Certified: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Expired: 'bg-amber-50 text-amber-700 border-amber-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Rejected: 'bg-rose-50 text-rose-600 border-rose-100',
  'Not Certified': 'bg-gray-100 text-gray-600 border-gray-200',
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, className }) => (
  <span
    className={cn(
      'inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      BADGE_STYLES[label] ?? 'bg-gray-100 text-gray-600 border-gray-200',
      className
    )}
  >
    {label}
  </span>
)

export default StatusBadge
