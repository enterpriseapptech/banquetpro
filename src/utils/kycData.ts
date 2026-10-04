export type KycStatus = 'Pending' | 'Approved' | 'Rejected'

export interface KycDocument {
  id: string
  documentId: string
  providerName: string
  providerId: string
  documentType: string
  uploadedDate: string
  status: KycStatus
  documentUrl: string
}

export const SAMPLE_DOCUMENT_URL = '/samples/sample-document.pdf'

export const INITIAL_KYC_DOCUMENTS: KycDocument[] = [
  {
    id: '1',
    documentId: 'KYC001',
    providerName: 'Downtown Event Space',
    providerId: 'SP003',
    documentType: 'Business License',
    uploadedDate: '2024-12-28',
    status: 'Pending',
    documentUrl: SAMPLE_DOCUMENT_URL,
  },
  {
    id: '2',
    documentId: 'KYC002',
    providerName: 'Grand Ballroom Hall',
    providerId: 'SP001',
    documentType: 'Tax ID',
    uploadedDate: '2024-01-15',
    status: 'Approved',
    documentUrl: SAMPLE_DOCUMENT_URL,
  },
]
