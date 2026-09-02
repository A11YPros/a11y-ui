import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-menubar&gt; Web Component
 *
 * Full application menubar implementing the W3C APG Menubar pattern with Left/Right
 * arrow keys traversing top-level menus and Up/Down arrow keys traversing submenus.
 */
const meta: Meta = {
  title: 'Web Components/Menubar',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ height: '320px', padding: '1rem' }}>
      <a11y-menubar aria-label="Application Menu">
        <a11y-menu label="File">
          <a11y-menu-item id="new-doc" shortcut="⌘N">
            New Document
          </a11y-menu-item>
          <a11y-menu-item id="open-doc" shortcut="⌘O">
            Open...
          </a11y-menu-item>
          <a11y-menu-divider></a11y-menu-divider>
          <a11y-menu-item id="save-doc" shortcut="⌘S">
            Save
          </a11y-menu-item>
        </a11y-menu>

        <a11y-menu label="Edit">
          <a11y-menu-item id="undo" shortcut="⌘Z">
            Undo
          </a11y-menu-item>
          <a11y-menu-item id="redo" shortcut="⇧⌘Z">
            Redo
          </a11y-menu-item>
          <a11y-menu-divider></a11y-menu-divider>
          <a11y-menu-item id="cut" shortcut="⌘X">
            Cut
          </a11y-menu-item>
          <a11y-menu-item id="copy" shortcut="⌘C">
            Copy
          </a11y-menu-item>
          <a11y-menu-item id="paste" shortcut="⌘V">
            Paste
          </a11y-menu-item>
        </a11y-menu>

        <a11y-menu label="View">
          <a11y-menu-item id="zoom-in" shortcut="⌘+">
            Zoom In
          </a11y-menu-item>
          <a11y-menu-item id="zoom-out" shortcut="⌘-">
            Zoom Out
          </a11y-menu-item>
          <a11y-menu-divider></a11y-menu-divider>
          <a11y-menu-item id="fullscreen" shortcut="F11">
            Toggle Fullscreen
          </a11y-menu-item>
        </a11y-menu>
      </a11y-menubar>
    </div>
  ),
};
