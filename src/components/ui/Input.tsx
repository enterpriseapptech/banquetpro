import React, { forwardRef, useState } from 'react'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export type InputNumberRef = HTMLInputElement
export type LabelPosition = 'above' | 'beside' | 'floating'
export type InputVariant = 'outlined' | 'filled' | 'borderless'

export interface BaseFieldProps {
  label?: React.ReactNode
  labelPosition?: LabelPosition
  required?: boolean
  requiredIndicator?: React.ReactNode
  optionalIndicator?: React.ReactNode
  hideLabel?: boolean
  helperText?: React.ReactNode

  error?: boolean | string
  errorMessage?: React.ReactNode
  successMessage?: React.ReactNode
  warningMessage?: React.ReactNode

  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onLeftIconPress?: (e: React.MouseEvent) => void
  onRightIconPress?: (e: React.MouseEvent) => void
  loading?: boolean
  clearable?: boolean
  onClear?: () => void

  containerClassName?: string
  containerStyle?: React.CSSProperties
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  labelClassName?: string
  labelStyle?: React.CSSProperties
  errorClassName?: string
  errorStyle?: React.CSSProperties
  helperTextClassName?: string
  helperTextStyle?: React.CSSProperties

  renderLeftIcon?: () => React.ReactNode
  renderRightIcon?: () => React.ReactNode
  renderPrefix?: () => React.ReactNode
  renderSuffix?: () => React.ReactNode
  renderError?: (error: React.ReactNode) => React.ReactNode
  renderHelperText?: (text: React.ReactNode) => React.ReactNode

  testID?: string
}

interface FieldWrapperProps extends BaseFieldProps {
  id?: string
  children: React.ReactNode
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  labelPosition = 'above',
  required,
  requiredIndicator = <span className="text-red-500 font-bold ml-0.5">*</span>,
  hideLabel = false,
  helperText,
  error,
  errorMessage,
  successMessage,
  warningMessage,
  containerClassName = '',
  containerStyle,
  labelClassName = '',
  labelStyle,
  errorClassName = '',
  errorStyle,
  helperTextClassName = '',
  helperTextStyle,
  renderError,
  renderHelperText,
  children,
}) => {
  const activeError = typeof error === 'string'
    ? error
    : (error && errorMessage ? errorMessage : undefined)
  const isBeside = labelPosition === 'beside'

  return (
    <div
      className={`flex ${isBeside ? 'flex-row items-center gap-4' : 'flex-col gap-1.5'} w-full ${containerClassName}`}
      style={containerStyle}
    >
      {label && !hideLabel && (
        <label
          htmlFor={id}
          className={`text-sm font-bold text-gray-900 align-middle font-['Montserrat'] select-none block ${
            isBeside ? 'w-1/3 min-w-[120px]' : 'w-full'
          } ${labelClassName}`}
          style={labelStyle}
        >
          {label}
          {required ? requiredIndicator : null}
        </label>
      )}

      <div className={`w-full ${isBeside ? 'flex-1' : ''}`}>
        {children}

        {activeError ? (
          <div className="mt-1">
            {renderError ? (
              renderError(activeError)
            ) : (
              <p
                className={`text-xs text-red-500 font-medium ${errorClassName}`}
                style={errorStyle}
              >
                {activeError}
              </p>
            )}
          </div>
        ) : null}

        {!activeError && warningMessage && (
          <p className="text-xs text-amber-500 font-medium mt-1">{warningMessage}</p>
        )}

        {!activeError && successMessage && (
          <p className="text-xs text-emerald-600 font-medium mt-1">{successMessage}</p>
        )}

        {helperText && !activeError && (
          <div className="mt-1">
            {renderHelperText ? (
              renderHelperText(helperText)
            ) : (
              <p
                className={`text-xs text-gray-500 ${helperTextClassName}`}
                style={helperTextStyle}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    BaseFieldProps {
  size?: 'small' | 'middle' | 'large'
  variant?: InputVariant
  inputClassName?: string
  inputStyle?: React.CSSProperties
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    hideLabel,
    helperText,
    error,
    errorMessage,
    successMessage,
    warningMessage,
    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,
    loading,
    containerClassName,
    containerStyle,
    labelClassName,
    labelStyle,
    errorClassName,
    errorStyle,
    helperTextClassName,
    helperTextStyle,
    renderLeftIcon,
    renderRightIcon,
    renderError,
    renderHelperText,
    testID,
    size = 'middle',
    variant = 'outlined',
    className = '',
    inputClassName = '',
    inputStyle,
    disabled,
    ...restProps
  } = props

  const hasError = Boolean(error && errorMessage) || typeof error === 'string'

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      hideLabel={hideLabel}
      helperText={helperText}
      error={error}
      errorMessage={errorMessage}
      successMessage={successMessage}
      warningMessage={warningMessage}
      containerClassName={containerClassName}
      containerStyle={containerStyle}
      labelClassName={labelClassName}
      labelStyle={labelStyle}
      errorClassName={errorClassName}
      errorStyle={errorStyle}
      helperTextClassName={helperTextClassName}
      helperTextStyle={helperTextStyle}
      renderError={renderError}
      renderHelperText={renderHelperText}
    >
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            className={`absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10 ${
              onLeftIconPress ? 'cursor-pointer pointer-events-auto hover:text-gray-600' : ''
            }`}
            onClick={onLeftIconPress}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled || loading}
          className={`w-full text-sm font-medium text-gray-900 bg-white border rounded-lg outline-none transition-all placeholder:text-gray-400 app-input ${
            size === 'small' ? 'py-1.5' : size === 'large' ? 'py-3' : 'py-2.5'
          } ${
            hasError
              ? 'border-red-500 text-red-600 focus:border-red-500'
              : 'border-gray-200 focus:border-[#D6BBFB]'
          } ${inputClassName} ${className}`}
          style={{
            border: hasError ? '1px solid #EF4444' : '1px solid #E4E7EC',
            paddingLeft: leftIcon ? '40px' : '14px',
            paddingRight: rightIcon || loading ? '40px' : '14px',
            ...inputStyle,
          }}
          data-testid={testID}
          {...restProps}
        />

        {loading ? (
          <span className="absolute right-3 flex items-center z-10">
            <Loader2 className="animate-spin text-gray-400 w-4 h-4" />
          </span>
        ) : rightIcon ? (
          <span
            className={`absolute right-3 flex items-center text-gray-400 z-10 ${
              onRightIconPress ? 'cursor-pointer hover:text-gray-600' : ''
            }`}
            onClick={onRightIconPress}
          >
            {rightIcon}
          </span>
        ) : null}
      </div>
    </FieldWrapper>
  )
})

TextInput.displayName = 'TextInput'

export interface PasswordInputProps extends TextInputProps {
  showPasswordToggle?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    hideLabel,
    helperText,
    error,
    errorMessage,
    successMessage,
    warningMessage,
    leftIcon,
    containerClassName,
    containerStyle,
    labelClassName,
    labelStyle,
    errorClassName,
    errorStyle,
    helperTextClassName,
    helperTextStyle,
    renderError,
    renderHelperText,
    testID,
    size = 'middle',
    className = '',
    inputClassName = '',
    inputStyle,
    disabled,
    showPasswordToggle = true,
    type,
    ...restProps
  } = props

  const hasError = Boolean(error && errorMessage) || typeof error === 'string'

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      hideLabel={hideLabel}
      helperText={helperText}
      error={error}
      errorMessage={errorMessage}
      successMessage={successMessage}
      warningMessage={warningMessage}
      containerClassName={containerClassName}
      containerStyle={containerStyle}
      labelClassName={labelClassName}
      labelStyle={labelStyle}
      errorClassName={errorClassName}
      errorStyle={errorStyle}
      helperTextClassName={helperTextClassName}
      helperTextStyle={helperTextStyle}
      renderError={renderError}
      renderHelperText={renderHelperText}
    >
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          className={`w-full text-sm font-medium text-gray-900 bg-white border rounded-lg outline-none transition-all placeholder:text-gray-400 app-input ${
            size === 'small' ? 'py-1.5' : size === 'large' ? 'py-3' : 'py-2.5'
          } ${
            hasError
              ? 'border-red-500 text-red-600 focus:border-red-500'
              : 'border-gray-200 focus:border-[#D6BBFB]'
          } ${inputClassName} ${className}`}
          style={{
            border: hasError ? '1px solid #EF4444' : '1px solid #E4E7EC',
            paddingLeft: leftIcon ? '40px' : '14px',
            paddingRight: showPasswordToggle ? '40px' : '14px',
            ...inputStyle,
          }}
          data-testid={testID}
          {...restProps}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer z-10 p-0.5"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </FieldWrapper>
  )
})

