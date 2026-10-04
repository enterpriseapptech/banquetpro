import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ProviderItem, formatCurrency } from '@/utils/providersData'

interface ProviderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  provider: ProviderItem | null
}

export const ProviderDetailsModal: React.FC<ProviderDetailsModalProps> = ({
  isOpen,
  onClose,
  provider,
}) => {
  if (!provider) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Provider Details" maxWidth="max-w-xl">
      <div className="space-y-5">
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium">Business Name</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                {provider.businessName}
              </p>
            </div>
            <StatusBadge label={provider.subscription} className="shrink-0" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">Wallet Balance</p>
              <p className="text-lg font-semibold text-gray-900 mt-0.5 whitespace-nowrap">
                {formatCurrency(provider.walletBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Service Type</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {provider.serviceType}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900">Contact Information</h4>
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5 break-all">
                {provider.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Phone</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{provider.phone}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900">Status Information</h4>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium">KYC Status</p>
              <StatusBadge label={provider.kycStatus} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 font-medium">Certification Status</p>
              <StatusBadge label={provider.certification} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100/70 rounded-xl px-4 py-3 text-xs sm:text-sm text-blue-700 font-medium leading-relaxed">
          <span className="font-bold">Note:</span> This provider can request withdrawals from
          their wallet balance and manage their services through the provider portal.
        </div>

        <div className="flex items-center justify-end pt-1">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProviderDetailsModal
