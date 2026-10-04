import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Modal } from '@/components/ui/Modal'
import { TextInput } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SubscribedUser } from '@/utils/subscriptionData'

export interface ChangeUserPlanValues {
  businessName: string
  planName: string
  startDate: string
  renewalDate: string
}

const changePlanSchema = yup.object().shape({
  businessName: yup.string().trim().required('Business name is required'),
  planName: yup.string().trim().required('Subscription plan is required'),
  startDate: yup.string().trim().required('Start date is required'),
  renewalDate: yup.string().trim().required('Renewal date is required'),
})

export interface ChangeUserPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (user: Omit<SubscribedUser, 'id' | 'status'> & { id?: string; status?: 'Active' | 'Expired' | 'Cancelled' }) => void
  user?: SubscribedUser | null
}

export const ChangeUserPlanModal: React.FC<ChangeUserPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}) => {
  const isAssigning = !user

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangeUserPlanValues>({
    resolver: yupResolver(changePlanSchema),
    defaultValues: {
      businessName: '',
      planName: '',
      startDate: '',
      renewalDate: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (user) {
        reset({
          businessName: user.businessName,
          planName: user.planName,
          startDate: user.startDate,
          renewalDate: user.renewalDate,
        })
      } else {
        const today = new Date().toISOString().split('T')[0]
        const nextMonth = new Date()
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        const nextMonthStr = nextMonth.toISOString().split('T')[0]

        reset({
          businessName: '',
          planName: 'Professional Plan',
          startDate: today,
          renewalDate: nextMonthStr,
        })
      }
    }
  }, [isOpen, user, reset])

  const handleFormSubmit = (data: ChangeUserPlanValues) => {
    onSubmit({
      id: user?.id,
      businessName: data.businessName,
      planName: data.planName,
      startDate: data.startDate,
      renewalDate: data.renewalDate,
      status: user?.status || 'Active',
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAssigning ? 'Assign Subscription Plan' : 'Change Subscription Plan'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <TextInput
          label="Business Name"
          placeholder="e.g. Grand Ballroom Hall"
          disabled={!isAssigning}
          error={errors.businessName?.message}
          {...register('businessName')}
        />

        <TextInput
          label="Subscription Plan"
          placeholder="e.g. Professional Plan"
          error={errors.planName?.message}
          {...register('planName')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Start Date"
            placeholder="e.g. 2025-01-01"
            error={errors.startDate?.message}
            {...register('startDate')}
          />
          <TextInput
            label="Renewal Date"
            placeholder="e.g. 2025-02-01"
            error={errors.renewalDate?.message}
            {...register('renewalDate')}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            className="bg-[#0052cc] hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-2xs cursor-pointer"
          >
            {isAssigning ? 'Assign Plan' : 'Change Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ChangeUserPlanModal
