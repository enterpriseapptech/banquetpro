import { Mail, Phone, MessageCircle } from 'lucide-react'
import type { ContactTone } from '@/components/support/ContactCard'

export interface ContactMethod {
  id: string
  title: string
  description: string
  actionLabel: string
  href?: string
  tone: ContactTone
  icon: typeof Mail
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email Support',
    description: "We'll respond within 24 hours",
    actionLabel: 'support@entapptech.com',
    href: 'mailto:support@entapptech.com',
    tone: 'blue',
    icon: Mail,
  },
  {
    id: 'phone',
    title: 'Phone Support',
    description: 'Mon-Fri, 9am-6pm EST',
    actionLabel: '+1 (800) 123-4567',
    href: 'tel:+18001234567',
    tone: 'green',
    icon: Phone,
  },
  {
    id: 'chat',
    title: 'Live Chat',
    description: 'Available during business hours',
    actionLabel: 'Start Chat',
    tone: 'purple',
    icon: MessageCircle,
  },
]

export const FAQS: FaqItem[] = [
  {
    id: 'kyc',
    question: 'How do I approve KYC documents?',
    answer:
      'Navigate to KYC & Certification, select a pending document, review the details, and click the Approve or Reject button.',
  },
  {
    id: 'refunds',
    question: 'How do I process refunds?',
    answer:
      'Go to Payment & Wallet Management, select the Refunds tab, view the refund request, and click Approve or Decline.',
  },
  {
    id: 'plans',
    question: 'How do I add a new subscription plan?',
    answer:
      'Visit Subscription Management, click "Add Plan", fill in the plan details including features, and save.',
  },
  {
    id: 'fees',
    question: 'How do I manage platform fees?',
    answer:
      'Navigate to Fees Management to create, edit, or deactivate KYC and Certification fees.',
  },
  {
    id: 'settings',
    question: 'How do I change global settings?',
    answer:
      'Access Settings from the sidebar, modify platform settings, KYC method, or notification preferences, and click Save Settings.',
  },
]

export const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Urgent', value: 'Urgent' },
]
