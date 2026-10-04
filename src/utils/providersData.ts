export type ProviderSubscriptionStatus = 'Active' | 'Expired'
export type ProviderKycStatus = 'Approved' | 'Pending' | 'Rejected'
export type ProviderCertificationStatus = 'Certified' | 'Not Certified'

export interface ProviderItem {
  id: string
  businessName: string
  serviceType: string
  subscription: ProviderSubscriptionStatus
  walletBalance: number
  kycStatus: ProviderKycStatus
  certification: ProviderCertificationStatus
  email: string
  phone: string
}

export const formatCurrency = (value: number) =>
  `$${value.toLocaleString('en-US')}`

export const INITIAL_PROVIDERS: ProviderItem[] = [
  {
    id: '1',
    businessName: 'Grand Ballroom Hall',
    serviceType: 'Event Center',
    subscription: 'Active',
    walletBalance: 12500,
    kycStatus: 'Approved',
    certification: 'Certified',
    email: 'john@grandballroom.com',
    phone: '+1 234 567 8900',
  },
  {
    id: '2',
    businessName: 'Gourmet Delights Catering',
    serviceType: 'Catering',
    subscription: 'Active',
    walletBalance: 8300,
    kycStatus: 'Approved',
    certification: 'Certified',
    email: 'hello@gourmetdelights.com',
    phone: '+1 234 567 8901',
  },
  {
    id: '3',
    businessName: 'Downtown Event Space',
    serviceType: 'Event Center',
    subscription: 'Expired',
    walletBalance: 4200,
    kycStatus: 'Pending',
    certification: 'Not Certified',
    email: 'info@downtownevents.com',
    phone: '+1 234 567 8902',
  },
]
