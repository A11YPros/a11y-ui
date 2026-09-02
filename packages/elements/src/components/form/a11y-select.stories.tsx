import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-select&gt; Web Component
 *
 * Accessible native dropdown selector with custom styling, keyboard navigation,
 * helper text, and accessible error states.
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Label explicitly linked to select
 * - 4.1.2 Name, Role, Value: `aria-required`, `aria-invalid`, `aria-describedby`
 */
const meta: Meta = {
  title: 'Web Components/Form/Select',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Accessible label text' },
    helperText: { control: 'text', description: 'Helper text below select' },
    error: { control: 'text', description: 'Validation error message' },
    required: { control: 'boolean', description: 'Whether field is required' },
    disabled: { control: 'boolean', description: 'Whether field is disabled' },
  },
  args: {
    label: 'Preferred Contact Method',
    required: false,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ maxWidth: '360px' }}>
      <a11y-select
        label={args.label}
        helper-text={args.helperText}
        error={args.error}
        required={args.required ? '' : undefined}
        disabled={args.disabled ? '' : undefined}
      >
        <option value="">Select an option...</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="sms">SMS / Text</option>
      </a11y-select>
    </div>
  ),
};

export const WithHelperText: StoryObj = {
  name: 'With Helper Text',
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <a11y-select
        label="Account Role"
        helper-text="Determines permissions across the workspace"
        required
      >
        <option value="">Select your role...</option>
        <option value="admin">Administrator</option>
        <option value="member">Team Member</option>
        <option value="viewer">Viewer Only</option>
      </a11y-select>
    </div>
  ),
};

export const WithError: StoryObj = {
  name: 'With Error',
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <a11y-select
        label="Country / Region"
        error="Please select your country to continue"
        required
      >
        <option value="">Choose country...</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </a11y-select>
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <a11y-select label="Organization Type" disabled>
        <option value="enterprise">Enterprise (Locked)</option>
      </a11y-select>
    </div>
  ),
};
