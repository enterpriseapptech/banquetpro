import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Check } from 'lucide-react'
import { TextInput, PasswordInput } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Logo } from '@/components/ui/Logo'

const REQUIRED_PASSWORD = 'Fistobobo12@'

const signupSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please re-enter your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

type SignupFormData = yup.InferType<typeof signupSchema>

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

export const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertError, setAlertError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const passwordValue = watch('password') || ''

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== REQUIRED_PASSWORD) {
      setAlertError(`Invalid password. Password must be '${REQUIRED_PASSWORD}' to create an account.`)
      return
    }

    setAlertError(null)
    setIsSubmitting(true)
    try {
      console.log('Signup payload:', data)
      await new Promise((res) => setTimeout(res, 800))
      navigate('/verify-email', { state: { email: data.email } })
    } catch (err) {
      console.error(err)
      setAlertError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      {alertError && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Alert
            variant="error"
            title="Authentication Error"
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
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600 font-medium mt-1.5">
          Sign up to start booking with us.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <TextInput
          id="name"
          label="Name"
          required
          placeholder="Enter your name"
          size="middle"
          {...register('name')}
          error={Boolean(errors.name)}
          errorMessage={errors.name?.message}
        />

        <TextInput
          id="email"
          label="Email"
          required
          placeholder="Enter your email"
          size="middle"
          leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
          {...register('email')}
          error={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        />

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
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${circleStyle}`}
                    >
                      {isMet ? (
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-white"></span>
                      )}
                    </div>
                    <span className={`transition-colors ${textStyle}`}>{req.label}</span>
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
          placeholder="Re-enter your password"
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
            Create account
          </Button>
        </div>
      </form>

      <div className="w-full mt-3 space-y-2">
        <Button
          type="button"
          variant="outline"
          size="large"
          block
          onClick={() => console.log('Google Sign Up')}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-colors cursor-pointer shadow-2xs"
          leftIcon={
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          }
        >
          Sign up with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          size="large"
          block
          onClick={() => console.log('Facebook Sign Up')}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-colors cursor-pointer shadow-2xs"
          leftIcon={
            <svg className="w-4 h-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
        >
          Sign up with Facebook
        </Button>

        <Button
          type="button"
          variant="outline"
          size="large"
          block
          onClick={() => console.log('Apple Sign Up')}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-colors cursor-pointer shadow-2xs"
          leftIcon={
            <svg className="w-4 h-4 shrink-0 fill-current text-gray-900" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.18.67-2.88 1.48-.62.72-1.16 1.88-1.01 3.01 1.12.09 2.23-.55 2.9-1.37z" />
            </svg>
          }
        >
          Sign up with Apple
        </Button>
      </div>

      <div className="mt-6 text-center text-xs sm:text-sm text-gray-600 font-medium">
        Already have an account?{' '}
        <Link to="/login" className="text-[#0052cc] font-bold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  )
}

export default Signup
