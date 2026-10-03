import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  BarChart2,
  Building2,
  UtensilsCrossed,
  Calendar,
  CreditCard,
  DollarSign,
  Store,
  ShieldCheck,
  Users,
  MapPin,
  HelpCircle,
  Settings,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { cn } from '@/utils'

export interface NavItem {
  label: string
  path: string
  icon: React.ElementType
  badge?: string | number
}

export interface SidebarProps {
  navItems?: NavItem[]
  bottomNavItems?: NavItem[]
  collapsed?: boolean
  onToggleCollapse?: () => void
  mobileOpen?: boolean
  onCloseMobile?: () => void
  userName?: string
  userEmail?: string
  userAvatar?: string
  logoTitle?: string
  logoSubtitle?: string
  onLogout?: () => void
  className?: string
}

const DEFAULT_MAIN_NAV: NavItem[] = [
  { label: 'Overview', path: '/dashboard', icon: BarChart2 },
  { label: 'Event Centers', path: '/event-centers', icon: Building2 },
  { label: 'Catering', path: '/catering', icon: UtensilsCrossed },
  { label: 'Bookings', path: '/bookings', icon: Calendar },
  { label: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
  { label: 'Payments', path: '/payments', icon: CreditCard },
  { label: 'Fees', path: '/fees', icon: DollarSign },
  { label: 'Providers', path: '/providers', icon: Store },
  { label: 'KYC', path: '/kyc', icon: ShieldCheck },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Geography', path: '/geography', icon: MapPin },
]

const DEFAULT_BOTTOM_NAV: NavItem[] = [
  { label: 'Support', path: '/support', icon: HelpCircle },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({
  navItems = DEFAULT_MAIN_NAV,
  bottomNavItems = DEFAULT_BOTTOM_NAV,
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
  userName = 'Olivia Rhye',
  userEmail = 'olivia@ui.com',
  userAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  logoTitle = 'ENTAPP TECH',
  logoSubtitle = 'Innovation Simplified',
  onLogout,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout()
    } else {
      navigate('/login')
    }
  }

  const isNavActive = (itemPath: string) => {
    if (itemPath === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/overview'
    }
    return location.pathname.startsWith(itemPath)
  }

  const filteredNavItems = navItems.filter((item) =>
    !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-gray-200/90 flex flex-col justify-between transition-all duration-300 ease-in-out',
          collapsed ? 'lg:w-20' : 'lg:w-64',
          mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6 shrink-0">
                <div className="bg-[#0052cc] rounded-[2px] h-3"></div>
                <div className="bg-[#0052cc] rounded-[2px] h-2"></div>
                <div className="bg-[#0052cc] rounded-[2px] h-2"></div>
                <div className="bg-[#0052cc] rounded-[2px] h-3"></div>
              </div>

              {!collapsed && (
                <div className="flex flex-col truncate">
                  <span className="font-bold tracking-tight text-gray-900 text-sm sm:text-base leading-tight truncate">
                    {logoTitle}
                  </span>
                  <span className="text-[11px] text-gray-500 font-normal truncate">
                    {logoSubtitle}
                  </span>
                </div>
              )}
            </div>

            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}

            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden text-gray-500 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {!collapsed && (
            <div className="px-4 py-3">
              <div className="relative flex items-center w-full">
                <Search className="w-4 h-4 absolute left-3 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-400 focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
                />
              </div>
            </div>
          )}

          <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              const active = isNavActive(item.path)

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group',
                    active
                      ? 'bg-[#F0F5FF] text-[#0052cc] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900',
                    collapsed && 'justify-center px-0'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 shrink-0 transition-colors',
                      active ? 'text-[#0052cc]' : 'text-gray-500 group-hover:text-gray-700'
                    )}
                  />
                  {!collapsed && <span className="truncate flex-1">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-gray-100 space-y-3">
          {bottomNavItems && bottomNavItems.length > 0 && (
            <nav className="space-y-1">
              {bottomNavItems.map((item) => {
                const Icon = item.icon
                const active = isNavActive(item.path)

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group',
                      active
                        ? 'bg-[#F0F5FF] text-[#0052cc] font-semibold'
                        : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900',
                      collapsed && 'justify-center px-0'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5 shrink-0 transition-colors',
                        active ? 'text-[#0052cc]' : 'text-gray-500 group-hover:text-gray-700'
                      )}
                    />
                    {!collapsed && <span className="truncate flex-1">{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          )}

          <div
            className={cn(
              'pt-2 border-t border-gray-100 flex items-center justify-between gap-3',
              collapsed && 'justify-center'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={userAvatar}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-200"
              />
              {!collapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-gray-900 truncate leading-snug">
                    {userName}
                  </span>
                  <span className="text-xs text-gray-500 truncate leading-snug">
                    {userEmail}
                  </span>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                type="button"
                onClick={handleLogoutClick}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
