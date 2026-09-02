import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-button&gt; Web Component
 *
 * Framework-agnostic, accessible Custom Element implementing WAI-ARIA button patterns
 * with native focus management, visible focus rings, and live loading states.
 */
const meta: Meta = {
  title: 'Web Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size dimension',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expands the button to 100% width of its container',
    },
    label: {
      control: 'text',
      description: 'Button text content',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    label: 'Custom Element Button',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <a11y-button
      variant={args.variant}
      size={args.size}
      loading={args.loading ? true : undefined}
      disabled={args.disabled ? true : undefined}
      full-width={args.fullWidth ? true : undefined}
    >
      {args.label}
    </a11y-button>
  ),
};

export const Variants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <a11y-button variant="primary">Primary</a11y-button>
      <a11y-button variant="secondary">Secondary</a11y-button>
      <a11y-button variant="ghost">Ghost</a11y-button>
      <a11y-button variant="danger">Danger</a11y-button>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <a11y-button size="sm" variant="primary">Small (sm)</a11y-button>
      <a11y-button size="md" variant="primary">Medium (md)</a11y-button>
      <a11y-button size="lg" variant="primary">Large (lg)</a11y-button>
    </div>
  ),
};

export const States: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <a11y-button variant="primary" loading>Saving...</a11y-button>
      <a11y-button variant="secondary" disabled>Disabled Action</a11y-button>
    </div>
  ),
};
