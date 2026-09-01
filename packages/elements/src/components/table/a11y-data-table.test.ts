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
