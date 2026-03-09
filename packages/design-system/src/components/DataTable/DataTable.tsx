'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useAriaLive } from '../../hooks/useAriaLive'
import { createArrowKeyHandler, isNavigationKey } from '../../utils/keyboard'
import { Checkbox } from '../Form/Checkbox'
import './DataTable.css'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string
}

export interface DataTableProps<T> {
  /**
   * Data rows
   */
  data: T[]
  
  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[]
  
  /**
   * Key function to get unique ID for each row
   */
  getRowId: (row: T) => string
  
  /**
   * Whether rows are selectable
   */
  selectable?: boolean
  
  /**
   * Selected row IDs
   */
  selectedRows?: string[]
  
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedIds: string[]) => void
  
  /**
   * Sort configuration
   */
  sortConfig?: {
    column: string
    direction: 'asc' | 'desc'
  }
  
  /**
   * Callback when sort changes
   */
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void
  
  /**
   * Caption for the table (required for accessibility)
   */
  caption?: string
  
  /**
   * Custom class name
   */
  className?: string
}

/**
 * Accessible DataTable component
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Semantic table structure
 * - 2.1.1 Keyboard: Arrow keys, Home/End navigation
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * - 4.1.3 Status Messages: Sort announcements
 * 
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   getRowId={(user) => user.id}
 *   caption="User list"
 * />
 * ```
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  getRowId,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortConfig,
  onSortChange,
  caption,
  className = '',
}: DataTableProps<T>) {
  const [focusedRow, setFocusedRow] = useState<string | null>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map())

  // Announce sort changes
  const sortAnnouncement = sortConfig
    ? `Sorted by ${columns.find((c) => c.key === sortConfig.column)?.header || sortConfig.column}, ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`
    : undefined
  useAriaLive(sortAnnouncement, 'polite')

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return

    const allSelected = selectedRows.length === data.length
    if (allSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange(data.map(getRowId))
    }
  }, [data, selectedRows, onSelectionChange, getRowId])

  const handleSelectRow = useCallback(
    (rowId: string) => {
      if (!onSelectionChange) return

      const isSelected = selectedRows.includes(rowId)
      if (isSelected) {
        onSelectionChange(selectedRows.filter((id) => id !== rowId))
      } else {
        onSelectionChange([...selectedRows, rowId])
      }
    },
    [selectedRows, onSelectionChange]
  )

  const handleSort = useCallback(
    (columnKey: string) => {
      if (!onSortChange || !columns.find((c) => c.key === columnKey)?.sortable) {
        return
      }

      const newDirection =
        sortConfig?.column === columnKey && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
      onSortChange(columnKey, newDirection)
    },
    [onSortChange, sortConfig, columns]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTableRowElement>, rowId: string, index: number) => {
      const row = rowRefs.current.get(rowId)
      if (!row) return

      if (isNavigationKey(event.key)) {
        event.preventDefault()

        let newIndex = index
        switch (event.key) {
          case 'ArrowDown':
            newIndex = Math.min(index + 1, data.length - 1)
            break
          case 'ArrowUp':
            newIndex = Math.max(index - 1, 0)
            break
          case 'Home':
            newIndex = 0
            break
          case 'End':
            newIndex = data.length - 1
            break
        }

        const newRowId = getRowId(data[newIndex])
        setFocusedRow(newRowId)
        rowRefs.current.get(newRowId)?.focus()
      } else if (event.key === ' ' && selectable) {
        event.preventDefault()
        handleSelectRow(rowId)
      }
    },
    [data, selectable, handleSelectRow, getRowId]
  )

  const allSelected = data.length > 0 && selectedRows.length === data.length
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length

  return (
    <div className={['data-table-wrapper', className].filter(Boolean).join(' ')}>
      <table
        ref={tableRef}
        className="data-table"
        aria-label={caption}
      >
        {caption && <caption className="data-table-caption">{caption}</caption>}
        <thead>
          <tr>
            {selectable && (
              <th scope="col" className="data-table-header data-table-header--checkbox">
                <Checkbox
                  checked={allSelected}
                  aria-label="Select all rows"
                  onChange={handleSelectAll}
                  aria-checked={allSelected ? 'true' : someSelected ? 'mixed' : 'false'}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`data-table-header ${column.sortable ? 'data-table-header--sortable' : ''}`}
                style={column.width ? { width: column.width } : undefined}
                aria-sort={
                  sortConfig?.column === column.key
                    ? sortConfig.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
              >
                {column.sortable ? (
                  <button
                    type="button"
                    className="data-table-sort-button"
                    aria-label={
                      sortConfig?.column === column.key
                        ? `${column.header}, sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}, activate to sort ${sortConfig.direction === 'asc' ? 'descending' : 'ascending'}`
                        : `Sort by ${column.header}`
                    }
                    onClick={() => handleSort(column.key)}
                  >
                    {column.header}
                    {sortConfig?.column === column.key && (
                      <span className="data-table-sort-indicator" aria-hidden="true">
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const rowId = getRowId(row)
            const isSelected = selectedRows.includes(rowId)
            const isFocused = focusedRow === rowId

            return (
              <tr
                key={rowId}
                ref={(el) => {
                  if (el) {
                    rowRefs.current.set(rowId, el)
                  } else {
                    rowRefs.current.delete(rowId)
                  }
                }}
                className={`data-table-row ${isSelected ? 'data-table-row--selected' : ''} ${isFocused ? 'data-table-row--focused' : ''}`}
                aria-selected={selectable ? isSelected : undefined}
                onClick={() => {
                  if (selectable) {
                    handleSelectRow(rowId)
                  }
                }}
              >
                {selectable && (
                  <td className="data-table-cell data-table-cell--checkbox">
                    <Checkbox
                      checked={isSelected}
                      aria-label={`Select row ${index + 1}`}
                      onChange={() => handleSelectRow(rowId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="data-table-cell">
                    {column.render ? column.render(row, index) : row[column.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

