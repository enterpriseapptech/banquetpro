import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { TransactionItem } from '@/utils/paymentsData'

export interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: TransactionItem | null
}

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!transaction) return null

  const getStatusBadge = (status: TransactionItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'Failed':
      case 'Refunded':
        return 'bg-rose-50 text-rose-600 border-rose-100'
      case 'Disputed':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        {/* Highlight Card */}
        <div className="bg-gray-50/90 rounded-2xl p-5 border border-gray-100 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Transaction ID</p>
              <p className="text-base font-bold text-gray-900 mt-0.5 tracking-tight">
                {transaction.transactionId}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                transaction.status
              )}`}
            >
              {transaction.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200/50">
            <div>
              <p className="text-xs text-gray-500 font-medium">Amount</p>
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5 tracking-tight">
                {transaction.amount.replace('+', '')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Date</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
                {transaction.date}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 px-1">
          <div>
            <p className="text-xs text-gray-500 font-medium">Type</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {transaction.type}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Related To</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {transaction.relatedTo}
            </p>
          </div>

          {transaction.description && (
            <div>
              <p className="text-xs text-gray-500 font-medium">Description</p>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 leading-relaxed">
                {transaction.description}
              </p>
            </div>
          )}

          {transaction.paymentMethod && (
            <div>
              <p className="text-xs text-gray-500 font-medium">Payment Method</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
                {transaction.paymentMethod}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default TransactionDetailsModal
