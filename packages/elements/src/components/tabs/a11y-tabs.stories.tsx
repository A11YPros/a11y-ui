import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-tabs&gt; Web Component
 *
 * Fully accessible WAI-ARIA tab pattern with roving tabindex, arrow key navigation
 * (Left/Right, Home/End), and associated tab panels.
 */
const meta: Meta = {
  title: 'Web Components/Tabs',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <a11y-tabs default-tab="react">
        <a11y-tab-panel id="react" label="React">
          <p>
            React components offer rich TypeScript integration, custom hooks, and state management
            built for React applications.
          </p>
        </a11y-tab-panel>
        <a11y-tab-panel id="wc" label="Web Components">
          <p>
            Web Components are built as native Custom Elements in standard Light DOM, working
            flawlessly in Vue, Svelte, Angular, or vanilla JavaScript.
          </p>
        </a11y-tab-panel>
        <a11y-tab-panel id="html" label="HTML5 Semantics">
          <p>
            Standard HTML elements provide maximum fallback compatibility and zero runtime
            overhead.
          </p>
        </a11y-tab-panel>
      </a11y-tabs>
    </div>
  ),
};
