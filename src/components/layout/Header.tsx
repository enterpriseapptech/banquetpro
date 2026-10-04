import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Settings, Bell, Zap } from 'lucide-react'
import { cn } from '@/utils'
import { Button } from '@/components/ui/Button'
import { NotificationCard } from './NotificationCard'

export interface HeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  onOpenMobileMenu?: () => void
  showMobileMenuButton?: boolean
  actions?: React.ReactNode
  unreadNotifications?: boolean
  onNotificationClick?: () => void
  onSettingsClick?: () => void
  onUpgradeClick?: () => void
  userName?: string
  userAvatar?: string
  className?: string
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Welcome back, Jonnuel',
  subtitle = 'Track, manage and forecast your customers and orders.',
  onOpenMobileMenu,
  showMobileMenuButton = true,
  actions,
  unreadNotifications = true,
  onNotificationClick,
  onSettingsClick,
  onUpgradeClick,
  className,
  children,
}) => {
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSettings = () => {
    if (onSettingsClick) {
      onSettingsClick()
    } else {
      navigate('/settings')
    }
  }

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setShowNotifications(true)
  }

  const handleMouseLeave = () => {
    hoverTimer.current = setTimeout(() => {
      setShowNotifications(false)
    }, 150)
  }

  return (
    <header
      className={cn(
        'bg-white border-b border-gray-200/90 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {showMobileMenuButton && onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-1.5 rounded-lg border border-gray-200 cursor-pointer transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {children ? (
          children
        ) : (
          <div className="min-w-0">
            {typeof title === 'string' ? (
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-tight truncate">
                {title}
              </h1>
            ) : (
              title
            )}
            {subtitle && (
              typeof subtitle === 'string' ? (
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5 truncate">
                  {subtitle}
                </p>
              ) : (
                subtitle
              )
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4">
        {actions !== undefined ? (
          actions
        ) : (
          <>
            <Button
              variant="outline"
              size="md"
              onClick={onUpgradeClick}
              leftIcon={<Zap className="w-4 h-4 text-gray-700 shrink-0" />}
              className="border-gray-300 text-gray-800 font-medium text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-2xs hover:bg-gray-50 cursor-pointer bg-white"
            >
              <span className="hidden sm:inline">Upgrade now</span>
            </Button>

            <button
              type="button"
              onClick={handleSettings}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-gray-200 bg-white"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Notification Dropdown Container */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (onNotificationClick) {
                    onNotificationClick()
                  } else {
                    setShowNotifications((prev) => !prev)
                  }
                }}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-gray-200 relative bg-white"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Hover/Click Notification Card Popover */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <NotificationCard
                    onViewAll={() => {
                      setShowNotifications(false)
                      navigate('/notifications')
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
