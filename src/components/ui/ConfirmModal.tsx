import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: React.ReactNode
  confirmText?: string
  cancelText?: string
  /** 'danger' renders the confirm button with a red background (use for deletes). */
  variant?: 'danger' | 'primary'
  loading?: boolean
}

/**
 * Reusable confirmation modal.
 * Use this anywhere a destructive action (delete, remove, cancel) needs confirmation.
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-6">
        <div className="text-sm font-medium text-gray-600 leading-relaxed">
          {message}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            loading={loading}
            onClick={handleConfirm}
            className={
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 text-xs sm:text-sm font-semibold shadow-2xs cursor-pointer'
                : 'bg-[#0052cc] hover:bg-blue-700 text-white rounded-xl px-5 text-xs sm:text-sm font-semibold shadow-2xs cursor-pointer'
            }
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
