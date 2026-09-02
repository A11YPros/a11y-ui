import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-link&gt; Web Component
 *
 * Accessible hyperlinks with high-contrast underlines, external link indicators,
 * and security attributes (`rel="noopener noreferrer"`).
 */
const meta: Meta = {
  title: 'Web Components/Link',
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text', description: 'Destination URL' },
    external: { control: 'boolean', description: 'Whether the link opens an external site' },
    variant: { control: 'select', options: ['default', 'subtle'] },
  },
  args: {
    href: 'https://ui.a11ypros.com',
    external: false,
    variant: 'default',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <p>
      Visit our documentation at{' '}
      <a11y-link
        href={args.href}
        external={args.external ? true : undefined}
        variant={args.variant}
      >
        A11YPros Components
      </a11y-link>
      .
    </p>
  ),
};

export const ExternalLink: StoryObj = {
  render: () => (
    <p>
      Read the official W3C specifications on{' '}
      <a11y-link href="https://www.w3.org/WAI/ARIA/apg/" external>
        W3C WAI-ARIA Authoring Practices Guide
      </a11y-link>
      .
    </p>
  ),
};
