import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { TextInput, TextAreaInput, SelectInput } from '@/components/ui/Input'
import { PRIORITY_OPTIONS } from '@/utils/supportData'

export interface SupportRequestValues {
  name: string
  email: string
  subject: string
  priority: string
  message: string
}

const supportSchema = yup.object().shape({
  name: yup.string().trim().required('Your name is required'),
  email: yup.string().trim().email('Enter a valid email address').required('Email is required'),
  subject: yup.string().trim().required('Subject is required'),
  priority: yup.string().required('Priority is required'),
  message: yup.string().trim().min(10, 'Please describe your issue in more detail').required('Message is required'),
})

const EMPTY_VALUES: SupportRequestValues = {
  name: '',
  email: '',
  subject: '',
  priority: '',
  message: '',
}

export interface SupportRequestFormProps {
  onSubmit?: (values: SupportRequestValues) => Promise<void> | void
}

export const SupportRequestForm: React.FC<SupportRequestFormProps> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupportRequestValues>({
    resolver: yupResolver(supportSchema),
    defaultValues: EMPTY_VALUES,
  })

  const handleFormSubmit = async (values: SupportRequestValues) => {
    await onSubmit?.(values)
    setSubmitted(true)
    reset(EMPTY_VALUES)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      onChange={() => submitted && setSubmitted(false)}
      className="space-y-4"
      noValidate
    >
      {submitted && (
        <Alert
          variant="success"
          title="Request submitted"
          description="Our support team will get back to you within 24 hours."
          closable
          onClose={() => setSubmitted(false)}
        />
      )}

      <TextInput
        label="Your Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <TextInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <TextInput
        label="Subject"
        placeholder="Brief description of your issue"
        error={errors.subject?.message}
        {...register('subject')}
      />

      <SelectInput
        label="Priority"
        placeholder="Select priority"
        options={PRIORITY_OPTIONS}
        error={errors.priority?.message}
        {...register('priority')}
      />

      <TextAreaInput
        label="Message"
        placeholder="Describe your issue in detail..."
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
        leftIcon={<Send className="w-4 h-4 shrink-0" />}
        className="bg-[#0052cc] hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-2xs cursor-pointer"
      >
        Submit Request
      </Button>
    </form>
  )
}

export default SupportRequestForm
