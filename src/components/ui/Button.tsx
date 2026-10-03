import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, ChevronDown } from 'lucide-react'
import { cn } from '@/utils'


export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'outlined'
  | 'ghost'
  | 'text'
  | 'link'
  | 'danger'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'neutral'
  | 'icon'
  | 'fab'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large'
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full' | 'pill'
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'
export type LoadingPosition = 'start' | 'end' | 'center' | 'left' | 'right'

export interface BaseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'prefix'> {
  children?: React.ReactNode
  label?: React.ReactNode
  text?: React.ReactNode

  variant?: ButtonVariant
  appearance?: ButtonVariant
  size?: ButtonSize
  radius?: ButtonRadius
  borderRadius?: ButtonRadius
  colorScheme?: ColorScheme

  color?: string
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  width?: string | number
  height?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  maxHeight?: string | number

  fullWidth?: boolean
  block?: boolean
  gap?: string | number
  iconGap?: string | number
  margin?: string | number
  padding?: string | number

  disabled?: boolean
  loading?: boolean
  isLoading?: boolean
  loadingText?: React.ReactNode
  loadingIcon?: React.ReactNode
  spinner?: React.ReactNode
  spinnerSize?: number
  loadingPosition?: LoadingPosition
  disableWhileLoading?: boolean
  active?: boolean
  selected?: boolean
  pressed?: boolean
  readonly?: boolean

  leftIcon?: React.ReactNode
  startIcon?: React.ReactNode
  leadingIcon?: React.ReactNode
  prefixIcon?: React.ReactNode

  rightIcon?: React.ReactNode
  endIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  suffixIcon?: React.ReactNode

  icon?: React.ReactNode
  iconOnly?: boolean
  iconSize?: number | string
  iconColor?: string

  renderIcon?: () => React.ReactNode
  renderLeftIcon?: () => React.ReactNode
  renderRightIcon?: () => React.ReactNode
  renderLoader?: () => React.ReactNode

  onIconPress?: (e: React.MouseEvent) => void
  onLeftIconPress?: (e: React.MouseEvent) => void
  onRightIconPress?: (e: React.MouseEvent) => void

  href?: string
  to?: string
  target?: string
  rel?: string
  download?: string | boolean
  external?: boolean
  replace?: boolean

  testID?: string
  'data-testid'?: string
  analyticsId?: string

  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  textClassName?: string
  textStyle?: React.CSSProperties
  iconClassName?: string
  iconStyle?: React.CSSProperties
}

const normalizeSize = (size: ButtonSize = 'md'): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  switch (size) {
    case 'small':
      return 'sm'
    case 'medium':
      return 'md'
    case 'large':
      return 'lg'
    default:
      return size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
}

const radiusClasses: Record<ButtonRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
  pill: 'rounded-full',
}

const getVariantClasses = (variant: ButtonVariant = 'primary', colorScheme?: ColorScheme): string => {
  const normVariant = variant === 'outlined' ? 'outline' : variant === 'destructive' ? 'danger' : variant

  if (colorScheme) {
    switch (colorScheme) {
      case 'danger':
        if (normVariant === 'outline') return 'border border-red-500 text-red-600 hover:bg-red-50 focus:ring-red-500'
        if (normVariant === 'ghost' || normVariant === 'text') return 'text-red-600 hover:bg-red-50 focus:ring-red-500'
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm'
      case 'success':
        if (normVariant === 'outline') return 'border border-emerald-500 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500'
        if (normVariant === 'ghost' || normVariant === 'text') return 'text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500'
        return 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm'
      case 'warning':
        if (normVariant === 'outline') return 'border border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-amber-500'
        if (normVariant === 'ghost' || normVariant === 'text') return 'text-amber-600 hover:bg-amber-50 focus:ring-amber-500'
        return 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 shadow-sm'
      case 'info':
        if (normVariant === 'outline') return 'border border-sky-500 text-sky-600 hover:bg-sky-50 focus:ring-sky-500'
        if (normVariant === 'ghost' || normVariant === 'text') return 'text-sky-600 hover:bg-sky-50 focus:ring-sky-500'
        return 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 shadow-sm'
      case 'secondary':
        return 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 shadow-xs'
    }
  }

  switch (normVariant) {
    case 'primary':
      return 'bg-[#0047AB] hover:bg-[#003B8E] text-white shadow-sm focus:ring-[#0047AB]/50 active:bg-[#003075]'
    case 'secondary':
      return 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 shadow-xs active:bg-slate-300'
    case 'tertiary':
      return 'bg-slate-50 text-slate-700 hover:bg-slate-100 focus:ring-slate-300'
    case 'outline':
      return 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:ring-[#0047AB]/30 shadow-2xs'
    case 'ghost':
      return 'bg-transparent text-slate-700 hover:bg-slate-100/80 focus:ring-slate-300'
    case 'text':
    case 'link':
      return 'bg-transparent text-[#0047AB] hover:text-[#003B8E] hover:underline p-0 h-auto focus:ring-0 shadow-none'
    case 'danger':
      return 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm active:bg-rose-800'
    case 'success':
      return 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm active:bg-emerald-800'
    case 'warning':
      return 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-sm'
    case 'neutral':
      return 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-sm'
    case 'icon':
      return 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300 rounded-full'
    case 'fab':
      return 'bg-[#0047AB] text-white hover:bg-[#003B8E] rounded-full shadow-lg hover:shadow-xl focus:ring-[#0047AB]/50'
    default:
      return 'bg-[#0047AB] hover:bg-[#003B8E] text-white shadow-sm'
  }
}

const sizeClasses: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', { btn: string; icon: string }> = {
  xs: { btn: 'px-2 py-1 text-xs gap-1 h-7', icon: 'w-3.5 h-3.5' },
  sm: { btn: 'px-3 py-1.5 text-xs font-medium gap-1.5 h-8', icon: 'w-4 h-4' },
  md: { btn: 'px-4 py-2 text-sm font-medium gap-2 h-10', icon: 'w-4.5 h-4.5' },
  lg: { btn: 'px-5 py-2.5 text-base font-medium gap-2.5 h-11', icon: 'w-5 h-5' },
  xl: { btn: 'px-6 py-3 text-lg font-semibold gap-3 h-12', icon: 'w-6 h-6' },
}

