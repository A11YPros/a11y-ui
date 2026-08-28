import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch } from './Switch';

/**
 * # Switch Component
 *
 * An accessible toggle switch component following the WAI-ARIA Switch Pattern.
 * Provides binary on/off control for immediate actions and settings, supporting
 * keyboard navigation, screen reader announcements, and design tokens.
 *
 * ## Usage
 *
 * ```tsx
 * import { Switch } from '@a11ypros/a11y-ui-components';
 *
 * function MyComponent() {
 *   const [enabled, setEnabled] = useState(false);
 *
 *   return (
 *     <Switch
 *       id="notifications"
 *       label="Enable email notifications"
 *       checked={enabled}
 *       onChange={(checked) => setEnabled(checked)}
 *     />
 *   );
 * }
 * ```
 *
 * ## Accessibility
 *
 * ### WCAG 2.1/2.2 Compliance
 * - **1.3.1 Info and Relationships**: Proper label-switch association via `id` and `htmlFor`
 * - **1.4.1 Use of Color**: State is communicated by physical position, contrast, and color
 * - **1.4.3 & 1.4.11 Contrast**: 3:1 minimum contrast for user interface controls
 * - **2.1.1 Keyboard**: Space and Enter keys toggle the switch
 * - **2.4.7 Focus Visible**: Clear 2px focus ring with high-contrast fallback
 * - **2.5.8 Target Size**: Meets minimum interactive target size requirements
 * - **4.1.2 Name, Role, Value**: Uses `role="switch"` and `aria-checked`
 *
 * ### Keyboard Interactions
 * | Key | Action |
 * |-----|--------|
 * | **Tab** | Moves focus to the switch |
 * | **Shift+Tab** | Moves focus away from the switch |
 * | **Space** | Toggles the switch state |
 * | **Enter** | Toggles the switch state |
 */
const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch control',
    },
    labelPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of label relative to the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
    },
    label: {
      control: 'text',
      description: 'Visible label text',
    },
    helperText: {
      control: 'text',
      description: 'Supplementary helper text',
    },
    error: {
      control: 'text',
      description: 'Validation error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Airplane Mode',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Wi-Fi',
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Switch
          id="controlled-switch"
          label={`Push notifications are ${checked ? 'enabled' : 'disabled'}`}
          checked={checked}
          onChange={(newVal) => setChecked(newVal)}
        />
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#525252' }}>
          Current state: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Switch size="sm" label="Small switch" defaultChecked />
      <Switch size="md" label="Medium switch (default)" defaultChecked />
      <Switch size="lg" label="Large switch" defaultChecked />
    </div>
  ),
};

export const LabelPosition: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Switch label="Label on end (default)" labelPosition="end" defaultChecked />
      <Switch label="Label on start" labelPosition="start" defaultChecked />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Automatic updates',
    helperText: 'Download and install security updates automatically in the background',
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Required terms agreement',
    error: 'You must enable this setting to continue',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Switch label="Disabled off" disabled defaultChecked={false} />
      <Switch label="Disabled on" disabled defaultChecked={true} />
    </div>
  ),
};
