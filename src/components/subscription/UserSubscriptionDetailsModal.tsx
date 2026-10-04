import React from 'react'
import { Modal } from '@/components/ui/Modal'
import { SubscribedUser } from '@/utils/subscriptionData'

export interface UserSubscriptionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: SubscribedUser | null
}

export const UserSubscriptionDetailsModal: React.FC<UserSubscriptionDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!user) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Subscription Details" maxWidth="max-w-lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Business Name</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
              {user.businessName}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Plan</p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
              {user.planName}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Status</p>
            <div className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  user.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Start Date</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{user.startDate}</p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Renewal Date</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{user.renewalDate}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UserSubscriptionDetailsModal