PasswordInput.displayName = 'PasswordInput'

export interface SearchInputProps extends TextInputProps {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} />
})

SearchInput.displayName = 'SearchInput'

export interface NumberInputProps extends TextInputProps {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  return <TextInput ref={ref} type="number" {...props} />
})

NumberInput.displayName = 'NumberInput'

export interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseFieldProps {
  inputClassName?: string
  inputStyle?: React.CSSProperties
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    hideLabel,
    helperText,
    error,
    errorMessage,
    successMessage,
    warningMessage,
    containerClassName,
    containerStyle,
    labelClassName,
    labelStyle,
    errorClassName,
    errorStyle,
    helperTextClassName,
    helperTextStyle,
    renderError,
    renderHelperText,
    testID,
    className = '',
    inputClassName = '',
    inputStyle,
    disabled,
    ...restProps
  } = props

  const hasError = Boolean(error && errorMessage) || typeof error === 'string'

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      hideLabel={hideLabel}
      helperText={helperText}
      error={error}
      errorMessage={errorMessage}
      successMessage={successMessage}
      warningMessage={warningMessage}
      containerClassName={containerClassName}
      containerStyle={containerStyle}
      labelClassName={labelClassName}
      labelStyle={labelStyle}
      errorClassName={errorClassName}
      errorStyle={errorStyle}
      helperTextClassName={helperTextClassName}
      helperTextStyle={helperTextStyle}
      renderError={renderError}
      renderHelperText={renderHelperText}
    >
      <textarea
        ref={ref}
        id={id}
        disabled={disabled}
        className={`w-full text-sm font-medium text-gray-900 bg-white border rounded-lg outline-none transition-all placeholder:text-gray-400 app-input p-3 ${
          hasError
            ? 'border-red-500 text-red-600 focus:border-red-500'
            : 'border-gray-200 focus:border-[#D6BBFB]'
        } ${inputClassName} ${className}`}
        style={{
          border: hasError ? '1px solid #EF4444' : '1px solid #E4E7EC',
          ...inputStyle,
        }}
        data-testid={testID}
        {...restProps}
      />
    </FieldWrapper>
  )
})

TextAreaInput.displayName = 'TextAreaInput'
