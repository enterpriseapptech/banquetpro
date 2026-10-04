import React, { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { KycDocument } from '@/utils/kycData'

// Lazy-loaded so PDF.js is only downloaded when a document is previewed.
const DocumentPreview = lazy(() => import('@/components/ui/DocumentPreview'))

interface KycDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  document: KycDocument | null
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

export const KycDocumentModal: React.FC<KycDocumentModalProps> = ({
  isOpen,
  onClose,
  document: doc,
  onApprove,
  onReject,
}) => {
  if (!doc) return null

  const isPending = doc.status === 'Pending'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="KYC Document Details" maxWidth="max-w-xl">
      <div className="space-y-5">
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500 font-medium">Document ID</p>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{doc.documentId}</p>
          </div>
          <StatusBadge label={doc.status} className="shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900">Provider Information</h4>
            <div>
              <p className="text-xs text-gray-500 font-medium">Provider Name</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{doc.providerName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Provider ID</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{doc.providerId}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900">Document Information</h4>
            <div>
              <p className="text-xs text-gray-500 font-medium">Document Type</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{doc.documentType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Uploaded Date</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{doc.uploadedDate}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">Document Preview</p>
          <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4">
            <Suspense
              fallback={
                <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading preview...
                </div>
              }
            >
              <DocumentPreview url={doc.documentUrl} fileName={doc.documentType} />
            </Suspense>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Close
          </Button>

          {isPending && (
            <>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  onReject?.(doc.id)
                  onClose()
                }}
                className="border-red-400 text-red-600 hover:bg-red-50 rounded-xl px-5 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Reject
              </Button>
              <Button
                type="button"
                variant="success"
                size="md"
                onClick={() => {
                  onApprove?.(doc.id)
                  onClose()
                }}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 text-xs sm:text-sm font-semibold shadow-2xs cursor-pointer"
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

export default KycDocumentModal
