import React, { useState } from 'react'
import { Wallet } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Input'
import { WithdrawalAccountItem } from '@/utils/paymentsData'

interface RequestWithdrawalModalProps {
  isOpen: boolean
  onClose: () => void
  availableBalance?: string
  accounts?: WithdrawalAccountItem[]
  onSubmitRequest?: (amount: string, accountId: string) => void
}

export const RequestWithdrawalModal: React.FC<RequestWithdrawalModalProps> = ({
  isOpen,
  onClose,
  availableBalance = '$98,500',
  accounts = [],
  onSubmitRequest,
}) => {
  const [amount, setAmount] = useState('')
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id || ''
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmitRequest) {
      onSubmitRequest(amount, selectedAccountId)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Withdrawal"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Available Balance Box */}
        <div className="bg-[#F4F8FF] border border-blue-100 rounded-2xl p-4.5 sm:p-5">
          <div className="flex items-center gap-2 text-[#0052cc] font-semibold text-xs sm:text-sm">
            <Wallet className="w-4 h-4 text-[#0052cc] shrink-0" />
            <span>Available Balance</span>
          </div>
          <p className="text-3xl font-extrabold text-[#0052cc] tracking-tight mt-2">
            {availableBalance}
          </p>
        </div>

        {/* Amount Field */}
        <TextInput
          label="Amount to Withdraw"
          placeholder="$ 0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Account Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-900 block font-['Montserrat']">
            Withdrawal Account
          </label>
          <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg outline-none transition-all py-2.5 px-3 focus:border-[#D6BBFB]"
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.bankName} • ****{acc.last4})
                {acc.isDefault ? ' [Default]' : ''}
              </option>
            ))}
            {accounts.length === 0 && (
              <option value="">Business Operations Account (****1234)</option>
            )}
          </select>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="border-gray-200 text-gray-700 font-semibold rounded-xl px-5"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold rounded-xl px-5 shadow-2xs border-none"
          >
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default RequestWithdrawalModal
