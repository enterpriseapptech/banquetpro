import React from 'react'
import { Check } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { SubscriptionPlan } from '@/utils/subscriptionData'

export interface PlanDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  plan: SubscriptionPlan | null
}

export const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  if (!plan) return null

  const formattedPrice = plan.price.startsWith('$') ? plan.price : `$${plan.price}`

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Plan Details" maxWidth="max-w-lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Plan Name</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
              {plan.name}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Billing Type</p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
              {plan.billingType}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Price</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
              {formattedPrice}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Status</p>
            <div className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${plan.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
              >
                {plan.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-gray-100">
          <p className="text-xs sm:text-sm font-medium text-gray-500">Features</p>
          <div className="space-y-2">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PlanDetailsModal
