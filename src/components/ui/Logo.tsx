import React from 'react'
import { cn } from '@/utils'

export interface LogoProps {
  className?: string
  textClassName?: string
}

export const Logo: React.FC<LogoProps> = ({ className = '', textClassName = '' }) => {
  return (
    <div className={cn('flex items-center justify-center gap-2 mb-6', className)}>
      <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
        <div className="bg-[#f59e0b] rounded-[1.5px]"></div>
        <div className="bg-[#ea580c] rounded-[1.5px]"></div>
        <div className="bg-[#ea580c] rounded-[1.5px]"></div>
        <div className="bg-[#f59e0b] rounded-[1.5px]"></div>
      </div>
      <span className={cn('font-extrabold tracking-wider text-gray-900 text-base sm:text-lg', textClassName)}>
        ENTAPP
      </span>
    </div>
  )
}

export default Logo
