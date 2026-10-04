export type FeeType = 'KYC' | 'Certification' | 'Featured Plan' | 'Booking'
export type FeeStatus = 'Active' | 'Inactive'

export interface FeeItem {
  id: string
  name: string
  type: FeeType
  amount: number
  currency: string
  status: FeeStatus
  description: string
  createdAt: string
  lastUpdated: string
  updatedBy: string
}

export const FEE_TYPE_OPTIONS = [
  { label: 'KYC', value: 'KYC' },
  { label: 'Certification', value: 'Certification' },
  { label: 'Featured Plan', value: 'Featured Plan' },
  { label: 'Booking', value: 'Booking' },
]

export const FEE_CURRENCY_OPTIONS = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'NGN', value: 'NGN' },
]

export const FEE_STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
]

export const formatFeeAmount = (fee: Pick<FeeItem, 'currency' | 'amount'>) =>
  `${fee.currency} ${fee.amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export const INITIAL_FEES: FeeItem[] = [
  {
    id: '1',
    name: 'KYC Verification Fee',
    type: 'KYC',
    amount: 25,
    currency: 'USD',
    status: 'Active',
    description: 'One-time fee for KYC document verification',
    createdAt: '2024-01-01',
    lastUpdated: '2024-01-01',
    updatedBy: 'Admin',
  },
  {
    id: '2',
    name: 'Certification Fee',
    type: 'Certification',
    amount: 50,
    currency: 'USD',
    status: 'Active',
    description: 'Fee for provider certification and verified badge',
    createdAt: '2024-01-01',
    lastUpdated: '2024-06-15',
    updatedBy: 'Admin',
  },
]
