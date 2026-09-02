import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-fieldset&gt; Web Component
 *
 * Semantic `<fieldset>` and `<legend>` container providing accessible grouping for
 * related form controls with optional required indicators, helper text, and validation errors.
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Groups related controls with a descriptive `<legend>`
 * - 4.1.2 Name, Role, Value: Required asterisk and helper text linked via description
 */
const meta: Meta = {
  title: 'Web Components/Form/Fieldset',
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text', description: 'Legend title describing the grouped controls' },
    helperText: { control: 'text', description: 'Guidance text below the legend' },
    error: { control: 'text', description: 'Group-level error message' },
    required: { control: 'boolean', description: 'Whether the group contains required fields' },
    disabled: { control: 'boolean', description: 'Whether all enclosed controls are disabled' },
  },
  args: {
    legend: 'Shipping Address',
    required: false,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-fieldset
        legend={args.legend}
        helper-text={args.helperText}
        error={args.error}
        required={args.required ? '' : undefined}
        disabled={args.disabled ? '' : undefined}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <a11y-input label="Street Address" placeholder="123 Main St"></a11y-input>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a11y-input label="City" style={{ flex: 2 }}></a11y-input>
            <a11y-input label="Postal Code" style={{ flex: 1 }}></a11y-input>
          </div>
        </div>
      </a11y-fieldset>
    </div>
  ),
};

export const WithRequiredFields: StoryObj = {
  name: 'With Required Fields',
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-fieldset
        legend="Account Credentials"
        required
        helper-text="All fields in this section are mandatory"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <a11y-input label="Username" required></a11y-input>
          <a11y-input label="Email Address" type="email" required></a11y-input>
          <a11y-input label="Password" type="password" required></a11y-input>
        </div>
      </a11y-fieldset>
    </div>
  ),
};

export const WithError: StoryObj = {
  name: 'With Error State',
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-fieldset
        legend="Payment Method"
        error="Please select at least one valid payment option"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          <a11y-radio name="pay" value="card" label="Credit / Debit Card"></a11y-radio>
          <a11y-radio name="pay" value="paypal" label="PayPal"></a11y-radio>
          <a11y-radio name="pay" value="crypto" label="Cryptocurrency (Unavailable)" disabled></a11y-radio>
        </div>
      </a11y-fieldset>
    </div>
  ),
};

export const DisabledGroup: StoryObj = {
  name: 'Disabled Fieldset',
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <a11y-fieldset
        legend="Billing Profile (Locked)"
        disabled
        helper-text="Contact an administrator to unlock billing details"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <a11y-input label="Company Name" value="Acme Corporation"></a11y-input>
          <a11y-input label="Tax ID" value="XX-XXXXXXX"></a11y-input>
        </div>
      </a11y-fieldset>
    </div>
  ),
};