const iconOnlySizeClasses: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'w-7 h-7 p-1',
  sm: 'w-8 h-8 p-1.5',
  md: 'w-10 h-10 p-2',
  lg: 'w-11 h-11 p-2.5',
  xl: 'w-12 h-12 p-3',
}



export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const {
    children,
    label,
    text,
    type = 'button',
    variant = 'primary',
    appearance,
    size = 'md',
    radius = 'md',
    borderRadius,
    colorScheme,
    color,
    backgroundColor,
    textColor,
    borderColor,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    fullWidth = false,
    block = false,
    gap,
    iconGap,
    margin,
    padding,
    disabled = false,
    loading = false,
    isLoading = false,
    loadingText,
    loadingIcon,
    spinner,
    spinnerSize,
    loadingPosition = 'start',
    disableWhileLoading = true,
    active = false,
    selected = false,
    pressed = false,
    readonly = false,
    leftIcon,
    startIcon,
    leadingIcon,
    prefixIcon,
    rightIcon,
    endIcon,
    trailingIcon,
    suffixIcon,
    icon,
    iconOnly = false,
    iconSize,
    iconColor,
    renderIcon,
    renderLeftIcon,
    renderRightIcon,
    renderLoader,
    onIconPress,
    onLeftIconPress,
    onRightIconPress,
    href,
    to,
    target,
    rel,
    download,
    external = false,
    replace = false,
    testID,
    'data-testid': dataTestId,
    analyticsId,
    buttonProps,
    textClassName,
    textStyle,
    iconClassName,
    iconStyle,
    className,
    style,
    onClick,
    ...restProps
  } = props

  const actualVariant = appearance || variant
  const normalizedSize = normalizeSize(size)
  const actualRadius = borderRadius || radius
  const isActualLoading = loading || isLoading
  const isDisabled = disabled || (isActualLoading && disableWhileLoading) || readonly
  const isFullWidth = fullWidth || block
  const actualLeftIcon = leftIcon || startIcon || leadingIcon || prefixIcon || (renderLeftIcon ? renderLeftIcon() : null)
  const actualRightIcon = rightIcon || endIcon || trailingIcon || suffixIcon || (renderRightIcon ? renderRightIcon() : null)
  const mainIcon = icon || (renderIcon ? renderIcon() : null)
  const content = children || label || text

  const currentSizeConfig = sizeClasses[normalizedSize]
  const isIconOnly = iconOnly || (Boolean(mainIcon) && !content)

  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

  const activeClasses = (active || selected || pressed) ? 'ring-2 ring-[#0047AB] bg-blue-50 dark:bg-blue-950/30' : ''
  const computedClasses = cn(
    baseClasses,
    radiusClasses[actualRadius],
    getVariantClasses(actualVariant, colorScheme),
    isIconOnly ? iconOnlySizeClasses[normalizedSize] : currentSizeConfig.btn,
    isFullWidth && 'w-full flex',
    activeClasses,
    className
  )

  const customStyles: React.CSSProperties = {
    backgroundColor: backgroundColor || color,
    color: textColor,
    borderColor,
    width: width || (isFullWidth ? '100%' : undefined),
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    margin,
    padding,
    gap: gap || iconGap,
    ...style,
  }

  const renderSpinner = () => {
    if (renderLoader) return renderLoader()
    if (loadingIcon) return loadingIcon
    if (spinner) return spinner
    return <Loader2 className={cn('animate-spin', currentSizeConfig.icon)} style={{ width: spinnerSize, height: spinnerSize }} />
  }

  const renderIconNode = (iconNode: React.ReactNode, handler?: (e: React.MouseEvent) => void, positionKey?: string) => {
    if (!iconNode) return null

    if (handler) {
      return (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            handler(e)
          }}
          className={cn('inline-flex items-center justify-center cursor-pointer hover:opacity-80', iconClassName)}
          style={iconStyle}
        >
          {iconNode}
        </span>
      )
    }

    return (
      <span
        key={positionKey}
        className={cn('inline-flex items-center justify-center shrink-0', iconClassName)}
        style={{ color: iconColor, ...iconStyle }}
      >
        {iconNode}
      </span>
    )
  }

  const renderedContent = (
    <>
      {isActualLoading && (loadingPosition === 'start' || loadingPosition === 'left' || loadingPosition === 'center') && (
        <span className="inline-flex items-center shrink-0">{renderSpinner()}</span>
      )}

      {!isActualLoading && actualLeftIcon && renderIconNode(actualLeftIcon, onLeftIconPress || onIconPress, 'left-icon')}

      {!isActualLoading && mainIcon && isIconOnly && renderIconNode(mainIcon, onIconPress, 'main-icon')}

      {content && (
        <span className={cn('truncate', textClassName)} style={textStyle}>
          {isActualLoading && loadingText ? loadingText : content}
        </span>
      )}

      {!isActualLoading && actualRightIcon && renderIconNode(actualRightIcon, onRightIconPress, 'right-icon')}

      {isActualLoading && (loadingPosition === 'end' || loadingPosition === 'right') && (
        <span className="inline-flex items-center shrink-0">{renderSpinner()}</span>
      )}
    </>
  )

  const commonProps = {
    className: computedClasses,
    style: customStyles,
    'data-testid': testID || dataTestId,
    'data-analytics-id': analyticsId,
    ...buttonProps,
    ...restProps,
  }

  if (href) {
    return (
      <a
        href={href}
        target={target || (external ? '_blank' : undefined)}
        rel={rel || (external ? 'noopener noreferrer' : undefined)}
        download={typeof download === 'boolean' ? (download ? '' : undefined) : download}
        {...(commonProps as any)}
      >
        {renderedContent}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} target={target} replace={replace} {...(commonProps as any)}>
        {renderedContent}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-disabled={isDisabled}
      aria-busy={isActualLoading}
      {...commonProps}
    >
      {renderedContent}
    </button>
  )
})

