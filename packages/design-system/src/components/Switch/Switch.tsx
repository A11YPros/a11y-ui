'use client';

import React from 'react';
import { combineAriaDescribedBy } from '../../utils/aria';
import { createActivationHandler } from '../../utils/keyboard';
import './Switch.css';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPosition = 'start' | 'end';

export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'role' | 'aria-checked' | 'value'
> {
  /**
   * Controlled checked state
   */
  checked?: boolean;

  /**
   * Initial checked state for uncontrolled usage
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Callback fired when the switch state changes
   */
  onChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => void;

  /**
   * Visible label for the switch
   */
  label?: string;

  /**
   * Position of the label relative to the switch
   * @default 'end'
   */
  labelPosition?: SwitchLabelPosition;

  /**
   * Size of the switch
   * @default 'md'
   */
  size?: SwitchSize;

  /**
   * Error message to display and associate with aria-describedby
   */
  error?: string;

  /**
   * Helper text to display and associate with aria-describedby
   */
  helperText?: string;

  /**
   * Name for hidden input when used in HTML forms
   */
  name?: string;

  /**
   * Value for hidden input when used in HTML forms
   * @default 'on'
   */
  value?: string;
}

/**
 * Accessible Switch (Toggle) component
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper label-switch association
 * - 1.4.1 Use of Color: State communicated via position, color, and contrast
 * - 1.4.3 & 1.4.11 Contrast: Meets 3:1 contrast for UI controls
 * - 2.1.1 Keyboard: Space and Enter key activation
 * - 2.4.7 Focus Visible: Clear focus indicators
 * - 2.5.8 Target Size (Minimum): Hit target meets minimum 24x24px / 44x44px
 * - 4.1.2 Name, Role, Value: role="switch" and aria-checked
 *
 * @example
 * ```tsx
 * <Switch
 *   id="notifications"
 *   label="Enable email notifications"
 *   checked={enabled}
 *   onChange={(checked) => setEnabled(checked)}
 * />
 * ```
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      id,
      checked,
      defaultChecked = false,
      onChange,
      label,
      labelPosition = 'end',
      size = 'md',
      disabled = false,
      error,
      helperText,
      name,
      value = 'on',
      className = '',
      onClick,
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || `switch-${generatedId}`;
    const labelId = `${switchId}-label`;
    const errorId = error ? `${switchId}-error` : undefined;
    const helperId = helperText ? `${switchId}-helper` : undefined;

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const toggle = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const nextChecked = !isChecked;
        if (!isControlled) {
          setInternalChecked(nextChecked);
        }
        onChange?.(nextChecked, event);
      },
      [disabled, isChecked, isControlled, onChange]
    );

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        toggle(event);
        onClick?.(event);
      },
      [toggle, onClick]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const activationHandler = createActivationHandler((e) => {
          toggle(e as unknown as React.KeyboardEvent<HTMLButtonElement>);
        });
        activationHandler(event);
        onKeyDown?.(event);
      },
      [toggle, onKeyDown]
    );

    const describedBy = combineAriaDescribedBy(ariaDescribedBy, errorId, helperId);

    const switchClasses = [
      'a11y-switch',
      `a11y-switch--${size}`,
      isChecked && 'a11y-switch--checked',
      disabled && 'a11y-switch--disabled',
      error && 'a11y-switch--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      'a11y-switch-container',
      `a11y-switch-container--label-${labelPosition}`,
      disabled && 'a11y-switch-container--disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const switchButton = (
      <button
        ref={ref}
        type="button"
        role="switch"
        id={switchId}
        className={switchClasses}
        aria-checked={isChecked}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-labelledby={!ariaLabel && !ariaLabelledBy && label ? labelId : ariaLabelledBy}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="a11y-switch-thumb" aria-hidden="true" />
      </button>
    );

    const renderedLabel = label ? (
      <label id={labelId} htmlFor={switchId} className="a11y-switch-label">
        {label}
        {props['aria-required'] && (
          <span className="a11y-switch-label__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
    ) : null;

    return (
      <div className="a11y-switch-wrapper">
        <div className={containerClasses}>
          {labelPosition === 'start' && renderedLabel}
          {switchButton}
          {labelPosition === 'end' && renderedLabel}
        </div>

        {error && (
          <div id={errorId} className="a11y-switch-error" role="alert">
            {error}
          </div>
        )}

        {helperText && (
          <div id={helperId} className="a11y-switch-helper">
            {helperText}
          </div>
        )}

        {name && (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={isChecked}
            tabIndex={-1}
            aria-hidden="true"
            readOnly
            className="a11y-switch-hidden-input"
          />
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
