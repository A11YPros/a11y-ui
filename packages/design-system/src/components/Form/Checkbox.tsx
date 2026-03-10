'use client'

import React from 'react'
import { combineAriaDescribedBy } from '../../utils/aria'
import './Checkbox.css'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Label for the checkbox
   */
  label?: string

  /**
   * Error message to display
   */
  error?: string

  /**
   * Helper text to display
   */
  helperText?: string

  /**
   * Indeterminate state for the checkbox
   */
  indeterminate?: boolean
}

/**
 * Accessible Checkbox component
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper label-input association
 * - 2.5.3 Label in Name: Label text matches accessible name
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * 
 * @example
 * ```tsx
 * <Checkbox
 *   id="agree"
 *   label="I agree to the terms"
 *   checked={checked}
 *   onChange={handleChange}
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      className = '',
      'aria-describedby': ariaDescribedBy,
      indeterminate,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId()
    const finalId = id || `checkbox-${checkboxId}`
    const errorId = error ? `${finalId}-error` : undefined
    const helperId = helperText ? `${finalId}-helper` : undefined

    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = indeterminate ?? false
      }
    }, [indeterminate, ref])

    const describedBy = combineAriaDescribedBy(
      ariaDescribedBy,
      errorId,
      helperId
    )

    const classes = [
      'form-checkbox',
      error && 'form-checkbox--error',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="form-checkbox-wrapper">
        <div className="form-checkbox-input-wrapper">
          <input
            ref={ref}
            id={finalId}
            type="checkbox"
            className={classes}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            required={props.required ? true : undefined}
            {...props}
          />
          {label && (
            <label htmlFor={finalId} className="form-checkbox-label">
              {label}
              {props.required && (
                <span className="form-label__required" aria-hidden="true">
                  {' '}*
                </span>
              )}
            </label>
          )}
        </div>
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

Checkbox.displayName = 'Checkbox'

