import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef } from 'react';

/**
 * # &lt;a11y-data-table&gt; Web Component
 *
 * Accessible, keyboard-navigable data table with sortable columns, row selection,
 * column headers with `aria-sort`, and live row announcements.
 *
 * Supports both:
 * 1. **Declarative HTML**: Native `<table>` child elements with `<thead>`, `<tbody>`, and `data-sortable`.
 * 2. **Programmatic Data**: Setting `.columns` and `.data` directly on the custom element instance.
 */
const meta: Meta = {
  title: 'Web Components/DataTable',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  name: 'Declarative HTML',
  render: () => (
    <div style={{ maxWidth: '750px' }}>
      <a11y-data-table caption="Accessible Component Inventory" selectable>
        <table>
          <thead>
            <tr>
              <th data-sortable>Component</th>
              <th data-sortable>Category</th>
              <th data-sortable>WCAG Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Button</td>
              <td>Core</td>
              <td>AAA</td>
              <td>Production</td>
            </tr>
            <tr>
              <td>Switch</td>
              <td>Form</td>
              <td>AA</td>
              <td>Production</td>
            </tr>
            <tr>
              <td>Modal</td>
              <td>Overlay</td>
              <td>AAA</td>
              <td>Production</td>
            </tr>
            <tr>
              <td>Accordion</td>
              <td>Disclosure</td>
              <td>AA</td>
              <td>Production</td>
            </tr>
            <tr>
              <td>DataTable</td>
              <td>Data</td>
              <td>AAA</td>
              <td>Production</td>
            </tr>
          </tbody>
        </table>
      </a11y-data-table>
    </div>
  ),
};

export const ProgrammaticData: StoryObj = {
  name: 'Programmatic (columns & data)',
  render: () => {
    const tableRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const table = tableRef.current as any;
      if (!table) return;

      table.columns = [
        { key: 'name', label: 'Component', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'wcag', label: 'WCAG Level', sortable: true },
        { key: 'status', label: 'Status' },
      ];

      table.data = [
        { id: '1', name: 'Button', category: 'Core', wcag: 'AAA', status: 'Production' },
        { id: '2', name: 'Switch', category: 'Form', wcag: 'AA', status: 'Production' },
        { id: '3', name: 'Modal', category: 'Overlay', wcag: 'AAA', status: 'Production' },
        { id: '4', name: 'Accordion', category: 'Disclosure', wcag: 'AA', status: 'Production' },
        { id: '5', name: 'DataTable', category: 'Data', wcag: 'AAA', status: 'Production' },
      ];
    }, []);

    return (
      <div style={{ maxWidth: '750px' }}>
        <a11y-data-table
          ref={tableRef}
          caption="Loaded via columns and data properties"
          selectable
        ></a11y-data-table>
      </div>
    );
  },
};
