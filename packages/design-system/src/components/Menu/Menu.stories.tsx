import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup } from './Menu';
import { Button } from '../Button/Button';

/**
 * # Dropdown / Action Menu Component
 *
 * An accessible dropdown action menu following the **WAI-ARIA Menu Button Pattern**:
 *
 * - **Trigger**: Buttons have `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`.
 * - **Menu Container**: `role="menu"` with `aria-labelledby`.
 * - **Menu Items**: `role="menuitem"`, supporting click handlers, links, icons, shortcuts, and disabled states.
 * - **Keyboard Navigation**:
 *   - <kbd>Down Arrow</kbd> / <kbd>Up Arrow</kbd>: Navigate items with loop-around and disabled item skipping.
 *   - <kbd>Home</kbd> / <kbd>End</kbd>: Jump to first / last item.
 *   - <kbd>Enter</kbd> / <kbd>Space</kbd>: Trigger item action.
 *   - <kbd>Escape</kbd>: Close menu and **restore focus to trigger**.
 *   - <kbd>Tab</kbd>: Close menu and advance focus naturally.
 * - **Zero Third-Party Dependencies**: Built entirely with native React and modern CSS.
 */
const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Placement of dropdown relative to trigger',
      table: {
        defaultValue: { summary: 'bottom-start' },
      },
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Whether selecting an item automatically closes the menu',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    placement: 'bottom-start',
  },
  render: (args) => (
    <div style={{ padding: '2rem 4rem 12rem 4rem' }}>
      <Menu {...args} trigger={<Button variant="secondary">Actions ▾</Button>}>
        <MenuItem onClick={() => alert('Edit clicked')}>Edit Project</MenuItem>
        <MenuItem onClick={() => alert('Duplicate clicked')}>Duplicate</MenuItem>
        <MenuItem disabled onClick={() => alert('Archive clicked')}>
          Archive (Disabled)
        </MenuItem>
        <MenuDivider />
        <MenuItem danger onClick={() => alert('Delete clicked')}>
          Delete Project
        </MenuItem>
      </Menu>
    </div>
  ),
};

export const WithIconsAndShortcuts: Story = {
  render: (args) => (
    <div style={{ padding: '2rem 4rem 14rem 4rem' }}>
      <Menu {...args} trigger={<Button variant="primary">Manage File ▾</Button>}>
        <MenuItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          }
          shortcut="⌘E"
          onClick={() => console.log('Edit')}
        >
          Edit
        </MenuItem>
        <MenuItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
            </svg>
          }
          shortcut="⌘D"
          onClick={() => console.log('Duplicate')}
        >
          Duplicate
        </MenuItem>
        <MenuItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
          shortcut="⌘S"
          onClick={() => console.log('Export')}
        >
          Download Export
        </MenuItem>
        <MenuDivider />
        <MenuItem
          danger
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          }
          shortcut="⌘⌫"
          onClick={() => console.log('Delete')}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  ),
};

export const WithGroupsAndDividers: Story = {
  render: (args) => (
    <div style={{ padding: '2rem 4rem 18rem 4rem' }}>
      <Menu {...args} trigger={<Button variant="secondary">Account Options ▾</Button>}>
        <MenuGroup label="Navigation">
          <MenuItem href="/profile">View Profile</MenuItem>
          <MenuItem href="/settings">Account Settings</MenuItem>
          <MenuItem href="/billing">Subscription & Billing</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup label="Danger Zone">
          <MenuItem danger onClick={() => alert('Sign out')}>
            Sign Out
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
  ),
};

export const IconOnlyTrigger: Story = {
  render: (args) => (
    <div style={{ padding: '2rem 4rem 12rem 4rem' }}>
      <Menu
        {...args}
        label="Table row actions"
        trigger={
          <button
            type="button"
            aria-label="More row options"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid #d4d4d4',
              background: '#ffffff',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: 1,
            }}
          >
            ⋯
          </button>
        }
      >
        <MenuItem onClick={() => console.log('View')}>View Details</MenuItem>
        <MenuItem onClick={() => console.log('Edit')}>Edit Record</MenuItem>
        <MenuDivider />
        <MenuItem danger onClick={() => console.log('Delete')}>
          Remove Row
        </MenuItem>
      </Menu>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10rem 4rem',
        minHeight: '400px',
      }}
    >
      <Menu placement="bottom-start" trigger={<Button size="sm">Bottom Start ▾</Button>}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
      </Menu>

      <Menu placement="bottom-end" trigger={<Button size="sm">Bottom End ▾</Button>}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
      </Menu>

      <Menu placement="top-start" trigger={<Button size="sm">Top Start ▴</Button>}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
      </Menu>

      <Menu placement="top-end" trigger={<Button size="sm">Top End ▴</Button>}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
      </Menu>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          padding: '2rem 4rem 12rem 4rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <Button size="sm" onClick={() => setOpen((prev) => !prev)}>
          External Toggle ({open ? 'Open' : 'Closed'})
        </Button>
        <Menu
          isOpen={open}
          onOpenChange={setOpen}
          trigger={<Button variant="secondary">Controlled Menu ▾</Button>}
        >
          <MenuItem onClick={() => setOpen(false)}>First Action</MenuItem>
          <MenuItem onClick={() => setOpen(false)}>Second Action</MenuItem>
        </Menu>
      </div>
    );
  },
};
