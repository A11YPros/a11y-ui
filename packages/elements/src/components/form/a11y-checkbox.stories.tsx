import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-checkbox&gt; Web Component
 *
 * Accessible checkbox control with support for checked, unchecked, indeterminate,
 * disabled, and error states with keyboard navigation and screen reader parity.
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Semantic `<input type="checkbox">` and `<label>`
 * - 4.1.2 Name, Role, Value: `aria-checked="true|false|mixed"`, `aria-invalid`
 * - 2.1.1 Keyboard: Accessible via Space key toggling and Tab navigation
 */
const meta: Meta = {
  title: 'Web Components/Form/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text for the checkbox' },
    checked: { control: 'boolean', description: 'Checked state' },
    indeterminate: { control: 'boolean', description: 'Indeterminate tri-state' },
    helperText: { control: 'text', description: 'Descriptive helper text' },
    error: { control: 'text', description: 'Validation error message' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
  args: {
    label: 'Subscribe to newsletter updates',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <a11y-checkbox
      label={args.label}
      checked={args.checked ? '' : undefined}
      indeterminate={args.indeterminate ? '' : undefined}
      helper-text={args.helperText}
      error={args.error}
      disabled={args.disabled ? '' : undefined}
    ></a11y-checkbox>
  ),
};

export const Checked: StoryObj = {
  render: () => (
    <a11y-checkbox
      label="I agree to the Terms of Service and Privacy Policy"
      checked
    ></a11y-checkbox>
  ),
};

export const Indeterminate: StoryObj = {
  render: () => (
    <a11y-checkbox
      label="Select all sub-tasks (3 of 7 completed)"
      indeterminate
    ></a11y-checkbox>
  ),
};

export const WithError: StoryObj = {
  name: 'With Error',
  render: () => (
    <a11y-checkbox
      label="I confirm I am at least 18 years of age"
      error="You must verify your age before proceeding"
    ></a11y-checkbox>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <a11y-checkbox
        label="Disabled unchecked option"
        disabled
      ></a11y-checkbox>
      <a11y-checkbox
        label="Disabled checked option"
        checked
        disabled
      ></a11y-checkbox>
    </div>
  ),
};
