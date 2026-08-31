import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Menubar } from './Menubar';
import { Menu, MenuItem, MenuDivider, MenuGroup } from '../Menu/Menu';

/**
 * # Menubar Component
 *
 * An accessible desktop-style application menu bar following the **WAI-ARIA Menubar Pattern**,
 * modeled after [Base UI Menubar](https://base-ui.com/react/components/menubar):
 *
 * - **Single Tab Stop**: The menubar acts as a single tab stop with roving `tabIndex`.
 * - **Arrow Key Cycling**:
 *   - <kbd>→</kbd> / <kbd>←</kbd>: Cycle through top-level menu triggers (with loop-around).
 *   - <kbd>↓</kbd> / <kbd>Enter</kbd> / <kbd>Space</kbd>: Open active menu and focus first item.
 *   - <kbd>↑</kbd>: Open active menu and focus last item.
 * - **Inter-Menu Navigation**:
 *   - While any menu dropdown is open, pressing <kbd>→</kbd> or <kbd>←</kbd> immediately
 *     closes the current menu, opens the adjacent menu, and focuses its first item!
 * - **Mouse Hover Switching**:
 *   - When a menu is open, hovering the pointer over any other menubar trigger opens it.
 * - **Focus Order & Escape Dismissal**:
 *   - Pressing <kbd>Escape</kbd> closes the dropdown and returns focus to the menubar trigger.
 * - **Zero Third-Party Dependencies**: Pure React context, native DOM event handling, and CSS.
 */
const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the menubar',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible label for the menubar container',
      table: {
        defaultValue: { summary: 'Application menu' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  args: {
    label: 'Application menu',
    orientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ padding: '2rem 4rem 16rem 4rem' }}>
      <Menubar {...args}>
        <Menu id="file-menu" trigger={<button type="button">File</button>}>
          <MenuItem shortcut="⌘N" onClick={() => alert('New File')}>
            New File
          </MenuItem>
          <MenuItem shortcut="⌘O" onClick={() => alert('Open...')}>
            Open...
          </MenuItem>
          <MenuItem shortcut="⌘S" onClick={() => alert('Save')}>
            Save
          </MenuItem>
          <MenuDivider />
          <MenuItem danger shortcut="⌘Q" onClick={() => alert('Quit')}>
            Quit Application
          </MenuItem>
        </Menu>

        <Menu id="edit-menu" trigger={<button type="button">Edit</button>}>
          <MenuItem shortcut="⌘Z" onClick={() => console.log('Undo')}>
            Undo
          </MenuItem>
          <MenuItem shortcut="⇧⌘Z" onClick={() => console.log('Redo')}>
            Redo
          </MenuItem>
          <MenuDivider />
          <MenuItem shortcut="⌘X" onClick={() => console.log('Cut')}>
            Cut
          </MenuItem>
          <MenuItem shortcut="⌘C" onClick={() => console.log('Copy')}>
            Copy
          </MenuItem>
          <MenuItem shortcut="⌘V" onClick={() => console.log('Paste')}>
            Paste
          </MenuItem>
        </Menu>

        <Menu id="view-menu" trigger={<button type="button">View</button>}>
          <MenuItem shortcut="⌘+" onClick={() => console.log('Zoom In')}>
            Zoom In
          </MenuItem>
          <MenuItem shortcut="⌘-" onClick={() => console.log('Zoom Out')}>
            Zoom Out
          </MenuItem>
          <MenuItem shortcut="⌘0" onClick={() => console.log('Actual Size')}>
            Actual Size
          </MenuItem>
          <MenuDivider />
          <MenuItem shortcut="⌃⌘F" onClick={() => console.log('Toggle Fullscreen')}>
            Toggle Full Screen
          </MenuItem>
        </Menu>

        <Menu id="help-menu" trigger={<button type="button">Help</button>}>
          <MenuItem href="/getting-started">Documentation</MenuItem>
          <MenuItem onClick={() => alert('Accessible UI Components v2.2.2')}>
            About A11y UI
          </MenuItem>
        </Menu>
      </Menubar>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ padding: '2rem 4rem 16rem 4rem' }}>
      <Menubar label="Editor actions">
        <Menu trigger={<button type="button">Project</button>}>
          <MenuItem
            icon={
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            }
            shortcut="⌘P"
            onClick={() => console.log('Open Project')}
          >
            Open Project...
          </MenuItem>
          <MenuItem
            icon={
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            shortcut="⌘E"
            onClick={() => console.log('Export')}
          >
            Export Archive
          </MenuItem>
        </Menu>

        <Menu trigger={<button type="button">Preferences</button>}>
          <MenuGroup label="Appearance">
            <MenuItem onClick={() => console.log('Theme')}>Color Theme...</MenuItem>
            <MenuItem onClick={() => console.log('Font')}>Font Settings</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup label="Shortcuts">
            <MenuItem onClick={() => console.log('Keybindings')}>Keyboard Shortcuts</MenuItem>
          </MenuGroup>
        </Menu>
      </Menubar>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ padding: '2rem 4rem 16rem 4rem', display: 'flex', gap: '2rem' }}>
      <Menubar orientation="vertical" label="Sidebar actions">
        <Menu placement="bottom-start" trigger={<button type="button">Workspace</button>}>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Members</MenuItem>
        </Menu>
        <Menu placement="bottom-start" trigger={<button type="button">Billing</button>}>
          <MenuItem>Plans</MenuItem>
          <MenuItem>Invoices</MenuItem>
        </Menu>
      </Menubar>
    </div>
  ),
};
