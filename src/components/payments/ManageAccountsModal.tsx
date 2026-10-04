import React, { useState } from 'react'
import { Landmark, Plus, Edit2, Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { WithdrawalAccountItem } from '@/utils/paymentsData'
import { AddAccountModal } from './AddAccountModal'

interface ManageAccountsModalProps {
  isOpen: boolean
  onClose: () => void
  accounts: WithdrawalAccountItem[]
  onAddAccount?: (account: Omit<WithdrawalAccountItem, 'id'>) => void
  onDeleteAccount?: (id: string) => void
}

export const ManageAccountsModal: React.FC<ManageAccountsModalProps> = ({
  isOpen,
  onClose,
  accounts,
  onAddAccount,
  onDeleteAccount,
}) => {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false)

  const handleSaveNewAccount = (acc: Omit<WithdrawalAccountItem, 'id'>) => {
    if (onAddAccount) {
      onAddAccount(acc)
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Withdrawal Accounts"
        maxWidth="max-w-lg"
      >
        <div className="space-y-5">
          {/* Header Action Row */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Manage your withdrawal accounts
            </p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4 shrink-0" />}
              onClick={() => setIsAddAccountModalOpen(true)}
              className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold rounded-xl text-xs px-3.5 py-2 shadow-2xs border-none cursor-pointer"
            >
              Add Account
            </Button>
          </div>

          {/* Account Cards List */}
          <div className="space-y-3">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:border-gray-300 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-[#0052cc] shrink-0 mt-0.5">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">
                        {acc.name}
                      </span>
                      {acc.isDefault && (
                        <span className="bg-blue-50 text-[#0052cc] border border-blue-100 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      {acc.bankName}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      {acc.accountType} • ****{acc.last4}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                    title="Edit Account"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => onDeleteAccount && onDeleteAccount(acc.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    title="Delete Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {accounts.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-xs font-medium">
                No withdrawal accounts linked yet.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end pt-3 border-t border-gray-100">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              className="border-gray-200 text-gray-700 font-semibold rounded-xl px-5 cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Withdrawal Account Modal */}
      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAddAccount={handleSaveNewAccount}
      />
    </>
  )
}

export default ManageAccountsModal
