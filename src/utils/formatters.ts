export const formatNumberWithCommas = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === '') return ''
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const parseNumberWithCommas = (displayValue: string | undefined): number | string => {
  if (!displayValue) return ''
  return displayValue.replace(/,/g, '')
}

export const formatCurrency = (value: number | string | undefined, currencySymbol = ''): string => {
  if (value === undefined || value === null || value === '') return ''
  const formatted = formatNumberWithCommas(value)
  return currencySymbol ? `${currencySymbol} ${formatted}` : formatted
}

export const parseCurrency = (displayValue: string | undefined, currencySymbol = ''): number | string => {
  if (!displayValue) return ''
  let cleaned = displayValue
  if (currencySymbol) {
    const escapedSymbol = currencySymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    cleaned = cleaned.replace(new RegExp(`${escapedSymbol}\\s?|(,*)`, 'g'), '')
  } else {
    cleaned = cleaned.replace(/,/g, '')
  }
  return cleaned
}

export const formatNaira = (value: number | string | undefined): string => {
  return formatCurrency(value, '₦')
}

export const parseNaira = (displayValue: string | undefined): number | string => {
  if (!displayValue) return ''
  return displayValue.replace(/₦\s?|(,*)/g, '')
}
