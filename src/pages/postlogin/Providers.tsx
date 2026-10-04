import React, { useState } from 'react'
import { Users, TrendingUp, Wallet, Eye } from 'lucide-react'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { DataTable, Column } from '@/components/ui/DataTable'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import { ProviderDetailsModal } from '@/components/providers/ProviderDetailsModal'
import { ProviderItem, INITIAL_PROVIDERS, formatCurrency } from '@/utils/providersData'

export const Providers: React.FC = () => {
  const [providers] = useState<ProviderItem[]>(INITIAL_PROVIDERS)
  const [viewingProvider, setViewingProvider] = useState<ProviderItem | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewProvider = (provider: ProviderItem) => {
    setViewingProvider(provider)
    setIsDetailsOpen(true)
  }

  const activeCount = providers.filter((p) => p.subscription === 'Active').length
  const totalWallet = providers.reduce((sum, p) => sum + p.walletBalance, 0)

  const providerColumns: Column<ProviderItem>[] = [
    {
      key: 'businessName',
      header: 'Business Name',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900 text-xs sm:text-sm">
          {row.businessName}
        </span>
      ),
    },
    {
      key: 'serviceType',
      header: 'Service Type',
      render: (row) => (
        <span className="font-medium text-gray-700 text-xs sm:text-sm">{row.serviceType}</span>
      ),
    },
    {
      key: 'subscription',
      header: 'Subscription',
      render: (row) => <StatusBadge label={row.subscription} />,
    },
    {
      key: 'walletBalance',
      header: 'Wallet Balance',
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-900 text-xs sm:text-sm whitespace-nowrap">
          {formatCurrency(row.walletBalance)}
        </span>
      ),
    },
    {
      key: 'kycStatus',
      header: 'KYC Status',
      render: (row) => <StatusBadge label={row.kycStatus} />,
    },
    {
      key: 'certification',
      header: 'Certification',
      render: (row) => <StatusBadge label={row.certification} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <button
          type="button"
          onClick={() => handleViewProvider(row)}
          className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
    <PostloginLayout
      title="Service Providers"
      subtitle="View and manage service provider accounts"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <SummaryCard
            title="Total Providers"
            value={providers.length}
            subtitle="All registered providers"
            icon={<Users className="w-5 h-5 text-blue-600" />}
          />
          <SummaryCard
            title="Active Providers"
            value={activeCount}
            subtitle="With active subscriptions"
            icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          />
          <SummaryCard
            title="Total Wallet Balance"
            value={formatCurrency(totalWallet)}
            subtitle="Combined provider wallets"
            icon={<Wallet className="w-5 h-5 text-purple-500" />}
          />
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            All Service Providers
          </h3>

          <DataTable
            columns={providerColumns}
            data={providers}
            keyExtractor={(row) => row.id}
            currentPage={1}
            totalPages={10}
          />
        </div>
      </div>

      <ProviderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        provider={viewingProvider}
      />
    </PostloginLayout>
  )
}

export default Providers
