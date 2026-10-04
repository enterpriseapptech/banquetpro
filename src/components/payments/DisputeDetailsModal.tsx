import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { TextAreaInput } from '@/components/ui/Input'
import { DisputeItem } from '@/utils/paymentsData'

interface DisputeDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  dispute: DisputeItem | null
  onResolve?: (disputeId: string, notes: string) => void
  onReject?: (disputeId: string, notes: string) => void
}

export const DisputeDetailsModal: React.FC<DisputeDetailsModalProps> = ({
  isOpen,
  onClose,
  dispute,
  onResolve,
  onReject,
}) => {
  const [resolutionNotes, setResolutionNotes] = useState('')

  useEffect(() => {
    if (dispute) {
      setResolutionNotes(dispute.resolutionNotes || '')
    }
  }, [dispute])

  if (!dispute) return null

  const isOpenStatus = dispute.status === 'Open'

  const handleResolveClick = () => {
    if (onResolve) {
      onResolve(dispute.id, resolutionNotes)
    }
    onClose()
  }

  const handleRejectClick = () => {
    if (onReject) {
      onReject(dispute.id, resolutionNotes)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispute Details"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Top Summary Box */}
        <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4.5 flex items-start justify-between">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500 font-medium">Dispute ID</p>
              <p className="text-base font-bold text-gray-900 tracking-tight">
                {dispute.disputeId}
              </p>
            </div>
            <div className="flex items-center gap-6 pt-1">
              <div>
                <p className="text-xs text-gray-400 font-medium">Created Date</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {dispute.createdDate}
                </p>
              </div>
              {dispute.resolvedDate && (
                <div>
                  <p className="text-xs text-gray-400 font-medium">Resolved Date</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800">
                    {dispute.resolvedDate}
                  </p>
                </div>
              )}
            </div>
          </div>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
              isOpenStatus
                ? 'bg-amber-50 text-amber-600 border-amber-100'
                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
            }`}
          >
            {dispute.status}
          </span>
        </div>

        {/* Detailed Information Grid */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">User</p>
            <p className="font-semibold text-gray-900">{dispute.user}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Payment ID</p>
            <p className="font-semibold text-gray-900">{dispute.paymentId}</p>
          </div>

          {dispute.serviceRequestId && (
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">
                Service Request ID
              </p>
              <p className="font-semibold text-gray-900">
                {dispute.serviceRequestId}
              </p>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Reason</p>
            <p className="font-medium text-gray-800 leading-relaxed">
              {dispute.reason}
            </p>
          </div>

          {!isOpenStatus && dispute.resolutionNotes && (
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">
                Resolution
              </p>
              <p className="font-medium text-gray-800 leading-relaxed">
                {dispute.resolutionNotes}
              </p>
            </div>
          )}

          {isOpenStatus && (
            <div className="pt-2">
              <TextAreaInput
                label="Resolution Notes"
                placeholder="Enter resolution details..."
                rows={3}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-200 text-gray-700 font-semibold rounded-xl px-5"
          >
            Close
          </Button>

          {isOpenStatus && (
            <>
              <Button
                variant="outline"
                size="md"
                onClick={handleRejectClick}
                className="border-rose-300 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl px-5"
              >
                Reject
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleResolveClick}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-5 border-none"
              >
                Resolve
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default DisputeDetailsModal
