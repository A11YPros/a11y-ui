'use client'

import React from 'react'
import { combineAriaDescribedBy } from '../../utils/aria'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Helper text to display below the input
   */
  helperText?: string
  
  /**
   * Label for the input (creates associated label)
   */
  label?: string
}

/**
 * Accessible Input component
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper label-input association
 * - 2.5.3 Label in Name: Label text matches accessible name
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * - 4.1.3 Status Messages: Error messages announced
 * 
 * @example
 * ```tsx
 * <Input
 *   id="email"
 *   type="email"
 *   label="Email address"
 *   error="Please enter a valid email"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      error,
      helperText,
      label,
      className = '',
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId()
    const finalId = id || `input-${inputId}`
    const errorId = error ? `${finalId}-error` : undefined
    const helperId = helperText ? `${finalId}-helper` : undefined

    const describedBy = combineAriaDescribedBy(
      ariaDescribedBy,
      errorId,
      helperId
    )

    const classes = [
      'form-input',
      error && 'form-input--error',
      props.disabled && 'form-input--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="form-input-wrapper">
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
        <input
          ref={ref}
          id={finalId}
          className={classes}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={props.required ? true : undefined}
          {...props}
        />
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

Input.displayName = 'Input'

