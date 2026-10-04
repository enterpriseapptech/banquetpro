import React, { useState } from 'react'
import { DollarSign, Plus, Eye, Pencil, Power, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import { FeeDetailsModal, FeeFormModal, FeeFormData } from '@/components/fees'
import { FeeItem, INITIAL_FEES, formatFeeAmount } from '@/utils/feesData'

export const Fees: React.FC = () => {
  const [fees, setFees] = useState<FeeItem[]>(INITIAL_FEES)

  const [viewingFee, setViewingFee] = useState<FeeItem | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const [editingFee, setEditingFee] = useState<FeeItem | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [deletingFee, setDeletingFee] = useState<FeeItem | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const today = () => new Date().toISOString().split('T')[0]

  const handleAddFee = () => {
    setEditingFee(null)
    setIsFormOpen(true)
  }

  const handleEditFee = (fee: FeeItem) => {
    setEditingFee(fee)
    setIsFormOpen(true)
  }

  const handleViewFee = (fee: FeeItem) => {
    setViewingFee(fee)
    setIsDetailsOpen(true)
  }

  const handleRequestDelete = (fee: FeeItem) => {
    setDeletingFee(fee)
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deletingFee) {
      setFees((prev) => prev.filter((f) => f.id !== deletingFee.id))
    }
    setDeletingFee(null)
  }

  const handleToggleStatus = (feeId: string) => {
    setFees((prev) =>
      prev.map((f) =>
        f.id === feeId
          ? {
              ...f,
              status: f.status === 'Active' ? 'Inactive' : 'Active',
              lastUpdated: today(),
              updatedBy: 'Admin',
            }
          : f
      )
    )
  }

  const handleSaveFee = (data: FeeFormData) => {
    if (data.id) {
      setFees((prev) =>
        prev.map((f) =>
          f.id === data.id
            ? {
                ...f,
                name: data.name,
                type: data.type,
                amount: data.amount,
                currency: data.currency,
                description: data.description,
                status: data.status,
                lastUpdated: today(),
                updatedBy: 'Admin',
              }
            : f
        )
      )
    } else {
      const newFee: FeeItem = {
        id: String(Date.now()),
        name: data.name,
        type: data.type,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        status: data.status,
        createdAt: today(),
        lastUpdated: today(),
        updatedBy: 'Admin',
      }
      setFees((prev) => [...prev, newFee])
    }
  }

  const activeFees = fees.filter((f) => f.status === 'Active')
  const kycCount = fees.filter((f) => f.type === 'KYC').length
  const certificationCount = fees.filter((f) => f.type === 'Certification').length

  const feeColumns: Column<FeeItem>[] = [
    {
      key: 'name',
      header: 'Fee Name',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900 text-xs sm:text-sm">{row.name}</span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (row) => (
        <span className="font-medium text-gray-700 text-xs sm:text-sm">{row.type}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-900 text-xs sm:text-sm">
          {formatFeeAmount(row)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            row.status === 'Active'
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
              : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
      sortable: true,
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm font-medium">{row.lastUpdated}</span>
      ),
    },
    {
      key: 'updatedBy',
      header: 'Updated By',
      render: (row) => (
        <span className="text-gray-700 text-xs sm:text-sm font-medium">{row.updatedBy}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleViewFee(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleEditFee(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="Edit Fee"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleToggleStatus(row.id)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title={row.status === 'Active' ? 'Deactivate Fee' : 'Activate Fee'}
          >
            <Power className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleRequestDelete(row)}
            className="p-1 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Delete Fee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <PostloginLayout
      title="Fees Management"
      subtitle="Configure mandatory platform charges for KYC and Certification"
      headerActions={
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4 shrink-0" />}
          onClick={handleAddFee}
          className="bg-[#0052cc] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          Add Fee
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <SummaryCard
            title="Total Fees"
            value={activeFees.length}
            subtitle="Active fees configured"
            icon={<DollarSign className="w-5 h-5 text-blue-600" />}
          />
          <SummaryCard
            title="KYC Fees"
            value={kycCount}
            subtitle="KYC verification charges"
            icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          />
          <SummaryCard
            title="Certification Fees"
            value={certificationCount}
            subtitle="Certification charges"
            icon={<DollarSign className="w-5 h-5 text-purple-500" />}
          />
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            Platform Fees
          </h3>

          <DataTable
            columns={feeColumns}
            data={fees}
            keyExtractor={(row) => row.id}
            currentPage={1}
            totalPages={10}
          />
        </div>
      </div>

      <FeeDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        fee={viewingFee}
      />

      <FeeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveFee}
        initialData={editingFee}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Fee"
        message={
          <>
            Are you sure you want to delete "{deletingFee?.name}"? This action will perform a
            soft delete.
          </>
        }
        confirmText="Delete"
      />
    </PostloginLayout>
  )
}

export default Fees
