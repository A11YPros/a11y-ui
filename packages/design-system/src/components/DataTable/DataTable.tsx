'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { useAriaLive } from '../../hooks/useAriaLive'
import { Checkbox } from '../Form/Checkbox'
import { TableRow } from './TableRow'
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
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * - 4.1.3 Status Messages: Sort and Select announcements
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
  const toggleAllInputRef = useRef<HTMLInputElement>(null);

  // Announce sort changes
  const sortAnnouncement = sortConfig
    ? `Sorted by ${columns.find((c) => c.key === sortConfig.column)?.header || sortConfig.column}, ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`
    : undefined
  useAriaLive(sortAnnouncement, 'polite');

  const selectedCountAnnouncement = selectable
    ? `${selectedRows.length} of ${data.length} rows selected`
    : undefined
  useAriaLive(selectedCountAnnouncement, 'polite');

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return

    const allSelected = selectedRows.length === data.length
    if (allSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange(data.map(getRowId))
    }
  }, [data, selectedRows, onSelectionChange]);


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

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

    useEffect(() => {
	    if (toggleAllInputRef.current) {
	      toggleAllInputRef.current.indeterminate = someSelected;
	    }
  	}, [someSelected]);

  return (
    <div className={['data-table-wrapper', className].filter(Boolean).join(' ')}>
      <table
        className="data-table"
        aria-label={caption}
      >
        {caption && <caption className="data-table-caption">{caption}</caption>}
        <thead>
          <tr>
            {selectable && (
              <th scope="col" className="data-table-header data-table-header--checkbox">
                <Checkbox
                  ref={toggleAllInputRef}
                  checked={allSelected}
                  aria-label="Select all rows"
                  onChange={handleSelectAll}
                  aria-checked={allSelected ? 'true' : someSelected ? 'mixed' : 'false'}
                  className={someSelected ? 'indeterminate' : ''}
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

            return (
              <TableRow
                key={rowId}
                row={row}
                rowId={rowId}
                index={index}
                columns={columns}
                selectable={selectable}
                isSelected={isSelected}
                onSelectRow={handleSelectRow}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

