import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { TextInput } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SubscriptionPlan } from '@/utils/subscriptionData'

export interface PlanFormValues {
  name: string
  billingType: string
  price: string
}

const planSchema = yup.object().shape({
  name: yup.string().trim().required('Plan Name is required'),
  billingType: yup.string().trim().required('Billing Type is required'),
  price: yup
    .string()
    .trim()
    .required('Price is required')
    .test('is-number', 'Price must be a valid number', (val) => {
      if (!val) return false
      const num = Number(val.replace('$', ''))
      return !isNaN(num) && num >= 0
    }),
})

export interface PlanFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (plan: Omit<SubscriptionPlan, 'id' | 'status'> & { id?: string }) => void
  initialData?: SubscriptionPlan | null
}

export const PlanFormModal: React.FC<PlanFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData)
  const [features, setFeatures] = useState<string[]>([])
  const [newFeatureInput, setNewFeatureInput] = useState('')
  const [featureError, setFeatureError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormValues>({
    resolver: yupResolver(planSchema),
    defaultValues: {
      name: '',
      billingType: '',
      price: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          billingType: initialData.billingType,
          price: String(initialData.price).replace('$', ''),
        })
        setFeatures(initialData.features || [])
      } else {
        reset({
          name: '',
          billingType: 'Monthly',
          price: '',
        })
        setFeatures([])
      }
      setNewFeatureInput('')
      setFeatureError(null)
    }
  }, [isOpen, initialData, reset])

  const handleAddFeature = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = newFeatureInput.trim()
    if (!trimmed) {
      setFeatureError('Feature cannot be empty')
      return
    }
    if (features.includes(trimmed)) {
      setFeatureError('Feature already added')
      return
    }
    setFeatures((prev) => [...prev, trimmed])
    setNewFeatureInput('')
    setFeatureError(null)
  }

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFeatureChange = (index: number, value: string) => {
    setFeatures((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleFormSubmit = (data: PlanFormValues) => {
    onSubmit({
      id: initialData?.id,
      name: data.name,
      billingType: data.billingType,
      price: data.price.startsWith('$') ? data.price : `$${data.price}`,
      features,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Subscription Plan' : 'Create Subscription Plan'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <TextInput
          label="Plan Name"
          placeholder="e.g. Basic Plan"
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Billing Type"
            placeholder="e.g. Monthly"
            error={errors.billingType?.message}
            {...register('billingType')}
          />
          <TextInput
            label="Price ($)"
            placeholder="e.g. 49"
            error={errors.price?.message}
            {...register('price')}
          />
        </div>

        <div className="space-y-3 pt-1">
          <label className="block text-sm font-bold text-gray-900 select-none">
            Features
          </label>

          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <TextInput
                  value={feature}
                  onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  containerClassName="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => handleRemoveFeature(idx)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                  title="Remove feature"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <TextInput
              placeholder="Add a feature..."
              value={newFeatureInput}
              onChange={(e) => {
                setNewFeatureInput(e.target.value)
                setFeatureError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddFeature()
                }
              }}
              error={featureError || undefined}
              containerClassName="flex-1"
            />
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleAddFeature}
              className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-2xs cursor-pointer shrink-0 self-start"
            >
              Add
            </Button>
          </div>
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
            {isEditing ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default PlanFormModal
