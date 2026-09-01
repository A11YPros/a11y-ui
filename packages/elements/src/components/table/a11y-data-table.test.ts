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

  it('passes axe accessibility audit with zero violations', async () => {
    const table = document.createElement('a11y-data-table') as A11yDataTable;
    table.setAttribute('caption', 'Employee Directory');
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
