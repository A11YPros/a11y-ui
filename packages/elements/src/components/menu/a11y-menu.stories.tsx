import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-menu&gt; Web Component
 *
 * Accessible dropdown menu adhering to W3C APG menu button pattern with keyboard navigation
 * (Up/Down arrow, Home/End, Escape, Typeahead search, Enter/Space activation).
 */
const meta: Meta = {
  title: 'Web Components/Menu',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ height: '240px', padding: '1rem' }}>
      <a11y-menu label="Actions">
        <a11y-menu-item id="edit">Edit Item</a11y-menu-item>
        <a11y-menu-item id="duplicate">Duplicate</a11y-menu-item>
        <a11y-menu-divider></a11y-menu-divider>
        <a11y-menu-item id="archive">Archive</a11y-menu-item>
        <a11y-menu-item id="delete" variant="danger">
          Delete
        </a11y-menu-item>
      </a11y-menu>
    </div>
  ),
};

export const WithShortcuts: StoryObj = {
  render: () => (
    <div style={{ height: '260px', padding: '1rem' }}>
      <a11y-menu label="File Options">
        <a11y-menu-item id="new" shortcut="⌘N">
          New File
        </a11y-menu-item>
        <a11y-menu-item id="open" shortcut="⌘O">
          Open...
        </a11y-menu-item>
        <a11y-menu-item id="save" shortcut="⌘S">
          Save
        </a11y-menu-item>
        <a11y-menu-divider></a11y-menu-divider>
        <a11y-menu-item id="close" shortcut="⌘W">
          Close Window
        </a11y-menu-item>
      </a11y-menu>
    </div>
  ),
};
