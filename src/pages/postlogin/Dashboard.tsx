import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquareCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StatCard } from '@/components/ui/StatCard'
import { DataTable, Column } from '@/components/ui/DataTable'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import { cn } from '@/utils'
import { BookingActivity, MOCK_ACTIVITIES, STAT_CARDS_DATA } from '@/utils/data'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string>('bookingId')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(key)
      setSortDirection('desc')
    }
  }

  const handleEdit = (row: BookingActivity) => {
    console.log('Edit booking:', row)
  }

  const handleDelete = (row: BookingActivity) => {
    console.log('Delete booking:', row)
  }

  const columns: Column<BookingActivity>[] = [
    {
      key: 'bookingId',
      header: 'Booking ID',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900 text-xs sm:text-sm">
          {row.bookingId}
        </span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer Names',
      render: (row) => (
        <span className="font-medium text-gray-900 text-xs sm:text-sm">
          {row.customerName}
        </span>
      ),
    },
    {
      key: 'serviceType',
      header: 'Service Type',
      render: (row) => (
        <span className="font-medium text-gray-700 text-xs sm:text-sm">
          {row.serviceType}
        </span>
      ),
    },
    {
      key: 'dateTime',
      header: 'Date and Time',
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm">
          {row.dateTime}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
            row.status === 'Confirmed' && 'bg-emerald-50 text-emerald-600 border border-emerald-100',
            row.status === 'Pending' && 'bg-amber-50 text-amber-600 border border-amber-100',
            row.status === 'Cancelled' && 'bg-rose-50 text-rose-600 border border-rose-100'
          )}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => (
        <span className="font-medium text-gray-900 text-xs sm:text-sm">
          {row.amount}
        </span>
      ),
    },
  ]

  return (
    <PostloginLayout
      title="Welcome back, Jonnuel"
      subtitle="Track, manage and forecast your customers and orders."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <Button
            variant="outline"
            size="md"
            leftIcon={<SquareCheck className="w-4 h-4 text-gray-700 shrink-0" />}
            onClick={() => navigate('/bookings')}
            className="border-gray-300 text-gray-800 font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-2xs hover:bg-gray-50 cursor-pointer bg-white"
          >
            Manage Bookings
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {STAT_CARDS_DATA.map((card) => (
            <StatCard
              key={card.id}
              title={card.title}
              value={card.value}
              trend={card.trend}
              chartData={card.chartData}
              highlightIndex={card.highlightIndex}
              colorScheme={card.colorScheme}
            />
          ))}
        </div>

        <DataTable
          title="Recent Activities"
          subtitle="List of recent event and catering bookings."
          columns={columns}
          data={MOCK_ACTIVITIES}
          keyExtractor={(row) => row.id}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </PostloginLayout>
  )
}

export default Dashboard
