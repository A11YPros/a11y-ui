import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # &lt;a11y-accordion&gt; Web Component
 *
 * Accessible accordion built with native HTML5 &lt;details&gt; and &lt;summary&gt;
 * with keyboard interaction, chevron rotation, and single or multi-expand coordination.
 */
const meta: Meta = {
  title: 'Web Components/Accordion',
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple accordion sections to be expanded simultaneously',
    },
  },
  args: {
    allowMultiple: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <a11y-accordion allow-multiple={args.allowMultiple ? 'true' : 'false'}>
        <a11y-accordion-item title="What is WCAG AA conformance?" open>
          <p>
            WCAG 2.1/2.2 AA requires minimum 4.5:1 text contrast, complete keyboard accessibility,
            focus management, and screen reader announcements.
          </p>
        </a11y-accordion-item>
        <a11y-accordion-item title="Why use Light DOM for Web Components?">
          <p>
            Light DOM avoids shadow boundary encapsulation pitfalls, ensuring ARIA ID references
            (such as aria-labelledby and aria-describedby) function reliably across elements.
          </p>
        </a11y-accordion-item>
        <a11y-accordion-item title="Is this compatible across frameworks?">
          <p>
            Yes! Native Custom Elements can be rendered in React, Vue, Svelte, Angular, or static
            HTML without wrappers.
          </p>
        </a11y-accordion-item>
      </a11y-accordion>
    </div>
  ),
};

export const AllowMultiple: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <a11y-accordion allow-multiple="true">
        <a11y-accordion-item title="Section One" open>
          <p>This accordion allows multiple sections to remain open simultaneously.</p>
        </a11y-accordion-item>
        <a11y-accordion-item title="Section Two" open>
          <p>Both sections are open at the same time.</p>
        </a11y-accordion-item>
        <a11y-accordion-item title="Section Three">
          <p>Click or press Enter/Space on the header to toggle.</p>
        </a11y-accordion-item>
      </a11y-accordion>
    </div>
  ),
};
