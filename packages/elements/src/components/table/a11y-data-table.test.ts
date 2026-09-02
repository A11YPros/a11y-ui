import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yDataTable, registerDataTable } from './a11y-data-table';

expect.extend(toHaveNoViolations);

describe('A11yDataTable (<a11y-data-table>)', () => {
  beforeEach(() => {
    registerDataTable();
    document.body.innerHTML = '';
  });

  it('renders table with caption, scopes, and CSS classes', () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.setAttribute('caption', 'Quarterly Revenue');
    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Quarter</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1</td>
            <td>$50,000</td>
          </tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(table);

    const caption = table.querySelector('.data-table-caption');
    expect(caption).not.toBeNull();
    expect(caption?.textContent).toBe('Quarterly Revenue');

    const ths = table.querySelectorAll('th');
    expect(ths[0].getAttribute('scope')).toBe('col');
    expect(ths[0].classList.contains('data-table-header')).toBe(true);

    const td = table.querySelector('td');
    expect(td?.classList.contains('data-table-cell')).toBe(true);
  });

  it('handles sortable columns and aria-sort attribute cycling', () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th data-sortable>Name</th>
          </tr>
        </thead>
      </table>
    `;
    document.body.appendChild(table);

    const th = table.querySelector('th') as HTMLTableCellElement;
    expect(th.getAttribute('aria-sort')).toBe('none');

    const sortBtn = th.querySelector('button') as HTMLButtonElement;
    expect(sortBtn).not.toBeNull();

    sortBtn.click();
    expect(th.getAttribute('aria-sort')).toBe('ascending');

    sortBtn.click();
    expect(th.getAttribute('aria-sort')).toBe('descending');
  });

  it('sorts tbody rows numerically and alphabetically when clicking sortable header', () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th data-sortable>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Charlie</td></tr>
          <tr><td>Alice</td></tr>
          <tr><td>Bob</td></tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(table);

    const sortBtn = table.querySelector('.data-table-sort-button') as HTMLButtonElement;
    // Ascending
    sortBtn.click();
    let rows = table.querySelectorAll('tbody tr td');
    expect(Array.from(rows).map((td) => td.textContent)).toEqual(['Alice', 'Bob', 'Charlie']);

    const indicator = table.querySelector('.data-table-sort-indicator');
    expect(indicator?.textContent).toBe(' ↑');

    // Descending
    sortBtn.click();
    rows = table.querySelectorAll('tbody tr td');
    expect(Array.from(rows).map((td) => td.textContent)).toEqual(['Charlie', 'Bob', 'Alice']);
    expect(indicator?.textContent).toBe(' ↓');
  });

  it('supports selectable rows with auto-injected checkboxes and selection events', () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.setAttribute('caption', 'Selectable Items');
    table.setAttribute('selectable', '');
    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
          </tr>
          <tr>
            <td>Item 2</td>
          </tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(table);

    const headerCheckbox = table.querySelector('.data-table-header--checkbox input') as HTMLInputElement;
    expect(headerCheckbox).not.toBeNull();
    expect(headerCheckbox.getAttribute('aria-label')).toBe('Select all rows');

    const rowCheckboxes = table.querySelectorAll<HTMLInputElement>('.data-table-cell--checkbox input');
    expect(rowCheckboxes.length).toBe(2);

    let selectedIndices: number[] = [];
    table.addEventListener('selectionchange', (e: any) => {
      selectedIndices = e.detail.selectedIndices;
    });

    // Select first row
    rowCheckboxes[0].checked = true;
    rowCheckboxes[0].dispatchEvent(new Event('change'));

    expect(selectedIndices).toEqual([0]);
    expect(headerCheckbox.indeterminate).toBe(true);

    // Select all via header
    headerCheckbox.checked = true;
    headerCheckbox.dispatchEvent(new Event('change'));

    expect(rowCheckboxes[0].checked).toBe(true);
    expect(rowCheckboxes[1].checked).toBe(true);
    expect(selectedIndices).toEqual([0, 1]);
  });

  it('renders table constructed programmatically from columns and data', () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.caption = 'Programmatic Inventory';
    table.selectable = true;
    table.columns = [
      { key: 'name', label: 'Component', sortable: true },
      { key: 'category', label: 'Category' },
    ];
    table.data = [
      { name: 'Button', category: 'Core' },
      { name: 'Switch', category: 'Form' },
    ];
    document.body.appendChild(table);

    const caption = table.querySelector('.data-table-caption');
    expect(caption?.textContent).toBe('Programmatic Inventory');

    const headers = table.querySelectorAll('th');
    // +1 for selectable checkbox column
    expect(headers.length).toBe(3);

    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstCell = rows[0].querySelectorAll('td')[1];
    expect(firstCell.textContent).toBe('Button');
  });

  it('correctly enhances table when table element is appended after connection', async () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.setAttribute('caption', 'Late Bound');
    document.body.appendChild(table);

    const nativeTable = document.createElement('table');
    nativeTable.innerHTML = `
      <thead><tr><th data-sortable>Title</th></tr></thead>
      <tbody><tr><td>Article 1</td></tr></tbody>
    `;
    table.appendChild(nativeTable);

    await new Promise((resolve) => setTimeout(resolve, 20));

    const sortBtn = table.querySelector('.data-table-sort-button');
    expect(sortBtn).not.toBeNull();
    expect(sortBtn?.textContent).toBe('Title');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.setAttribute('caption', 'Employee Directory');
    table.setAttribute('selectable', '');
    table.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jane Doe</td>
            <td>Principal Engineer</td>
          </tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(table);

    const results = await axe(table);
    expect(results).toHaveNoViolations();
  });
});
