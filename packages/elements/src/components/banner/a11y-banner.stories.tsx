import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-banner&gt; Web Component
 *
 * Accessible alert / notification banner supporting informational, success, warning,
 * and error states with ARIA live regions and optional dismissal.
 */
const meta: Meta = {
  title: 'Web Components/Banner',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Banner notification variant',
    },
    title: { control: 'text', description: 'Banner title' },
    dismissible: { control: 'boolean', description: 'Whether the banner can be dismissed' },
  },
  args: {
    variant: 'info',
    title: 'Update Available',
    dismissible: true,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ maxWidth: '640px' }}>
      <a11y-banner
        variant={args.variant}
        title={args.title}
        dismissible={args.dismissible ? true : undefined}
      >
        A new version of the design system is now available for download.
      </a11y-banner>
    </div>
  ),
};

export const Variants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px' }}>
      <a11y-banner variant="info" title="Information">
        Standard informational message for users.
      </a11y-banner>
      <a11y-banner variant="success" title="Changes Saved">
        Your settings have been successfully updated.
      </a11y-banner>
      <a11y-banner variant="warning" title="Approaching Limit">
        Your account storage is at 90% capacity.
      </a11y-banner>
      <a11y-banner variant="error" title="Connection Error">
        Unable to communicate with the server. Please try again.
      </a11y-banner>
    </div>
  ),
};
