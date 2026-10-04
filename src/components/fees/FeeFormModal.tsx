import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { TextInput, TextAreaInput, SelectInput } from '@/components/ui/Input'
import {
  FeeItem,
  FeeType,
  FeeStatus,
  FEE_TYPE_OPTIONS,
  FEE_CURRENCY_OPTIONS,
  FEE_STATUS_OPTIONS,
} from '@/utils/feesData'

export interface FeeFormValues {
  name: string
  type: string
  amount: string
  currency: string
  description: string
  status: string
}

const feeSchema = yup.object().shape({
  name: yup.string().trim().required('Fee name is required'),
  type: yup.string().required('Fee type is required'),
  amount: yup
    .string()
    .trim()
    .required('Amount is required')
    .test('is-number', 'Amount must be a valid number', (val) => {
      if (!val) return false
      const num = Number(val)
      return !isNaN(num) && num >= 0
    }),
  currency: yup.string().required('Currency is required'),
  description: yup.string().trim().default(''),
  status: yup.string().required('Status is required'),
})

export interface FeeFormData {
  id?: string
  name: string
  type: FeeType
  amount: number
  currency: string
  description: string
  status: FeeStatus
}

interface FeeFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FeeFormData) => void
  /** When provided the modal is in "Edit Fee" mode. */
  initialData?: FeeItem | null
}

const EMPTY_VALUES: FeeFormValues = {
  name: '',
  type: '',
  amount: '0',
  currency: '',
  description: '',
  status: '',
}

export const FeeFormModal: React.FC<FeeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FeeFormValues>({
    resolver: yupResolver(feeSchema),
    mode: 'onChange',
    defaultValues: EMPTY_VALUES,
  })

  useEffect(() => {
    if (!isOpen) return
    if (initialData) {
      reset({
        name: initialData.name,
        type: initialData.type,
        amount: String(initialData.amount),
        currency: initialData.currency,
        description: initialData.description,
        status: initialData.status,
      })
    } else {
      reset(EMPTY_VALUES)
    }
  }, [isOpen, initialData, reset])

  const handleFormSubmit = (data: FeeFormValues) => {
    onSubmit({
      id: initialData?.id,
      name: data.name.trim(),
      type: data.type as FeeType,
      amount: Number(data.amount),
      currency: data.currency,
      description: data.description?.trim() || '',
      status: data.status as FeeStatus,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Fee' : 'Add Fee'}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <TextInput
          label="Fee Name"
          placeholder="KYC Verification Fee"
          error={errors.name?.message}
          {...register('name')}
        />

        <SelectInput
          label="Fee Type"
          placeholder="Select fee type"
          options={FEE_TYPE_OPTIONS}
          error={errors.type?.message}
          {...register('type')}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Amount"
            type="number"
            min={0}
            step="0.01"
            placeholder="0"
            error={errors.amount?.message}
            {...register('amount')}
          />
          <SelectInput
            label="Currency"
            placeholder="Select"
            options={FEE_CURRENCY_OPTIONS}
            error={errors.currency?.message}
            {...register('currency')}
          />
        </div>

        <TextAreaInput
          label="Description"
          placeholder="Describe the purpose of this fee..."
          rows={3}
          {...register('description')}
        />

        <SelectInput
          label="Status"
          placeholder="Select status"
          options={FEE_STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />

        <div className="flex items-center justify-end gap-3 pt-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            disabled={!isValid}
            className="bg-[#0052cc] hover:bg-blue-700 text-white rounded-xl px-5 text-xs sm:text-sm font-semibold shadow-2xs cursor-pointer"
          >
            {isEditing ? 'Save Changes' : 'Add Fee'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FeeFormModal
