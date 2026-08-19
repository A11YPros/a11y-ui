'use client';

import React from 'react';
import { combineAriaDescribedBy } from '../../utils/aria';
import './Textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below the textarea
   */
  helperText?: string;

  /**
   * Label for the textarea
   */
  label?: string;

  /**
   * Maximum character count (shows counter)
   */
  maxLength?: number;

  /**
   * Whether to show character count
   */
  showCount?: boolean;
}

/**
 * Accessible Textarea component
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper label-textarea association
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * - 4.1.3 Status Messages: Error messages announced
 *
 * @example
 * ```tsx
 * <Textarea
 *   id="message"
 *   label="Message"
 *   maxLength={500}
 *   showCount
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      error,
      helperText,
      label,
      maxLength,
      showCount = false,
      className = '',
      value,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const textareaId = React.useId();
    const finalId = id || `textarea-${textareaId}`;
    const errorId = error ? `${finalId}-error` : undefined;
    const helperId = helperText ? `${finalId}-helper` : undefined;
    const countId = showCount ? `${finalId}-count` : undefined;

    const describedBy = combineAriaDescribedBy(ariaDescribedBy, errorId, helperId, countId);

    const currentLength = typeof value === 'string' ? value.length : 0;
    const remainingChars = maxLength ? maxLength - currentLength : undefined;

    const classes = [
      'form-textarea',
      error && 'form-textarea--error',
      props.disabled && 'form-textarea--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="form-textarea-wrapper">
        {label && (
          <label htmlFor={finalId} className="form-label">
            {label}
            {props.required && (
              <span className="form-label__required" aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={finalId}
          className={classes}
          maxLength={maxLength}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={props.required ? true : undefined}
          {...props}
        />
        {(showCount || helperText || error) && (
          <div className="form-textarea-footer">
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
            {showCount && maxLength && (
              <span id={countId} className="form-character-count" aria-live="polite">
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
