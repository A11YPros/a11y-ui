import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-radio&gt; Web Component
 *
 * Accessible radio button with arrow-key keyboard roving focus navigation within
 * matching name groups, custom high-contrast styling, and screen reader announcements.
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Semantic `<input type="radio">` with linked `<label>`
 * - 2.1.1 Keyboard: Arrow keys (Up/Down/Left/Right) navigate and cycle selection
 * - 4.1.2 Name, Role, Value: Native radio role and checked states
 */
const meta: Meta = {
  title: 'Web Components/Form/Radio',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Accessible label text' },
    name: { control: 'text', description: 'Radio group name' },
    value: { control: 'text', description: 'Form submission value' },
    checked: { control: 'boolean', description: 'Whether radio is checked' },
    disabled: { control: 'boolean', description: 'Whether radio is disabled' },
  },
  args: {
    label: 'Standard Option',
    name: 'demo-radio',
    value: 'opt1',
    checked: false,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <a11y-radio
      name={args.name}
      value={args.value}
      label={args.label}
      checked={args.checked ? '' : undefined}
      disabled={args.disabled ? '' : undefined}
    ></a11y-radio>
  ),
};

export const RadioGroup: StoryObj = {
  name: 'Radio Button Group',
  render: () => (
    <a11y-fieldset legend="Select your preferred notification channel">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
        <a11y-radio
          name="notifications"
          value="all"
          label="All notifications (Email, SMS, Push)"
          checked
        ></a11y-radio>
        <a11y-radio
          name="notifications"
          value="important"
          label="Important security alerts only"
        ></a11y-radio>
        <a11y-radio
          name="notifications"
          value="none"
          label="Mute all non-critical notifications"
        ></a11y-radio>
      </div>
    </a11y-fieldset>
  ),
};

export const HorizontalGroup: StoryObj = {
  name: 'Horizontal Theme Switcher',
  render: () => (
    <a11y-fieldset legend="Application Theme">
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
        <a11y-radio name="theme" value="system" label="System Default" checked></a11y-radio>
        <a11y-radio name="theme" value="light" label="Light"></a11y-radio>
        <a11y-radio name="theme" value="dark" label="Dark"></a11y-radio>
      </div>
    </a11y-fieldset>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <a11y-radio
        name="locked"
        value="free"
        label="Community Tier (Active)"
        checked
        disabled
      ></a11y-radio>
      <a11y-radio
        name="locked"
        value="pro"
        label="Enterprise Tier (Upgrade required)"
        disabled
      ></a11y-radio>
    </div>
  ),
};
