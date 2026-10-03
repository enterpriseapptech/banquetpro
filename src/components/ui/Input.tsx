import React, { forwardRef } from 'react'
import { Input as AntInput, InputNumber as AntInputNumber } from 'antd'
import type { InputProps as AntInputProps, InputRef } from 'antd/es/input'
import type { TextAreaProps as AntTextAreaProps, SearchProps as AntSearchProps } from 'antd/es/input'
import type { InputNumberProps as AntInputNumberProps } from 'antd/es/input-number'
import { Loader2, XCircle } from 'lucide-react'
import { formatCurrency, parseCurrency, formatNaira, parseNaira } from '@/utils'

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
  requiredIndicator = <span className="text-red-500 ml-1">*</span>,
  optionalIndicator = <span className="text-gray-400 text-xs ml-1">(Optional)</span>,
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
  const activeError = typeof error === 'string' ? error : errorMessage
  const isBeside = labelPosition === 'beside'

  return (
    <div
      className={`flex ${isBeside ? 'flex-row items-center gap-4' : 'flex-col gap-1.5'} w-full ${containerClassName}`}
      style={containerStyle}
    >
      {label && !hideLabel && (
        <label
          htmlFor={id}
          className={`text-sm font-medium text-gray-700 dark:text-gray-200 select-none ${isBeside ? 'w-1/3 min-w-[120px]' : 'w-full'
            } ${labelClassName}`}
          style={labelStyle}
        >
          {label}
          {required ? requiredIndicator : optionalIndicator}
        </label>
      )}

      <div className={`w-full ${isBeside ? 'flex-1' : ''}`}>
        {children}

        <div className="mt-1 space-y-1">
          {activeError && (
            renderError ? (
              renderError(activeError)
            ) : (
              <p
                className={`text-xs text-red-500 font-medium ${errorClassName}`}
                style={errorStyle}
              >
                {activeError}
              </p>
            )
          )}

          {!activeError && warningMessage && (
            <p className="text-xs text-amber-500 font-medium">{warningMessage}</p>
          )}

          {!activeError && successMessage && (
            <p className="text-xs text-emerald-600 font-medium">{successMessage}</p>
          )}

          {helperText && !activeError && (
            renderHelperText ? (
              renderHelperText(helperText)
            ) : (
              <p
                className={`text-xs text-gray-500 dark:text-gray-400 ${helperTextClassName}`}
                style={helperTextStyle}
              >
                {helperText}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export interface TextInputProps
  extends Omit<AntInputProps, 'size' | 'prefix' | 'suffix' | 'error'>,
  BaseFieldProps {
  size?: 'small' | 'middle' | 'large'
  variant?: InputVariant
  inputClassName?: string
  inputStyle?: React.CSSProperties
  prefixText?: React.ReactNode
  suffixText?: React.ReactNode
}

export const TextInput = forwardRef<InputRef, TextInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    optionalIndicator,
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
    clearable,
    onClear,
    containerClassName,
    containerStyle,
    wrapperClassName,
    wrapperStyle,
    labelClassName,
    labelStyle,
    errorClassName,
    errorStyle,
    helperTextClassName,
    helperTextStyle,
    renderLeftIcon,
    renderRightIcon,
    renderPrefix,
    renderSuffix,
    renderError,
    renderHelperText,
    testID,
    size = 'middle',
    variant = 'outlined',
    className = '',
    inputClassName = '',
    inputStyle,
    prefixText,
    suffixText,
    disabled,
    allowClear,
    status,
    ...restProps
  } = props

  const hasError = Boolean(error || errorMessage)
  const computedStatus = status || (hasError ? 'error' : undefined)

  const prefixNode = (
    <React.Fragment>
      {renderPrefix ? (
        renderPrefix()
      ) : prefixText ? (
        <span className="text-gray-500 mr-1.5">{prefixText}</span>
      ) : null}
      {renderLeftIcon ? (
        renderLeftIcon()
      ) : leftIcon ? (
        <span
          className={`mr-2 flex items-center text-gray-400 ${onLeftIconPress ? 'cursor-pointer hover:text-gray-600' : ''}`}
          onClick={onLeftIconPress}
        >
          {leftIcon}
        </span>
      ) : null}
    </React.Fragment>
  )

  const suffixNode = (
    <React.Fragment>
      {loading ? (
        <Loader2 className="animate-spin text-gray-400 w-4 h-4 ml-1" />
      ) : renderRightIcon ? (
        renderRightIcon()
      ) : rightIcon ? (
        <span
          className={`ml-2 flex items-center text-gray-400 ${onRightIconPress ? 'cursor-pointer hover:text-gray-600' : ''}`}
          onClick={onRightIconPress}
        >
          {rightIcon}
        </span>
      ) : null}
      {renderSuffix ? (
        renderSuffix()
      ) : suffixText ? (
        <span className="text-gray-500 ml-1.5">{suffixText}</span>
      ) : null}
    </React.Fragment>
  )

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      optionalIndicator={optionalIndicator}
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
      <AntInput
        ref={ref}
        id={id}
        size={size}
        variant={variant}
        disabled={disabled || loading}
        status={computedStatus}
        prefix={prefixNode}
        suffix={suffixNode}
        allowClear={
          allowClear ||
          (clearable
            ? {
              clearIcon: <XCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />,
            }
            : false)
        }
        className={`${inputClassName} ${className}`}
        style={inputStyle}
        data-testid={testID}
        {...restProps}
      />
    </FieldWrapper>
  )
})

