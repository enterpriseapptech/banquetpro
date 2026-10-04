import React, { useState } from 'react'
import { FileText, CalendarClock, CheckCircle2, XCircle, Eye, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { DataTable, Column } from '@/components/ui/DataTable'
import { PostloginLayout } from '@/layouts/PostloginLayout'
import { KycDocumentModal } from '@/components/kyc/KycDocumentModal'
import { KycDocument, KycStatus, INITIAL_KYC_DOCUMENTS } from '@/utils/kycData'

type KycFilter = 'All' | KycStatus

const FILTERS: KycFilter[] = ['All', 'Pending', 'Approved', 'Rejected']

export const Kyc: React.FC = () => {
  const [documents, setDocuments] = useState<KycDocument[]>(INITIAL_KYC_DOCUMENTS)
  const [filter, setFilter] = useState<KycFilter>('All')
  const [viewingDocument, setViewingDocument] = useState<KycDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleView = (doc: KycDocument) => {
    setViewingDocument(doc)
    setIsModalOpen(true)
  }

  const updateStatus = (id: string, status: KycStatus) => {
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)))
  }

  const countOf = (status: KycStatus) => documents.filter((d) => d.status === status).length
  const filteredDocuments =
    filter === 'All' ? documents : documents.filter((d) => d.status === filter)

  const columns: Column<KycDocument>[] = [
    {
      key: 'providerName',
      header: 'Provider Name',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900 text-xs sm:text-sm">{row.providerName}</span>
      ),
    },
    {
      key: 'documentType',
      header: 'Document Type',
      render: (row) => (
        <span className="font-medium text-gray-700 text-xs sm:text-sm">{row.documentType}</span>
      ),
    },
    {
      key: 'uploadedDate',
      header: 'Uploaded Date',
      sortable: true,
      render: (row) => (
        <span className="text-gray-600 text-xs sm:text-sm font-medium">{row.uploadedDate}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge label={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleView(row)}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            title="View Document"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status === 'Pending' && (
            <>
              <button
                type="button"
                onClick={() => updateStatus(row.id, 'Approved')}
                className="p-1 text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
                title="Approve"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => updateStatus(row.id, 'Rejected')}
                className="p-1 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                title="Reject"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <PostloginLayout
      title="KYC & Certification"
      subtitle="Review and approve KYC documents and manage certifications"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Total Documents"
            value={documents.length}
            subtitle="All submissions"
            icon={<FileText className="w-5 h-5 text-blue-600" />}
          />
          <SummaryCard
            title="Pending Review"
            value={countOf('Pending')}
            subtitle="Awaiting approval"
            icon={<CalendarClock className="w-5 h-5 text-orange-500" />}
          />
          <SummaryCard
            title="Approved"
            value={countOf('Approved')}
            subtitle="Verified documents"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          />
          <SummaryCard
            title="Rejected"
            value={countOf('Rejected')}
            subtitle="Declined submissions"
            icon={<XCircle className="w-5 h-5 text-red-500" />}
          />
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            KYC Documents
          </h3>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
            {FILTERS.map((item) => (
              <Button
                key={item}
                type="button"
                size="md"
                variant={filter === item ? 'primary' : 'secondary'}
                onClick={() => setFilter(item)}
                className={
                  filter === item
                    ? 'bg-[#0052cc] hover:bg-blue-700 text-white rounded-xl px-4 text-xs sm:text-sm font-semibold cursor-pointer'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent rounded-xl px-4 text-xs sm:text-sm font-medium cursor-pointer'
                }
              >
                {item}
              </Button>
            ))}
          </div>

          <DataTable
            columns={columns}
            data={filteredDocuments}
            keyExtractor={(row) => row.id}
            currentPage={1}
            totalPages={10}
          />
        </div>
      </div>

      <KycDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        document={viewingDocument}
        onApprove={(id) => updateStatus(id, 'Approved')}
        onReject={(id) => updateStatus(id, 'Rejected')}
      />
    </PostloginLayout>
  )
}

export default Kyc
