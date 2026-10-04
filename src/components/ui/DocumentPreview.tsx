import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export interface DocumentPreviewProps {
  url?: string
  fileName?: string
}

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg)$/i

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-gray-400">
    <FileText className="w-12 h-12" />
    <p className="text-sm font-medium text-gray-500">{message}</p>
  </div>
)

/**
 * Previews a PDF (via react-pdf / PDF.js) or an image.
 * Falls back to a placeholder when no document URL is available.
 */
export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ url, fileName }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(480)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(200, Math.floor(entry.contentRect.width)))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setPageNumber(1)
    setNumPages(0)
    setFailed(false)
  }, [url])

  if (!url || url === '#') {
    return <EmptyState message="No document available" />
  }

  if (IMAGE_EXTENSIONS.test(url)) {
    return (
      <img
        src={url}
        alt={fileName || 'Document preview'}
        className="max-h-80 w-auto mx-auto rounded-lg object-contain"
      />
    )
  }

  return (
    <div ref={containerRef} className="w-full">
      {failed ? (
        <EmptyState message="Unable to preview this document" />
      ) : (
        <>
          <div className="flex justify-center max-h-80 overflow-auto rounded-lg border border-gray-200 bg-white">
            <Document
              file={url}
              onLoadSuccess={({ numPages: total }) => setNumPages(total)}
              onLoadError={() => setFailed(true)}
              loading={
                <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading document...
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={Math.min(width, 560)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>

          {numPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => p - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs font-medium text-gray-600">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber((p) => p + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DocumentPreview
