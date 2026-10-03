import React from 'react'
import {
  Calendar,
  CheckCircle2,
  TrendingUp,
  LogOut,
  Plus,
  Clock,
  ChevronRight,
  UserCheck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

interface RecentBooking {
  id: string
  clientName: string
  eventType: string
  date: string
  status: 'Confirmed' | 'Pending' | 'Completed'
  amount: string
}

const RECENT_BOOKINGS: RecentBooking[] = [
  {
    id: 'BK-1082',
    clientName: 'Sarah Jenkins',
    eventType: 'Wedding Reception',
    date: 'Oct 14, 2026',
    status: 'Confirmed',
    amount: '$4,200',
  },
  {
    id: 'BK-1083',
    clientName: 'Acme Corp',
    eventType: 'Annual Gala',
    date: 'Oct 18, 2026',
    status: 'Pending',
    amount: '$6,500',
  },
  {
    id: 'BK-1084',
    clientName: 'Michael Brown',
    eventType: 'Birthday Banquet',
    date: 'Oct 22, 2026',
    status: 'Confirmed',
    amount: '$1,800',
  },
]

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-['Inter']">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between shadow-2xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Logo className="mb-0" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 pr-2 sm:pr-4 border-r border-gray-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0052cc] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-xs">
              E
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-gray-900 leading-none">Entapp Tech</p>
              <p className="text-xs text-gray-500 mt-0.5">entapptech@mail.com</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="small"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-gray-700 hover:text-red-600 border-gray-300 hover:border-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-medium text-xs sm:text-sm">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#0052cc] via-[#0047ba] to-[#003d99] rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Entapp Tech! 👋
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1.5 max-w-xl">
              You are logged in to your BanquetPro dashboard. Here is a summary of your events and bookings today.
            </p>
          </div>

          <Button
            variant="secondary"
            className="bg-white text-[#0052cc] hover:bg-blue-50 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shrink-0 flex items-center gap-2 border-none shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Booking</span>
          </Button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Bookings</p>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">24</h3>
              </div>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirmed Events</p>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">18</h3>
              </div>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              75% Rate
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Revenue</p>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">$12,450</h3>
              </div>
            </div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Target 85%
            </span>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Event Bookings</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Latest client reservations and status</p>
            </div>
            <button
              type="button"
              className="text-xs sm:text-sm text-[#0052cc] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Table for Tablet / Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6">Booking ID</th>
                  <th className="py-3.5 px-6">Client</th>
                  <th className="py-3.5 px-6">Event Type</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {RECENT_BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-bold">{booking.id}</td>
                    <td className="py-4 px-6 text-gray-800">{booking.clientName}</td>
                    <td className="py-4 px-6 text-gray-600">{booking.eventType}</td>
                    <td className="py-4 px-6 text-gray-600">{booking.date}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          booking.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-gray-900">
                      {booking.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="sm:hidden divide-y divide-gray-100">
            {RECENT_BOOKINGS.map((booking) => (
              <div key={booking.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">{booking.id}</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{booking.clientName}</p>
                    <p className="text-xs text-gray-500">{booking.eventType} • {booking.date}</p>
                  </div>
                  <span className="text-sm font-extrabold text-gray-900">{booking.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
