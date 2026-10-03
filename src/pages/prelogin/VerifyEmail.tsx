import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Alert, AlertVariant } from '@/components/ui/Alert'
import { cn } from '@/utils'
import { Logo } from '@/components/ui'

const VALID_OTP = '4216'

interface AlertState {
  variant: AlertVariant
  title: string
  description: string
}

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userEmail = location.state?.email

  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<AlertState | null>(null)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const verifyCode = async (codeToVerify: string) => {
    setHasError(false)
    setErrorMessage(null)
    setAlert(null)

    if (codeToVerify.length < 4) {
      setHasError(true)
      setErrorMessage('Invalid code')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((res) => setTimeout(res, 300))

      if (codeToVerify !== VALID_OTP) {
        setHasError(true)
        setErrorMessage('Invalid code')
        return
      }

      if (location.state?.isResetPassword) {
        navigate('/reset-password', { state: { email: userEmail } })
      } else {
        navigate('/login', { state: { verified: true, email: userEmail } })
      }
    } catch (err) {
      console.error(err)
      setHasError(true)
      setErrorMessage('Invalid code')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
    if (hasError) {
      setHasError(false)
      setErrorMessage(null)
    }
    if (value.length === 4) {
      verifyCode(value)
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    verifyCode(otp)
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
          Verify Your Email
        </h1>
        <p className="text-sm text-gray-600 font-medium mt-1.5">
          Enter the code sent to {userEmail ? <span className="font-semibold text-gray-900">{userEmail}</span> : 'your email'} to verify.
        </p>
      </div>

      <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
        <div className="w-full max-w-[280px] flex flex-col items-start gap-1.5 mb-5">
          <label className="text-xs font-semibold text-gray-700 font-['Montserrat']">
            Secure code
          </label>

          <div className="w-full flex justify-between">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={4}
              shouldAutoFocus
              renderSeparator={<span className="w-2.5"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="0"
                  className={cn(
                    'w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold bg-white border rounded-xl outline-none transition-all placeholder:text-gray-300',
                    hasError
                      ? 'border-red-400 text-red-500 focus:border-red-500'
                      : 'border-gray-200 text-gray-900 focus:border-[#0052cc]'
                  )}
                  style={{
                    border: hasError ? '1px solid #F87171' : '1px solid #E4E7EC',
                  }}
                />
              )}
            />
          </div>

          {hasError && errorMessage && (
            <p className="text-xs text-red-500 font-medium mt-1">{errorMessage}</p>
          )}
        </div>

        <div className="w-full max-w-[280px]">
          <Button
            type="submit"
            variant="primary"
            size="large"
            block
            loading={isSubmitting}
            className="w-full bg-[#0052cc] hover:bg-[#0047ba] active:bg-[#003d99] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm border-none cursor-pointer"
          >
            Verify
          </Button>
        </div>
      </form>
    </div>
  )
}

export default VerifyEmail
