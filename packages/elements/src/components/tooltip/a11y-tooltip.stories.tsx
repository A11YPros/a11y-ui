import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-tooltip&gt; Web Component
 *
 * Accessible tooltip providing descriptive context via `aria-describedby`,
 * triggering on hover and keyboard focus, and dismissible via the Escape key.
 */
const meta: Meta = {
  title: 'Web Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'Tooltip text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement position',
    },
    heading: { control: 'text', description: 'Optional bold heading' },
  },
  args: {
    content: 'Copies link to clipboard',
    position: 'top',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
      <a11y-tooltip
        content={args.content}
        placement={args.position}
        heading={args.heading}
      >
        <a11y-button variant="secondary">Hover or Focus Me</a11y-button>
      </a11y-tooltip>
    </div>
  ),
};

export const OpenByDefault: StoryObj = {
  name: 'Visible in Docs',
  render: () => (
    <div
      style={{
        padding: '3.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        flexWrap: 'wrap',
      }}
    >
      <a11y-tooltip content="Changes saved automatically" placement="top" open>
        <a11y-button variant="primary">Auto-save</a11y-button>
      </a11y-tooltip>
      <a11y-tooltip
        heading="Keyboard Shortcut"
        content="Press Cmd+K to search anytime"
        placement="bottom"
        open
      >
        <a11y-button variant="secondary">Search</a11y-button>
      </a11y-tooltip>
    </div>
  ),
};

export const Positions: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2.5rem',
        padding: '3.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <a11y-tooltip content="Top tooltip" placement="top" open>
        <a11y-button variant="secondary">Top</a11y-button>
      </a11y-tooltip>
      <a11y-tooltip content="Bottom tooltip" placement="bottom" open>
        <a11y-button variant="secondary">Bottom</a11y-button>
      </a11y-tooltip>
      <a11y-tooltip content="Left tooltip" placement="left" open>
        <a11y-button variant="secondary">Left</a11y-button>
      </a11y-tooltip>
      <a11y-tooltip content="Right tooltip" placement="right" open>
        <a11y-button variant="secondary">Right</a11y-button>
      </a11y-tooltip>
    </div>
  ),
};
