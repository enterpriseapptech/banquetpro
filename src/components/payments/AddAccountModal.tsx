import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Input'
import { WithdrawalAccountItem } from '@/utils/paymentsData'

interface AddAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onAddAccount: (account: Omit<WithdrawalAccountItem, 'id'>) => void
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  onClose,
  onAddAccount,
}) => {
  const [accountName, setAccountName] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')
  const [accountType, setAccountType] = useState('')
  const [isDefault, setIsDefault] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const last4 = accountNumber.slice(-4) || '1234'
    onAddAccount({
      name: accountName || 'Business Operations Account',
      bankName: bankName || 'Bank of America',
      accountType: (accountType as 'Checking' | 'Savings') || 'Checking',
      last4,
      isDefault,
    })
    setAccountName('')
    setBankName('')
    setAccountNumber('')
    setRoutingNumber('')
    setAccountType('')
    setIsDefault(false)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Withdrawal Account"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <TextInput
          label="Account Name"
          placeholder="Business Operations Account"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          required
        />

        <TextInput
          label="Bank Name"
          placeholder="Bank of America"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <TextInput
            label="Account Number"
            placeholder="****1234"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />

          <TextInput
            label="Routing Number"
            placeholder="026009593"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
        </div>

        <TextInput
          label="Account Type"
          placeholder="Checking"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        />

        <div className="flex items-center gap-2.5 pt-1">
          <input
            id="set-default-account"
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[#0052cc] focus:ring-[#0052cc] cursor-pointer"
          />
          <label
            htmlFor="set-default-account"
            className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none"
          >
            Set as default withdrawal account
          </label>
        </div>

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
            Add Account
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddAccountModal
