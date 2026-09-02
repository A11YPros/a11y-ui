import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-switch&gt; Web Component
 *
 * Framework-agnostic custom switch implementing WAI-ARIA switch pattern with
 * roving tabindex, keyboard toggle (Space/Enter), and visible focus rings.
 */
const meta: Meta = {
  title: 'Web Components/Switch',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text for the switch' },
    checked: { control: 'boolean', description: 'Whether the switch is on' },
    disabled: { control: 'boolean', description: 'Whether the switch is disabled' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    helperText: { control: 'text', description: 'Helper text beneath switch' },
    error: { control: 'text', description: 'Error message for switch' },
  },
  args: {
    label: 'Enable Notifications',
    checked: false,
    disabled: false,
    size: 'md',
    helperText: 'Receive real-time accessibility updates',
    error: '',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <a11y-switch
      label={args.label}
      checked={args.checked ? true : undefined}
      disabled={args.disabled ? true : undefined}
      size={args.size}
      helper-text={args.helperText || undefined}
      error={args.error || undefined}
    ></a11y-switch>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <a11y-switch label="Small Switch" size="sm"></a11y-switch>
      <a11y-switch label="Medium Switch" size="md" checked></a11y-switch>
      <a11y-switch label="Large Switch" size="lg" checked></a11y-switch>
    </div>
  ),
};

export const States: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <a11y-switch label="Disabled On" checked disabled></a11y-switch>
      <a11y-switch label="Disabled Off" disabled></a11y-switch>
      <a11y-switch label="Switch with Error" error="This setting is required"></a11y-switch>
    </div>
  ),
};
