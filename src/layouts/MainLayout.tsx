import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Calendar, Utensils, Settings, Bell, Menu, X } from 'lucide-react'
import { Badge, Avatar } from 'antd'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Banquets', path: '/banquets', icon: Utensils },
    { label: 'Bookings', path: '/bookings', icon: Calendar },
    { label: 'Settings', path: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Utensils className="w-6 h-6 text-indigo-400" />
            <span className="font-bold text-lg tracking-wide text-white">BanquetPro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-slate-500 text-sm font-medium">Banquet Management System</span>
          </div>

          <div className="flex items-center gap-4">
            <Badge count={3} size="small">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </Badge>
            <Avatar className="bg-indigo-600 cursor-pointer">BP</Avatar>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  )
}
