import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  children: React.ReactNode
  maxWidth?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl'
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gray-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click handler */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl w-full border border-gray-100 overflow-hidden transform transition-all z-10 my-auto animate-in zoom-in-95 duration-200',
          maxWidth,
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-white">
            {typeof title === 'string' ? (
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {title}
              </h3>
            ) : (
              title
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[82vh]">{children}</div>
      </div>
    </div>
  )
}

export default Modal
