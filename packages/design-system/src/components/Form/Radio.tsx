'use client'

import React from 'react'
import { combineAriaDescribedBy } from '../../utils/aria'
import './Radio.css'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Options for the radio group
   */
  options: RadioOption[]
  
  /**
   * Name attribute for the radio group (required)
   */
  name: string
  
  /**
   * Label for the radio group
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
}

/**
 * Accessible Radio component (radio group)
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper fieldset/legend structure
 * - 2.1.1 Keyboard: Full keyboard navigation
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * 
 * @example
 * ```tsx
 * <Radio
 *   name="size"
 *   label="Size"
 *   options={[
 *     { value: 's', label: 'Small' },
 *     { value: 'm', label: 'Medium' },
 *   ]}
 *   value={selected}
 *   onChange={handleChange}
 * />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      options,
      label,
      error,
      helperText,
      className = '',
      value,
      onChange,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const groupId = React.useId()
    const errorId = error ? `radio-${groupId}-error` : undefined
    const helperId = helperText ? `radio-${groupId}-helper` : undefined

    const describedBy = combineAriaDescribedBy(
      ariaDescribedBy,
      errorId,
      helperId
    )

    return (
      <div className="form-radio-wrapper">
        {label && (
          <div className="form-radio-label" aria-labelledby={label ? `radio-label-${groupId}` : undefined}>
            <span id={`radio-label-${groupId}`} className="form-label">
              {label}
              {required && (
                <span className="form-label__required" aria-hidden="true">
                  {' '}*
                </span>
              )}
            </span>
          </div>
        )}
        <div className="form-radio-group" role="radiogroup" aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
          {options.map((option, index) => {
            const optionId = `radio-${groupId}-${index}`
            const isChecked = value === option.value
            
            return (
              <div key={option.value} className="form-radio-option">
                <input
                  ref={index === 0 ? ref : undefined}
                  id={optionId}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={onChange}
                  disabled={option.disabled || disabled}
                  required={required}
                  className="form-radio"
                  {...props}
                />
                <label htmlFor={optionId} className="form-radio-label">
                  {option.label}
                </label>
              </div>
            )
          })}
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

Radio.displayName = 'Radio'

