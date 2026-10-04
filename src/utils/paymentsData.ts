export interface TransactionItem {
  id: string
  transactionId: string
  type: string
  amount: string
  isPositive: boolean
  date: string
  status: 'Completed' | 'Pending' | 'Failed' | 'Disputed' | 'Refunded'
  relatedTo: string
  description?: string
  paymentMethod?: string
}

export interface InvoiceItem {
  id: string
  invoiceRef: string
  user: string
  relatedTo: string
  amount: string
  dueDate: string
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partially Paid'
  paymentsLinked: string
  createdAt?: string
}

export interface RefundItem {
  id: string
  refundId: string
  paymentRef: string
  requestedBy: string
  amount: string
  requestDate: string
  status: 'Requested' | 'Approved' | 'Processing' | 'Declined'
  reason: string
  processedDate?: string
}

export interface DisputeItem {
  id: string
  disputeId: string
  user: string
  paymentId: string
  serviceRequestId?: string
  createdDate: string
  resolvedDate?: string
  status: 'Open' | 'Resolved'
  reason: string
  resolutionNotes?: string
}

export interface WithdrawalAccountItem {
  id: string
  name: string
  bankName: string
  accountType: 'Checking' | 'Savings'
  last4: string
  isDefault: boolean
}

export const MOCK_TRANSACTIONS: TransactionItem[] = [
  {
    id: '1',
    transactionId: 'TXN001',
    type: 'Booking Payment',
    amount: '+$5,000',
    isPositive: true,
    date: '2025-01-02',
    status: 'Completed',
    relatedTo: 'Booking #BK-10234',
    description: 'Event center booking for corporate event',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    transactionId: 'TXN002',
    type: 'Subscription Payment',
    amount: '+$99',
    isPositive: true,
    date: '2025-01-01',
    status: 'Completed',
    relatedTo: 'Grand Ballroom Hall',
    description: 'Monthly Professional Plan subscription renewal',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '3',
    transactionId: 'TXN003',
    type: 'Withdrawal',
    amount: '-$2,500',
    isPositive: false,
    date: '2024-12-30',
    status: 'Completed',
    relatedTo: 'John Smith',
    description: 'Payout request to vendor bank account',
    paymentMethod: 'Direct Deposit',
  },
  {
    id: '4',
    transactionId: 'TXN004',
    type: 'Refund',
    amount: '+$500',
    isPositive: true,
    date: '2024-12-28',
    status: 'Pending',
    relatedTo: 'Booking #BK-10120',
    description: 'Cancellation refund processing',
    paymentMethod: 'Credit Card',
  },
  {
    id: '5',
    transactionId: 'TXN005',
    type: 'Booking Payment',
    amount: '+$3,500',
    isPositive: true,
    date: '2024-12-27',
    status: 'Completed',
    relatedTo: 'Booking #BK-10118',
    description: 'Catering package booking fee',
    paymentMethod: 'Debit Card',
  },
  {
    id: '6',
    transactionId: 'TXN006',
    type: 'Withdrawal',
    amount: '-$1,800',
    isPositive: false,
    date: '2024-12-25',
    status: 'Failed',
    relatedTo: 'Emily Davis',
    description: 'Platform payout transaction failed due to bank verification',
    paymentMethod: 'Direct Deposit',
  },
  {
    id: '7',
    transactionId: 'TXN007',
    type: 'Subscription Payment',
    amount: '+$49',
    isPositive: true,
    date: '2024-12-20',
    status: 'Completed',
    relatedTo: 'Taste of Home Catering',
    description: 'Basic Plan monthly fee',
    paymentMethod: 'Credit Card',
  },
  {
    id: '8',
    transactionId: 'TXN008',
    type: 'Booking Payment',
    amount: '+$8,000',
    isPositive: true,
    date: '2024-12-15',
    status: 'Pending',
    relatedTo: 'Booking #BK-10099',
    description: 'Wedding reception hall deposit',
    paymentMethod: 'Bank Wire',
  },
  {
    id: '9',
    transactionId: 'TXN009',
    type: 'KYC Payment',
    amount: '+$25',
    isPositive: true,
    date: '2025-01-10',
    status: 'Completed',
    relatedTo: 'Downtown Event Space',
    description: 'Provider KYC verification processing fee',
    paymentMethod: 'Credit Card',
  },
  {
    id: '10',
    transactionId: 'TXN010',
    type: 'Certification Payment',
    amount: '+$50',
    isPositive: true,
    date: '2025-01-12',
    status: 'Completed',
    relatedTo: 'Grand Ballroom Hall',
    description: 'Verified venue badge renewal fee',
    paymentMethod: 'Credit Card',
  },
  {
    id: '11',
    transactionId: 'TXN011',
    type: 'Featured Plan Payment',
    amount: '+$199',
    isPositive: true,
    date: '2025-01-15',
    status: 'Completed',
    relatedTo: 'Gourmet Delights Catering',
    description: 'Homepage featured listing promotion',
    paymentMethod: 'Credit Card',
  },
  {
    id: '12',
    transactionId: 'TXN012',
    type: 'Booking Payment',
    amount: '+$4,200',
    isPositive: true,
    date: '2025-01-18',
    status: 'Disputed',
    relatedTo: 'Booking #BK-10245',
    description: 'Customer chargeback dispute opened',
    paymentMethod: 'Credit Card',
  },
  {
    id: '13',
    transactionId: 'TXN013',
    type: 'Booking Payment',
    amount: '+$1,500',
    isPositive: true,
    date: '2025-01-20',
    status: 'Refunded',
    relatedTo: 'Booking #BK-10250',
    description: 'Full refund issued for cancelled event',
    paymentMethod: 'Debit Card',
  },
  {
    id: '14',
    transactionId: 'TXN014',
    type: 'Booking Payment',
    amount: '+$6,800',
    isPositive: true,
    date: '2025-01-22',
    status: 'Completed',
    relatedTo: 'Booking #BK-10255',
    description: 'Corporate gala dinner hall payment',
    paymentMethod: 'Credit Card',
  },
  {
    id: '15',
    transactionId: 'TXN015',
    type: 'Subscription Payment',
    amount: '+$999',
    isPositive: true,
    date: '2025-01-25',
    status: 'Completed',
    relatedTo: 'Riverside Convention Center',
    description: 'Annual Enterprise Plan subscription fee',
    paymentMethod: 'Bank Transfer',
  },
]

