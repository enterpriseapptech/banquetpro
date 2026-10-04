import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { FeeItem, formatFeeAmount } from '@/utils/feesData'

interface FeeDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  fee: FeeItem | null
}

export const FeeDetailsModal: React.FC<FeeDetailsModalProps> = ({
  isOpen,
  onClose,
  fee,
}) => {
  if (!fee) return null

  const isActive = fee.status === 'Active'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fee Details" maxWidth="max-w-md">
      <div className="space-y-5">
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Fee Name</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{fee.name}</p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-gray-100 text-gray-600 border-gray-200'
              }`}
            >
              {fee.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">Amount</p>
              <p className="text-base font-semibold text-gray-900 mt-0.5">
                {formatFeeAmount(fee)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Type</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{fee.type}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium">Description</p>
          <p className="text-sm font-medium text-gray-900 mt-0.5">{fee.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium">Created At</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{fee.createdAt}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Last Updated</p>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{fee.lastUpdated}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium">Updated By</p>
          <p className="text-sm font-medium text-gray-900 mt-0.5">{fee.updatedBy}</p>
        </div>

        <div className="flex items-center justify-end pt-2">
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

export default FeeDetailsModal
