'use client'

import React from 'react'
import { combineAriaDescribedBy } from '../../utils/aria'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /**
   * Options for the select
   */
  options: SelectOption[]
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Helper text to display below the select
   */
  helperText?: string
  
  /**
   * Label for the select
   */
  label?: string
  
  /**
   * Placeholder option text
   */
  placeholder?: string
}

/**
 * Accessible Select component
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper label-select association
 * - 2.1.1 Keyboard: Full keyboard navigation
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * 
 * @example
 * ```tsx
 * <Select
 *   id="country"
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      options,
      error,
      helperText,
      label,
      placeholder,
      className = '',
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId()
    const finalId = id || `select-${selectId}`
    const errorId = error ? `${finalId}-error` : undefined
    const helperId = helperText ? `${finalId}-helper` : undefined

    const describedBy = combineAriaDescribedBy(
      ariaDescribedBy,
      errorId,
      helperId
    )

    const classes = [
      'form-select',
      error && 'form-select--error',
      props.disabled && 'form-select--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="form-select-wrapper">
        {label && (
          <label htmlFor={finalId} className="form-label">
            {label}
            {props.required && (
              <span className="form-label__required" aria-hidden="true">
                {' '}*
              </span>
            )}
          </label>
        )}
        <select
          ref={ref}
          id={finalId}
          className={classes}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={props.required ? true : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {helperText && !error && (
          <span id={helperId} className="form-helper-text">
            {helperText}
          </span>
        )}
        {error && (
          <span id={errorId} className="form-error-text" role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

