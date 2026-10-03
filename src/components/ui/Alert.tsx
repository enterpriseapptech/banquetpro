import React, { useState } from 'react'
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/utils'

export type AlertVariant = 'success' | 'info' | 'warning' | 'error' | 'danger'

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant
  title?: React.ReactNode
  description?: React.ReactNode
  message?: React.ReactNode
  icon?: React.ReactNode | boolean
  showIcon?: boolean
  closable?: boolean
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  action?: React.ReactNode
  bordered?: boolean
}

const variantStyles: Record<
  AlertVariant,
  {
    container: string
    title: string
    description: string
    iconColor: string
    closeHover: string
    defaultIcon: React.ReactNode
  }
> = {
  success: {
    container: 'bg-[#EFFFF4] border border-[#BBF7D0]/70 text-[#15803D]',
    title: 'text-[#15803D] font-semibold',
    description: 'text-[#16A34A]',
    iconColor: 'text-[#16A34A]',
    closeHover: 'hover:bg-[#DCFCE7] text-[#15803D]',
    defaultIcon: <CheckCircle2 className="w-5 h-5 flex-shrink-0" />,
  },
  info: {
    container: 'bg-[#E0F2FE]/70 border border-[#38BDF8] text-[#0369A1]',
    title: 'text-[#0284C7] font-semibold',
    description: 'text-[#0369A1]',
    iconColor: 'text-[#0284C7]',
    closeHover: 'hover:bg-[#BAE6FD] text-[#0369A1]',
    defaultIcon: <Info className="w-5 h-5 flex-shrink-0" />,
  },
  warning: {
    container: 'bg-[#FEF2F2] border border-[#FCA5A5] text-[#C2410C]',
    title: 'text-[#E11D48] font-semibold',
    description: 'text-[#F43F5E]',
    iconColor: 'text-[#E11D48]',
    closeHover: 'hover:bg-[#FEE2E2] text-[#E11D48]',
    defaultIcon: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
  },
  error: {
    container: 'bg-[#FEF2F2] border border-[#F87171] text-[#991B1B]',
    title: 'text-[#DC2626] font-semibold',
    description: 'text-[#EF4444]',
    iconColor: 'text-[#DC2626]',
    closeHover: 'hover:bg-[#FEE2E2] text-[#DC2626]',
    defaultIcon: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
  },
  danger: {
    container: 'bg-[#FEF2F2] border border-[#F87171] text-[#991B1B]',
    title: 'text-[#DC2626] font-semibold',
    description: 'text-[#EF4444]',
    iconColor: 'text-[#DC2626]',
    closeHover: 'hover:bg-[#FEE2E2] text-[#DC2626]',
    defaultIcon: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
  },
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  message,
  icon,
  showIcon = true,
  closable = true,
  onClose,
  action,
  bordered = true,
  className,
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const config = variantStyles[variant] || variantStyles.info
  const displayTitle = title || (message && !description ? undefined : message)
  const displayDescription = description || children || (message && title ? message : undefined)

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisible(false)
    if (onClose) {
      onClose(e)
    }
  }

  const renderIcon = () => {
    if (!showIcon || icon === false) return null
    if (React.isValidElement(icon)) return icon
    return config.defaultIcon
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-2xl transition-all duration-200 shadow-xs',
        config.container,
        !bordered && 'border-0',
        className
      )}
      {...props}
    >
      {/* Icon */}
      {renderIcon() && (
        <div className={cn('pt-0.5 flex-shrink-0', config.iconColor)}>
          {renderIcon()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1">
        {displayTitle && (
          <h4 className={cn('text-sm leading-5 tracking-tight', config.title)}>
            {displayTitle}
          </h4>
        )}
        {displayDescription && (
          <p className={cn('text-xs sm:text-sm leading-5 mt-0.5 font-normal', config.description)}>
            {displayDescription}
          </p>
        )}
      </div>

      {action && <div className="flex-shrink-0 self-center">{action}</div>}

      {(closable || onClose) && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close alert"
          className={cn(
            'flex-shrink-0 p-1 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current',
            config.closeHover
          )}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
