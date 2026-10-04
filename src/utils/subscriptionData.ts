export interface SubscriptionPlan {
  id: string
  name: string
  billingType: string
  price: string
  status: 'Active' | 'Inactive'
  features: string[]
}

export interface SubscribedUser {
  id: string
  businessName: string
  planName: string
  status: 'Active' | 'Expired' | 'Cancelled'
  startDate: string
  renewalDate: string
}

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Basic Plan',
    billingType: 'Monthly',
    price: '49',
    status: 'Active',
    features: ['Up to 10 listings', 'Basic analytics', 'Email support'],
  },
  {
    id: '2',
    name: 'Professional Plan',
    billingType: 'Monthly',
    price: '99',
    status: 'Active',
    features: [
      'Unlimited listings',
      'Advanced analytics',
      'Priority support',
      'Featured listings',
    ],
  },
  {
    id: '3',
    name: 'Enterprise Plan',
    billingType: 'Annual',
    price: '999',
    status: 'Active',
    features: [
      'Unlimited listings',
      'Premium analytics',
      '24/7 support',
      'API access',
      'Custom integrations',
    ],
  },
]

export const INITIAL_SUBSCRIBED_USERS: SubscribedUser[] = [
  {
    id: '1',
    businessName: 'Grand Ballroom Hall',
    planName: 'Professional Plan',
    status: 'Active',
    startDate: '2025-01-01',
    renewalDate: '2025-02-01',
  },
  {
    id: '2',
    businessName: 'Gourmet Delights Catering',
    planName: 'Basic Plan',
    status: 'Active',
    startDate: '2024-12-15',
    renewalDate: '2025-01-15',
  },
  {
    id: '3',
    businessName: 'Downtown Event Space',
    planName: 'Professional Plan',
    status: 'Expired',
    startDate: '2024-11-01',
    renewalDate: '2024-12-01',
  },
]
