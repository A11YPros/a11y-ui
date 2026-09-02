import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-textarea&gt; Web Component
 *
 * Accessible multi-line text input with character counting, validation errors,
 * and live region character count announcements.
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Label associated with textarea
 * - 4.1.2 Name, Role, Value: `aria-required`, `aria-invalid`, `aria-describedby`
 * - 4.1.3 Status Messages: Character counter and error messages announced
 */
const meta: Meta = {
  title: 'Web Components/Form/Textarea',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Accessible label text' },
    placeholder: { control: 'text', description: 'Placeholder hint' },
    helperText: { control: 'text', description: 'Helper guidance below field' },
    error: { control: 'text', description: 'Validation error message' },
    maxLength: { control: 'number', description: 'Maximum character limit' },
    showCount: { control: 'boolean', description: 'Display character count' },
    rows: { control: 'number', description: 'Visible text rows' },
    required: { control: 'boolean', description: 'Whether field is required' },
    disabled: { control: 'boolean', description: 'Whether field is disabled' },
  },
  args: {
    label: 'Feedback or Comments',
    placeholder: 'Share your thoughts here...',
    rows: 4,
    required: false,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-textarea
        label={args.label}
        placeholder={args.placeholder}
        rows={args.rows}
        helper-text={args.helperText}
        error={args.error}
        max-length={args.maxLength}
        show-count={args.showCount ? '' : undefined}
        required={args.required ? '' : undefined}
        disabled={args.disabled ? '' : undefined}
      ></a11y-textarea>
    </div>
  ),
};

export const WithCharacterCounter: StoryObj = {
  name: 'With Character Counter',
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-textarea
        label="Project Summary"
        placeholder="Brief description of the issue..."
        rows={4}
        max-length={200}
        show-count
        helper-text="Keep summary concise (max 200 characters)"
      ></a11y-textarea>
    </div>
  ),
};

export const WithError: StoryObj = {
  name: 'With Error',
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-textarea
        label="Reason for return"
        rows={3}
        value="Bad"
        error="Please provide a detailed explanation of at least 20 characters."
      ></a11y-textarea>
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-textarea
        label="Archived Notes"
        value="These notes are read-only and cannot be modified."
        rows={3}
        disabled
      ></a11y-textarea>
    </div>
  ),
};
