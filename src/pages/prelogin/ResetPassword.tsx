import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Check } from 'lucide-react'
import { PasswordInput } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert, AlertVariant } from '@/components/ui/Alert'
import { cn } from '@/utils'
import { Logo } from '@/components/ui'

const REQUIRED_PASSWORD = 'Fistobobo12@'

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please re-enter your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>

interface Requirement {
  id: string
  label: string
  test: (val: string) => boolean
}

const PASSWORD_REQUIREMENTS: Requirement[] = [
  { id: 'length', label: 'Must be at least 8 characters.', test: (v) => v.length >= 8 },
  { id: 'uppercase', label: '1 uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { id: 'number', label: '1 or more number', test: (v) => /[0-9]/.test(v) },
  { id: 'special', label: '1 or more special character', test: (v) => /[^a-zA-Z0-9]/.test(v) },
]

interface AlertState {
  variant: AlertVariant
  title: string
  description: string
}

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<AlertState | null>(null)
  const [alertError, setAlertError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const passwordValue = watch('password') || ''

  const onSubmit = async (data: ResetPasswordFormData) => {
    setAlertError(null)

    if (data.password !== REQUIRED_PASSWORD) {
      setAlertError(`Invalid password. Password must be '${REQUIRED_PASSWORD}' to reset.`)
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((res) => setTimeout(res, 600))

      setAlert({
        variant: 'success',
        title: 'Password Reset',
        description: 'Your password has been updated.',
      })

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (err) {
      console.error(err)
      setAlertError('An unexpected error occurred. Please try again.')
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
            className="shadow-xl border-emerald-200"
          />
        </div>
      )}

      {alertError && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Alert
            variant="error"
            title="Password Reset Error"
            description={alertError}
            closable
            onClose={() => setAlertError(null)}
            className="shadow-xl border-red-200"
          />
        </div>
      )}

      <Logo />

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Reset Your Password
        </h1>
        <p className="text-sm text-gray-600 font-medium mt-1.5">
          Create a new password to get access.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <PasswordInput
            id="password"
            label="Password"
            required
            placeholder={errors.password && isSubmitted ? 'Check password' : 'Type your password'}
            size="middle"
            leftIcon={<Lock className="w-4 h-4 text-gray-500" />}
            {...register('password')}
            error={Boolean(errors.password) || Boolean(alertError)}
            errorMessage={errors.password?.message}
          />

          {passwordValue.length > 0 && (
            <div className="mt-2.5 space-y-1.5 px-0.5">
              {PASSWORD_REQUIREMENTS.map((req) => {
                const isMet = req.test(passwordValue)
                const hasError = Boolean(errors.password) || Boolean(alertError)

                let circleStyle = 'border-amber-400 bg-amber-400 text-white'
                let textStyle = 'text-gray-700 font-medium'

                if (isMet) {
                  circleStyle = 'border-emerald-500 bg-emerald-500 text-white'
                  textStyle = 'text-gray-700 font-medium'
                } else if (hasError && isSubmitted) {
                  circleStyle = 'border-red-500 bg-white text-red-500'
                  textStyle = 'text-red-500 font-medium'
                }

                return (
                  <div key={req.id} className="flex items-center gap-2 text-xs">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors',
                        circleStyle
                      )}
                    >
                      {isMet ? (
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                      )}
                    </div>
                    <span className={cn('transition-colors', textStyle)}>{req.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <PasswordInput
          id="confirmPassword"
          label="Re-enter Password"
          required
          placeholder="Re-enter Password"
          size="middle"
          leftIcon={<Lock className="w-4 h-4 text-gray-500" />}
          {...register('confirmPassword')}
          error={Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword?.message}
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
            Continue
          </Button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#0052cc] font-bold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword
