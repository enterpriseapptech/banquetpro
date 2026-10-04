import React, { useState } from 'react'
import {
  Wallet,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Landmark,
  Eye,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { DataTable, Column } from '@/components/ui/DataTable'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import { TransactionItem, MOCK_TRANSACTIONS } from '@/utils/paymentsData'
import { TransactionDetailsModal } from '@/components/payments/TransactionDetailsModal'

export const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'invoices' | 'refunds' | 'disputes'>('transactions')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed' | 'Failed'>('All')
  const [transactions] = useState<TransactionItem[]>(MOCK_TRANSACTIONS)
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionItem | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleViewTransaction = (item: TransactionItem) => {
    setSelectedTransaction(item)
    setIsDetailsModalOpen(true)
  }

  // Filter transactions based on sub-filter pill
  const filteredTransactions = transactions.filter((t) => {
    if (statusFilter === 'All') return true
    return t.status === statusFilter
  })

  // DataTable Column definitions matching the screenshot
  const transactionColumns: Column<TransactionItem>[] = [
    {
      key: 'transactionId',
      header: 'Transaction ID',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-gray-900 text-xs sm:text-sm">
          {row.transactionId}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (row) => (
        <span className="font-medium text-gray-700 text-xs sm:text-sm">
          {row.type}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (row) => (
        <span
          className={`font-extrabold text-xs sm:text-sm ${
            row.isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {row.amount}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm font-medium">
          {row.date}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        let badgeStyle = 'bg-gray-100 text-gray-600 border-gray-200'
        if (row.status === 'Completed') {
          badgeStyle = 'bg-emerald-50 text-emerald-600 border-emerald-100'
        } else if (row.status === 'Pending' || row.status === 'Disputed') {
          badgeStyle = 'bg-amber-50 text-amber-600 border-amber-100'
        } else if (row.status === 'Failed' || row.status === 'Refunded') {
          badgeStyle = 'bg-rose-50 text-rose-600 border-rose-100'
        }

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}
          >
            {row.status}
          </span>
        )
      },
    },
    {
      key: 'relatedTo',
      header: 'Related To',
      render: (row) => (
        <span className="font-medium text-gray-800 text-xs sm:text-sm">
          {row.relatedTo}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <button
          type="button"
          onClick={() => handleViewTransaction(row)}
          className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          title="View Transaction Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
    <PostloginLayout
      title="Payment & Wallet Management"
      subtitle="View platform transactions, invoices, refunds, and manage disputes"
    >
      <div className="space-y-6">
        {/* Secondary Header Actions Row */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="md"
            leftIcon={<Landmark className="w-4 h-4 text-gray-700 shrink-0" />}
            className="border-gray-300 text-gray-800 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xs hover:bg-gray-50 cursor-pointer bg-white"
          >
            Manage Accounts
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<ArrowUpRight className="w-4 h-4 shrink-0" />}
            className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Request Withdrawal
          </Button>
        </div>

        {/* 4 Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Total Balance"
            value="$125,000"
            subtitle="Platform wallet"
            icon={<Wallet className="w-5 h-5 text-blue-600" />}
          />

          <SummaryCard
            title="Available"
            value="$98,500"
            subtitle="Ready for withdrawal"
            icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          />

          <SummaryCard
            title="Pending"
            value="$8,500"
            subtitle="In processing"
            icon={<TrendingUp className="w-5 h-5 text-amber-500" />}
          />

          <SummaryCard
            title="Commission Earned"
            value="$26,500"
            subtitle="This month"
            icon={<ArrowUpRight className="w-5 h-5 text-blue-600" />}
          />
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-gray-200/80 pb-3 overflow-x-auto scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab('transactions')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-[#0052cc] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-medium'
            }`}
          >
            Transactions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('invoices')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'invoices'
                ? 'bg-[#0052cc] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-medium'
            }`}
          >
            Invoices
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('refunds')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'refunds'
                ? 'bg-[#0052cc] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-medium'
            }`}
          >
            Refunds
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disputes')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'disputes'
                ? 'bg-[#0052cc] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-medium'
            }`}
          >
            Disputes
          </button>
        </div>

        {/* Tab 1: Transactions Content */}
        {activeTab === 'transactions' && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
            {/* Header & Export Icon */}
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Transaction History
              </h3>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-gray-200"
                title="Export Transactions"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Filter Status Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
              {(['All', 'Pending', 'Completed', 'Failed'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#0052cc] text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Transactions DataTable */}
            <DataTable
              columns={transactionColumns}
              data={filteredTransactions}
              keyExtractor={(row) => row.id}
              currentPage={1}
              totalPages={10}
            />
          </div>
        )}

        {/* Tab 2, 3, 4 Placeholders */}
        {activeTab !== 'transactions' && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center text-gray-500 font-medium">
            <p className="text-base font-semibold text-gray-800 capitalize">
              {activeTab} Management
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Select the Transactions tab to view full platform transaction history.
            </p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </PostloginLayout>
  )
}

export default Payments
