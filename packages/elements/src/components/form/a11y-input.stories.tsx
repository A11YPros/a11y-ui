import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-input&gt; Web Component
 *
 * Accessible text input with integrated label, helper text, and live error announcements.
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Semantic `<label>` associated via `for`/`id`
 * - 4.1.2 Name, Role, Value: `aria-required`, `aria-invalid`, `aria-describedby`
 * - 4.1.3 Status Messages: Validation errors announced via live region
 */
const meta: Meta = {
  title: 'Web Components/Form/Input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Accessible label text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
      description: 'Input type attribute',
    },
    placeholder: { control: 'text', description: 'Input placeholder hint' },
    helperText: { control: 'text', description: 'Guidance or description below input' },
    error: { control: 'text', description: 'Error message' },
    required: { control: 'boolean', description: 'Whether input is required' },
    disabled: { control: 'boolean', description: 'Whether input is disabled' },
  },
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    required: false,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <a11y-input
        label={args.label}
        type={args.type}
        placeholder={args.placeholder}
        helper-text={args.helperText}
        error={args.error}
        required={args.required ? '' : undefined}
        disabled={args.disabled ? '' : undefined}
      ></a11y-input>
    </div>
  ),
};

export const WithHelperText: StoryObj = {
  name: 'With Helper Text',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <a11y-input
        label="Password"
        type="password"
        helper-text="Must be at least 8 characters long"
      ></a11y-input>
    </div>
  ),
};

export const WithError: StoryObj = {
  name: 'With Error',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <a11y-input
        label="Email address"
        type="email"
        value="invalid-email"
        error="Please enter a valid email address"
      ></a11y-input>
    </div>
  ),
};

export const Required: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <a11y-input
        label="Full Name"
        placeholder="Alex Morgan"
        required
      ></a11y-input>
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <a11y-input
        label="Account ID"
        value="USR-89241"
        disabled
      ></a11y-input>
    </div>
  ),
};