Button.displayName = 'Button'



export interface IconButtonProps extends Omit<BaseButtonProps, 'children'> {
  icon: React.ReactNode
  'aria-label': string
  tooltip?: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { icon, variant = 'ghost', size = 'md', tooltip, 'aria-label': ariaLabel, ...rest } = props

  return (
    <Button
      ref={ref}
      icon={icon}
      iconOnly
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      title={tooltip || ariaLabel}
      {...rest}
    />
  )
})
IconButton.displayName = 'IconButton'



export interface LinkButtonProps extends BaseButtonProps {
  href?: string
  to?: string
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>((props, ref) => {
  return <Button ref={ref} variant="link" {...props} />
})
LinkButton.displayName = 'LinkButton'



export interface LoadingButtonProps extends BaseButtonProps {
  loading: boolean
  loadingText?: React.ReactNode
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>((props, ref) => {
  return <Button ref={ref} disableWhileLoading {...props} />
})
LoadingButton.displayName = 'LoadingButton'


export const SubmitButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  return <Button ref={ref} type="submit" variant="primary" {...props} />
})
SubmitButton.displayName = 'SubmitButton'


export interface ToggleButtonProps extends BaseButtonProps {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>((props, ref) => {
  const { pressed, defaultPressed = false, onPressedChange, onClick, ...rest } = props
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed)

  const isPressed = pressed !== undefined ? pressed : internalPressed

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextState = !isPressed
    if (pressed === undefined) {
      setInternalPressed(nextState)
    }
    onPressedChange?.(nextState)
    onClick?.(e)
  }

  return (
    <Button
      ref={ref}
      pressed={isPressed}
      aria-pressed={isPressed}
      variant={isPressed ? 'primary' : 'outline'}
      onClick={handleClick}
      {...rest}
    />
  )
})
ToggleButton.displayName = 'ToggleButton'


export interface SplitButtonProps extends BaseButtonProps {
  onMainClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDropdownClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  dropdownIcon?: React.ReactNode
}

export const SplitButton = forwardRef<HTMLButtonElement, SplitButtonProps>((props, ref) => {
  const { children, onMainClick, onDropdownClick, dropdownIcon, className, size = 'md', variant = 'primary', disabled, ...rest } = props

  return (
    <div className={cn('inline-flex items-center rounded-lg shadow-xs overflow-hidden', className)}>
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onMainClick}
        className="rounded-r-none border-r border-black/10"
        {...rest}
      >
        {children}
      </Button>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onDropdownClick}
        iconOnly
        icon={dropdownIcon || <ChevronDown className="w-4 h-4" />}
        aria-label="More options"
        className="rounded-l-none"
      />
    </div>
  )
})
SplitButton.displayName = 'SplitButton'
