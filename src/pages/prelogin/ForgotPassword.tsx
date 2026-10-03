import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { TextInput } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert, AlertVariant } from '@/components/ui/Alert'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/utils'

const RECOGNIZED_EMAIL = 'entapptech@mail.com'

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
})

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>

interface AlertState {
  variant: AlertVariant
  title: string
  description: React.ReactNode
}

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<AlertState | null>(null)
  const [customEmailError, setCustomEmailError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setCustomEmailError(null)
    setAlert(null)
    setIsSubmitting(true)

    try {
      await new Promise((res) => setTimeout(res, 600))

      if (data.email.toLowerCase() !== RECOGNIZED_EMAIL) {
        setCustomEmailError('This email is not recognized on our system.')
        return
      }

      setAlert({
        variant: 'success',
        title: 'Verification code has been sent',
        description: (
          <span>
            please check <strong className="font-bold">{data.email}</strong> for the code
          </span>
        ),
      })

      setTimeout(() => {
        navigate('/verify-email', { state: { email: data.email, isResetPassword: true } })
      }, 1000)
    } catch (err) {
      console.error(err)
      setCustomEmailError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      {alert && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Alert
            variant={alert.variant}
            title={alert.title}
            description={alert.description}
            closable
            onClose={() => setAlert(null)}
            className={cn(
              'shadow-xl',
              alert.variant === 'success' ? 'border-emerald-200' : 'border-red-200'
            )}
          />
        </div>
      )}

      <Logo />

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 font-medium mt-1.5">
          Enter your email to get a verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <TextInput
          id="email"
          label="Email"
          placeholder="Enter your email"
          size="middle"
          leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
          {...register('email')}
          onChange={(e) => {
            if (customEmailError) setCustomEmailError(null)
            register('email').onChange(e)
          }}
          error={Boolean(errors.email || customEmailError)}
          errorMessage={errors.email?.message || customEmailError}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="large"
            block
            loading={isSubmitting}
            className="w-full bg-[#0052cc] hover:bg-[#0047ba] active:bg-[#003d99] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm border-none cursor-pointer"
          >
            Send code
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-[#0052cc] font-bold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