export const MOCK_INVOICES: InvoiceItem[] = [
  {
    id: '1',
    invoiceRef: 'INV-2025-001',
    user: 'Alice Thompson',
    relatedTo: 'Booking #BK-10234',
    amount: 'USD 5,000',
    dueDate: '2025-01-15',
    status: 'Paid',
    paymentsLinked: '1 linked',
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    invoiceRef: 'INV-2025-002',
    user: 'Grand Ballroom Hall',
    relatedTo: 'Subscription - Professional Plan',
    amount: 'USD 99',
    dueDate: '2025-02-01',
    status: 'Pending',
    paymentsLinked: '0 linked',
    createdAt: '2025-01-01',
  },
  {
    id: '3',
    invoiceRef: 'INV-2024-089',
    user: 'Bob Martinez',
    relatedTo: 'Booking #BK-10099',
    amount: 'USD 8,000',
    dueDate: '2024-12-20',
    status: 'Overdue',
    paymentsLinked: '0 linked',
    createdAt: '2024-12-01',
  },
  {
    id: '4',
    invoiceRef: 'INV-2025-003',
    user: 'Alice Thompson',
    relatedTo: 'Booking #BK-10245',
    amount: 'USD 3,500',
    dueDate: '2025-01-25',
    status: 'Partially Paid',
    paymentsLinked: '1 linked',
    createdAt: '2025-01-10',
  },
]

export const MOCK_REFUNDS: RefundItem[] = [
  {
    id: '1',
    refundId: 'REF001',
    paymentRef: 'TXN004',
    requestedBy: 'Alice Thompson',
    amount: 'USD 500',
    requestDate: '2024-12-28',
    status: 'Requested',
    reason: 'Event cancelled by organizer',
  },
  {
    id: '2',
    refundId: 'REF002',
    paymentRef: 'TXN015',
    requestedBy: 'Bob Martinez',
    amount: 'USD 1,200',
    requestDate: '2024-12-20',
    status: 'Approved',
    reason: 'Service not provided as agreed',
    processedDate: '2024-12-22',
  },
  {
    id: '3',
    refundId: 'REF003',
    paymentRef: 'TXN022',
    requestedBy: 'Sarah Johnson',
    amount: 'USD 750',
    requestDate: '2025-01-10',
    status: 'Processing',
    reason: 'Double charge error',
    processedDate: '2025-01-11',
  },
  {
    id: '4',
    refundId: 'REF004',
    paymentRef: 'TXN018',
    requestedBy: 'Michael Brown',
    amount: 'USD 300',
    requestDate: '2024-12-15',
    status: 'Declined',
    reason: 'Outside cancellation window policy',
    processedDate: '2024-12-16',
  },
]

export const MOCK_DISPUTES: DisputeItem[] = [
  {
    id: '1',
    disputeId: 'DIS001',
    user: 'Alice Thompson',
    paymentId: 'TXN001',
    serviceRequestId: 'BK-10234',
    createdDate: '2025-01-10',
    status: 'Open',
    reason: 'Service quality did not match description',
  },
  {
    id: '2',
    disputeId: 'DIS002',
    user: 'Bob Martinez',
    paymentId: 'TXN008',
    createdDate: '2024-12-18',
    resolvedDate: '2024-12-20',
    status: 'Resolved',
    reason: 'Unauthorized charge on account',
    resolutionNotes: 'Full refund issued to customer',
  },
  {
    id: '3',
    disputeId: 'DIS003',
    user: 'Michael Brown',
    paymentId: 'TXN025',
    createdDate: '2025-01-15',
    status: 'Open',
    reason: 'Incorrect billing amount charged',
  },
]

export const MOCK_ACCOUNTS: WithdrawalAccountItem[] = [
  {
    id: '1',
    name: 'Business Operations Account',
    bankName: 'Bank of America',
    accountType: 'Checking',
    last4: '1234',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Savings Reserve',
    bankName: 'Chase Bank',
    accountType: 'Savings',
    last4: '5678',
    isDefault: false,
  },
  {
    id: '3',
    name: 'Secondary Business Account',
    bankName: 'Wells Fargo',
    accountType: 'Checking',
    last4: '9012',
    isDefault: false,
  },
]

