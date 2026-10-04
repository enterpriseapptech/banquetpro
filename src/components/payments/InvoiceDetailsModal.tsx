import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { InvoiceItem } from '@/utils/paymentsData'

export interface InvoiceDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: InvoiceItem | null
}

export const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  if (!invoice) return null

  const getStatusBadge = (status: InvoiceItem['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'Pending':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'Overdue':
        return 'bg-rose-50 text-rose-600 border-rose-100'
      case 'Partially Paid':
        return 'bg-blue-50 text-blue-600 border-blue-100'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Details" maxWidth="max-w-md">
      <div className="space-y-6">
        {/* Highlight Card */}
        <div className="bg-gray-50/90 rounded-2xl p-5 border border-gray-100 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Invoice Reference</p>
              <p className="text-base font-bold text-gray-900 mt-0.5 tracking-tight">
                {invoice.invoiceRef}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                invoice.status
              )}`}
            >
              {invoice.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200/50">
            <div>
              <p className="text-xs text-gray-500 font-medium">Amount Due</p>
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5 tracking-tight">
                {invoice.amount}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Due Date</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
                {invoice.dueDate}
              </p>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-4 px-1">
          <div>
            <p className="text-xs text-gray-500 font-medium">User</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {invoice.user}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Related To</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {invoice.relatedTo}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Payments Linked</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
              {invoice.paymentsLinked.includes('linked')
                ? `${invoice.paymentsLinked.replace('linked', '').trim()} payment(s)`
                : invoice.paymentsLinked}
            </p>
          </div>

          {invoice.createdAt && (
            <div>
              <p className="text-xs text-gray-500 font-medium">Created At</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-0.5">
                {invoice.createdAt}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
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

export default InvoiceDetailsModal
