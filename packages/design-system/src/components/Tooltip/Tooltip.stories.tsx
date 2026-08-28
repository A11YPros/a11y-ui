import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

/**
 * # Tooltip Component
 *
 * An accessible tooltip component complying with WCAG 2.1/2.2 AA standards,
 * specifically **WCAG 1.4.13 (Content on Hover or Focus)**:
 *
 * - **Dismissible**: Pressing <kbd>Escape</kbd> immediately dismisses the tooltip without moving pointer or focus.
 * - **Hoverable**: Moving the pointer from the trigger into the tooltip content keeps it open.
 * - **Persistent**: Remains visible until unhovered, blurred, or dismissed via <kbd>Escape</kbd>.
 * - **Zero Third-Party Dependencies**: Built entirely with native React and modern CSS.
 *
 * ## Usage
 *
 * ```tsx
 * import { Tooltip, Button } from '@a11ypros/a11y-ui-components';
 *
 * // 1. Wrapping an interactive element
 * <Tooltip content="Permanently remove this file" placement="top">
 *   <Button variant="danger">Delete</Button>
 * </Tooltip>
 *
 * // 2. Free-standing help/info icon
 * <Tooltip
 *   defaultIcon="help"
 *   label="CVV explanation"
 *   content="3-digit security code on the back of your card"
 *   placement="right"
 * />
 *
 * // 3. Wrapping non-interactive text with dashed underline
 * <Tooltip content="Calculated based on your shipping address" placement="top">
 *   Estimated Tax
 * </Tooltip>
 * ```
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    placement: 'top',
    content: 'This is the tooltip content explaining the feature.',
    defaultIcon: 'info',
    label: 'Information',
    isSmall: false,
    showDashedUnderline: true,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
      ],
      description: 'Placement of tooltip relative to trigger',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    defaultIcon: {
      control: 'select',
      options: ['help', 'info', undefined],
      description: 'Default built-in icon trigger',
    },
    isSmall: {
      control: 'boolean',
      description: 'Compact tooltip size with reduced padding',
    },
    showDashedUnderline: {
      control: 'boolean',
      description: 'Shows dashed underline on non-interactive text triggers',
    },
    contentHeading: {
      control: 'text',
      description: 'Optional bold heading above tooltip body text',
    },
    content: {
      control: 'text',
      description: 'Content displayed inside tooltip',
    },
    label: {
      control: 'text',
      description: 'Accessible label for icon-only triggers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Primary story with live interactive controls.
 * Adjust `placement`, `isSmall`, `content`, etc. in the Storybook controls table below.
 */
export const Default: Story = {
  args: {
    placement: 'top',
    defaultIcon: 'help',
    label: 'Help: Password format',
    content: 'Passwords must be at least 12 characters and contain a number and symbol.',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '260px',
        padding: '5rem',
      }}
    >
      <Tooltip {...args} />
    </div>
  ),
};

export const DefaultIcons: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '4rem',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        padding: '4rem',
      }}
    >
      <Tooltip
        {...args}
        defaultIcon="help"
        label="Help: Password format"
        content="Passwords must be at least 12 characters and contain a number and symbol."
      />
      <Tooltip
        {...args}
        defaultIcon="info"
        label="Info: Data privacy"
        content="Your data is encrypted in transit and at rest using AES-256."
      />
    </div>
  ),
};

export const WrappingFocusableElement: Story = {
  args: {
    placement: 'top',
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Tooltip {...args} content="Print current report as PDF">
        <Button variant="secondary">Print Report</Button>
      </Tooltip>
    </div>
  ),
};

export const WrappingNonFocusableElement: Story = {
  args: {
    placement: 'top',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '4rem',
        fontSize: '1rem',
        color: '#171717',
      }}
    >
      Total Due:{' '}
      <Tooltip
        {...args}
        content="Includes applicable state sales tax and courier delivery surcharge."
      >
        <span>$142.50*</span>
      </Tooltip>
    </div>
  ),
};

export const WithHeading: Story = {
  args: {
    placement: 'right',
    contentHeading: 'Session Security',
    content: 'For your security, inactive sessions expire after 15 minutes of inactivity.',
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Tooltip {...args} defaultIcon="info" label="Session expiration info" />
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '4rem',
        padding: '5rem 8rem',
        maxWidth: '550px',
        margin: '0 auto',
      }}
    >
      <Tooltip content="Top placement tooltip" placement="top">
        <Button variant="ghost">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom placement tooltip" placement="bottom">
        <Button variant="ghost">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left placement tooltip" placement="left">
        <Button variant="ghost">Left</Button>
      </Tooltip>
      <Tooltip content="Right placement tooltip" placement="right">
        <Button variant="ghost">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const EdgeAutoClamping: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4rem 1rem',
        border: '1px dashed #ccc',
        borderRadius: '8px',
      }}
    >
      <Tooltip
        defaultIcon="help"
        label="Left edge helper"
        content="Clamped at left edge to avoid being cut off off-screen!"
        placement="top"
      />
      <Tooltip
        defaultIcon="info"
        label="Right edge info"
        content="Clamped at right edge to stay completely visible!"
        placement="top"
      />
    </div>
  ),
};

export const Small: Story = {
  args: {
    isSmall: true,
    placement: 'right',
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Tooltip {...args} content="Compact 0.75rem copy" defaultIcon="help" label="Quick helper" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '4rem',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="sm" onClick={() => setOpen((prev) => !prev)}>
            Toggle Tooltip ({open ? 'Open' : 'Closed'})
          </Button>
          <Tooltip
            open={open}
            onOpenChange={setOpen}
            content="Controlled tooltip state managed externally"
            placement="right"
          >
            <span>Target Element</span>
          </Tooltip>
        </div>
      </div>
    );
  },
};
