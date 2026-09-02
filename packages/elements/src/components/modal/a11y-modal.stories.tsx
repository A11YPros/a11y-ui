import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-modal&gt; Web Component
 *
 * Accessible modal dialog powered by HTML5 &lt;dialog&gt; element, featuring
 * modal focus trapping, Escape key handling, and automatic focus return.
 */
const meta: Meta = {
  title: 'Web Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Dialog heading title' },
  },
  args: {
    title: 'Confirm Account Action',
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => {
    const handleOpen = () => {
      const modal = document.getElementById('storybook-modal') as any;
      modal?.showModal();
    };

    const handleClose = () => {
      const modal = document.getElementById('storybook-modal') as any;
      modal?.close();
    };

    return (
      <div>
        <a11y-button variant="primary" onClick={handleOpen}>
          Open Modal Dialog
        </a11y-button>

        <a11y-modal id="storybook-modal" title={args.title}>
          <p>
            This modal dialog uses the native HTML5 <code>&lt;dialog&gt;</code> element. Focus is
            trapped inside while open, background content is made inert, and pressing Escape or
            clicking outside will dismiss the dialog.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
              marginTop: '1.5rem',
            }}
          >
            <a11y-button variant="ghost" onClick={handleClose}>
              Cancel
            </a11y-button>
            <a11y-button variant="primary" onClick={handleClose}>
              Confirm
            </a11y-button>
          </div>
        </a11y-modal>
      </div>
    );
  },
};
