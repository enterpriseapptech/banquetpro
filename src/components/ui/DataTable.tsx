import React from 'react'
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Edit3, Trash2 } from 'lucide-react'
import { cn } from '@/utils'

export interface Column<T> {
  key: string
  header: React.ReactNode
  accessor?: keyof T
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface DataTableProps<T> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  headerActions?: React.ReactNode
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (columnKey: string) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  emptyMessage?: string
  className?: string
}

export function DataTable<T>({
  title,
  subtitle,
  headerActions,
  columns,
  data,
  keyExtractor,
  sortColumn,
  sortDirection = 'desc',
  onSort,
  onEdit,
  onDelete,
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {

  const hasRowActions = Boolean(onEdit || onDelete)

  const renderPaginationItems = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages)
    }

    return pages.map((page, idx) => {
      if (typeof page === 'string') {
        return (
          <span key={`dots-${idx}`} className="px-2 py-1 text-xs text-gray-400 font-medium">
            ...
          </span>
        )
      }

      const isActive = page === currentPage
      return (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange?.(page)}
          className={cn(
            'w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer',
            isActive
              ? 'bg-[#F0F5FF] text-[#0052CC] font-bold border border-[#0052CC]/20'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          {page}
        </button>
      )
    })
  }

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden flex flex-col',
        className
      )}
    >
      {(title || subtitle || headerActions) && (
        <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {typeof title === 'string' ? (
              <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            ) : (
              title
            )}
            {subtitle && (
              typeof subtitle === 'string' ? (
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {subtitle}
                </p>
              ) : (
                subtitle
              )
            )}
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}

      <div className="overflow-x-auto scrollbar-thin flex-1">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 font-medium">
              {columns.map((col) => {
                const isSorted = sortColumn === col.key
                return (
                  <th
                    key={col.key}
                    className={cn(
                      'py-3.5 px-4 sm:px-6 font-medium text-gray-500 select-none whitespace-nowrap',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.sortable && 'cursor-pointer hover:text-gray-900',
                      col.className
                    )}
                    onClick={() => col.sortable && onSort?.(col.key)}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1',
                        col.align === 'right' && 'justify-end w-full',
                        col.align === 'center' && 'justify-center w-full'
                      )}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-gray-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-[#0052CC]" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-[#0052CC]" />
                            )
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}

              {hasRowActions && <th className="py-3.5 px-4 sm:px-6 text-right w-24">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasRowActions ? 1 : 0)}
                  className="py-12 text-center text-gray-400 font-normal"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={keyExtractor(row, index)}
                  className="hover:bg-gray-50/70 transition-colors duration-150"
                >
                  {columns.map((col) => {
                    let cellContent: React.ReactNode = null
                    if (col.render) {
                      cellContent = col.render(row, index)
                    } else if (col.accessor) {
                      cellContent = row[col.accessor] as unknown as React.ReactNode
                    }

                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'py-4 px-4 sm:px-6 whitespace-nowrap text-gray-700',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          col.className
                        )}
                      >
                        {cellContent}
                      </td>
                    )
                  })}

                  {hasRowActions && (
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2 justify-end">
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:px-6 border-t border-gray-100 flex items-center justify-between gap-4 bg-white flex-wrap sm:flex-nowrap">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1 justify-center flex-wrap">
          {renderPaginationItems()}
        </div>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default DataTable
