import React, { useState } from 'react'
import { cn } from '@/utils'
import { Sidebar, Header, NavItem } from '@/components/layout'

export interface PostloginLayoutProps {
  children: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  userName?: string
  userEmail?: string
  userAvatar?: string
  headerActions?: React.ReactNode
  navItems?: NavItem[]
  bottomNavItems?: NavItem[]
}

export const PostloginLayout: React.FC<PostloginLayoutProps> = ({
  children,
  title = 'Welcome back, Jonnuel',
  subtitle = 'Track, manage and forecast your customers and orders.',
  userName = 'Olivia Rhye',
  userEmail = 'olivia@ui.com',
  userAvatar,
  headerActions,
  navItems,
  bottomNavItems,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50/60 font-['Inter']">
      {/* Reusable Sidebar Component */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        navItems={navItems}
        bottomNavItems={bottomNavItems}
      />

      {/* Main Right Content Section */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-300',
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        {/* Top Header Component (Welcome back greeting + Upgrade/Settings/Bell) */}
        <Header
          title={title}
          subtitle={subtitle}
          actions={headerActions}
          onOpenMobileMenu={() => setMobileOpen(true)}
          userName={userName}
          userAvatar={userAvatar}
        />

        {/* Dynamic Children Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default PostloginLayout
