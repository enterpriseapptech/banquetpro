import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { RefundItem } from '@/utils/paymentsData'

export interface RefundDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  refund: RefundItem | null
  onApprove?: (refundId: string) => void
  onDecline?: (refundId: string) => void
}

export const RefundDetailsModal: React.FC<RefundDetailsModalProps> = ({
  isOpen,
  onClose,
  refund,
  onApprove,
  onDecline,
}) => {
  if (!refund) return null

  const getStatusBadge = (status: RefundItem['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'Requested':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'Processing':
        return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'Declined':
        return 'bg-rose-50 text-rose-600 border-rose-100'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const isRequested = refund.status === 'Requested'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Refund Request Details" maxWidth="max-w-md">
      <div className="space-y-6">
        {/* Highlight Card */}
        <div className="bg-gray-50/90 rounded-2xl p-5 border border-gray-100 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Refund ID</p>
              <p className="text-base font-bold text-gray-900 mt-0.5 tracking-tight">
                {refund.refundId}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                refund.status
              )}`}
            >
              {refund.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200/50">
            <div>
              <p className="text-xs text-gray-500 font-medium">Amount</p>
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5 tracking-tight">
                {refund.amount}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Request Date</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
                {refund.requestDate}
              </p>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-4 px-1">
          <div>
            <p className="text-xs text-gray-500 font-medium">Payment Reference</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {refund.paymentRef}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Requested By</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {refund.requestedBy}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Reason</p>
            <p className="text-xs sm:text-sm text-gray-800 font-medium mt-0.5 leading-relaxed">
              {refund.reason}
            </p>
          </div>

          {refund.processedDate && (
            <div>
              <p className="text-xs text-gray-500 font-medium">Processed Date</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
                {refund.processedDate}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Close
          </Button>

          {isRequested && (
            <>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  onDecline?.(refund.id)
                  onClose()
                }}
                className="border-red-500 text-red-500 hover:bg-red-50 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Decline
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  onApprove?.(refund.id)
                  onClose()
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default RefundDetailsModal