TextInput.displayName = 'TextInput'

export interface PasswordInputProps extends TextInputProps {
  showPasswordToggle?: boolean
}

export const PasswordInput = forwardRef<InputRef, PasswordInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    optionalIndicator,
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
    size = 'middle',
    variant = 'outlined',
    inputClassName = '',
    inputStyle,
    disabled,
    status,
    ...restProps
  } = props

  const hasError = Boolean(error || errorMessage)
  const computedStatus = status || (hasError ? 'error' : undefined)

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      optionalIndicator={optionalIndicator}
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
      <AntInput.Password
        ref={ref}
        id={id}
        size={size}
        variant={variant}
        disabled={disabled}
        status={computedStatus}
        className={`${inputClassName}`}
        style={inputStyle}
        data-testid={testID}
        {...restProps}
      />
    </FieldWrapper>
  )
})

PasswordInput.displayName = 'PasswordInput'

export interface SearchInputProps
  extends Omit<AntSearchProps, 'size' | 'error'>,
  BaseFieldProps {
  size?: 'small' | 'middle' | 'large'
  variant?: InputVariant
  inputClassName?: string
  inputStyle?: React.CSSProperties
}

export const SearchInput = forwardRef<InputRef, SearchInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    optionalIndicator,
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
    size = 'middle',
    variant = 'outlined',
    inputClassName = '',
    inputStyle,
    disabled,
    loading,
    status,
    ...restProps
  } = props

  const hasError = Boolean(error || errorMessage)
  const computedStatus = status || (hasError ? 'error' : undefined)

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      optionalIndicator={optionalIndicator}
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
      <AntInput.Search
        ref={ref}
        id={id}
        size={size}
        variant={variant}
        loading={loading}
        disabled={disabled || loading}
        status={computedStatus}
        className={`${inputClassName}`}
        style={inputStyle}
        data-testid={testID}
        {...restProps}
      />
    </FieldWrapper>
  )
})

SearchInput.displayName = 'SearchInput'

export interface NumberInputProps<T extends string | number = number>
  extends Omit<AntInputNumberProps<T>, 'size' | 'prefix' | 'suffix' | 'error'>,
  BaseFieldProps {
  size?: 'small' | 'middle' | 'large'
  variant?: InputVariant
  currency?: string
  isNaira?: boolean
  inputClassName?: string
  inputStyle?: React.CSSProperties
}

export const NumberInput = forwardRef<InputNumberRef, NumberInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    optionalIndicator,
    hideLabel,
    helperText,
    error,
    errorMessage,
    successMessage,
    warningMessage,
    leftIcon,
    rightIcon,
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
    variant = 'outlined',
    currency,
    isNaira,
    inputClassName = '',
    inputStyle,
    disabled,
    status,
    formatter,
    parser,
    ...restProps
  } = props

  const hasError = Boolean(error || errorMessage)
  const computedStatus = status || (hasError ? 'error' : undefined)

  const getFormatter = () => {
    if (formatter) return formatter
    if (isNaira) return (val: any) => formatNaira(val)
    if (currency) return (val: any) => formatCurrency(val, currency)
    return undefined
  }

  const getParser = () => {
    if (parser) return parser
    if (isNaira) return (val: any) => parseNaira(val)
    if (currency) return (val: any) => parseCurrency(val, currency)
    return undefined
  }

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      optionalIndicator={optionalIndicator}
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
      <AntInputNumber
        ref={ref as any}
        id={id}
        size={size}
        variant={variant}
        disabled={disabled}
        status={computedStatus}
        formatter={getFormatter()}
        parser={getParser() as any}
        className={`w-full ${inputClassName}`}
        style={inputStyle}
        data-testid={testID}
        {...restProps}
      />
    </FieldWrapper>
  )
})

NumberInput.displayName = 'NumberInput'

export interface TextAreaInputProps
  extends Omit<AntTextAreaProps, 'size' | 'error'>,
  BaseFieldProps {
  size?: 'small' | 'middle' | 'large'
  variant?: InputVariant
  inputClassName?: string
  inputStyle?: React.CSSProperties
  showCharacterCount?: boolean
}

export const TextAreaInput = forwardRef<any, TextAreaInputProps>((props, ref) => {
  const {
    id,
    label,
    labelPosition,
    required,
    requiredIndicator,
    optionalIndicator,
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
    size = 'middle',
    variant = 'outlined',
    inputClassName = '',
    inputStyle,
    disabled,
    status,
    showCharacterCount,
    showCount,
    maxLength,
    rows = 4,
    ...restProps
  } = props

  const hasError = Boolean(error || errorMessage)
  const computedStatus = status || (hasError ? 'error' : undefined)

  return (
    <FieldWrapper
      id={id}
      label={label}
      labelPosition={labelPosition}
      required={required}
      requiredIndicator={requiredIndicator}
      optionalIndicator={optionalIndicator}
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
      <AntInput.TextArea
        ref={ref}
        id={id}
        size={size}
        variant={variant}
        rows={rows}
        maxLength={maxLength}
        showCount={showCount || showCharacterCount}
        disabled={disabled}
        status={computedStatus}
        className={`${inputClassName}`}
        style={inputStyle}
        data-testid={testID}
        {...restProps}
      />
    </FieldWrapper>
  )
})

TextAreaInput.displayName = 'TextAreaInput'

export const CustomInput = TextInput
export default TextInput
