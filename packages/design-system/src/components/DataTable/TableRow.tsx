'use client'

import React from 'react'
import { Checkbox } from '../Form/Checkbox'
import { DataTableColumn } from './DataTable'

export interface TableRowProps<T> {
  /**
   * Row data
   */
  row: T
  
  /**
   * Unique ID for the row
   */
  rowId: string
  
  /**
   * Row index
   */
  index: number
  
  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[]
  
  /**
   * Whether the table has selectable rows
   */
  selectable?: boolean
  
  /**
   * Whether this row is selected
   */
  isSelected: boolean
  
  /**
   * Callback when row selection changes
   */
  onSelectRow: (rowId: string) => void
  
  /**
   * Ref callback for the row element
   */
  rowRef?: (element: HTMLTableRowElement | null) => void
  
  /**
   * Custom class name
   */
  className?: string
}

/**
 * DataTable row component
 * 
 * Renders a single table row with optional selection checkbox and custom cell rendering.
 * 
 * @example
 * ```tsx
 * <TableRow
 *   row={user}
 *   rowId="user-1"
 *   index={0}
 *   columns={columns}
 *   selectable
 *   isSelected={false}
 *   onSelectRow={handleSelectRow}
 * />
 * ```
 */
export function TableRow<T extends Record<string, any>>({
  row,
  rowId,
  index,
  columns,
  selectable = false,
  isSelected,
  onSelectRow,
  rowRef,
  className = '',
}: TableRowProps<T>) {


  return (
    <tr
      ref={rowRef}
      className={`data-table-row ${isSelected ? 'data-table-row--selected' : ''} ${className}`.trim()}
      aria-selected={selectable ? isSelected : undefined}
      onClick={() => {
        if (selectable) {
          onSelectRow(rowId)
        }
      }}
    >
      {selectable && (
        <td className="data-table-cell data-table-cell--checkbox">
          <Checkbox
            checked={isSelected}
            aria-label={`Select row ${index + 1}`}
            onChange={() => onSelectRow(rowId)}
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
}
