let nextTableId = 0;

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableRowData {
  id?: string | number;
  [key: string]: any;
}

/**
 * Accessible Data Table Web Component (<a11y-data-table>)
 *
 * Exact HTML5 parity with React DataTable:
 * - WCAG 1.3.1 Info and Relationships: Semantic <table>, <caption>, <thead>, <tbody>, <th> with scope="col"
 * - WCAG 4.1.2 Name, Role, Value: aria-sort="ascending|descending|none"
 * - Light DOM rendering preserving CSS classes 1:1 with DataTable.css
 * - Supports both declarative <table> markup and programmatic .columns / .data assignment
 *
 * @example
 * ```html
 * <a11y-data-table caption="User Directory" selectable>
 *   <table>
 *     <thead>
 *       <tr>
 *         <th data-sortable>Name</th>
 *         <th data-sortable>Email</th>
 *         <th>Role</th>
 *       </tr>
 *     </thead>
 *     <tbody>
 *       <tr>
 *         <td>Alex Morgan</td>
 *         <td>alex@example.com</td>
 *         <td>Admin</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </a11y-data-table>
 * ```
 */
export class A11yDataTable extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['caption', 'selectable'];

  public static get observedAttributes(): string[] {
    return A11yDataTable.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLDivElement | null = null;
  private _table: HTMLTableElement | null = null;
  private _captionEl: HTMLTableCaptionElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;
  private _columns: TableColumn[] | null = null;
  private _data: TableRowData[] | null = null;
  private _liveRegion: HTMLDivElement | null = null;
  private _observer: MutationObserver | null = null;

  constructor() {
    super();
    this._uniqueId = `a11y-table-${++nextTableId}`;
  }

  get caption(): string {
    return this.getAttribute('caption') || '';
  }

  set caption(val: string) {
    this.setAttribute('caption', val);
  }

  get selectable(): boolean {
    return this.hasAttribute('selectable');
  }

  set selectable(val: boolean) {
    if (val) {
      this.setAttribute('selectable', '');
    } else {
      this.removeAttribute('selectable');
    }
  }

  get columns(): TableColumn[] | null {
    return this._columns;
  }

  set columns(val: TableColumn[] | null) {
    this._columns = val;
    this._render();
  }

  get data(): TableRowData[] | null {
    return this._data;
  }

  set data(val: TableRowData[] | null) {
    this._data = val;
    this._render();
  }

  connectedCallback(): void {
    // Re-rendering on every reconnect (React re-parent, docs preview remount)
    // would re-bind click/change listeners on the same elements.
    if (!this._isInitialized) {
      this._render();
    }
    this._updateState();
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    this._observer = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;
    this._updateState();
  }

  private _buildTableFromData(): HTMLTableElement {
    const table = document.createElement('table');

    if (this.caption) {
      const caption = document.createElement('caption');
      caption.className = 'data-table-caption';
      caption.textContent = this.caption;
      table.appendChild(caption);
    }

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    (this._columns || []).forEach((col) => {
      const th = document.createElement('th');
      th.textContent = col.label;
      if (col.sortable) {
        th.setAttribute('data-sortable', '');
      }
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    (this._data || []).forEach((row) => {
      const tr = document.createElement('tr');
      (this._columns || []).forEach((col) => {
        const td = document.createElement('td');
        td.textContent = row[col.key] !== undefined ? String(row[col.key]) : '';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    return table;
  }

  private _render(): void {
    let existingTable = this.querySelector<HTMLTableElement>(':scope > table, :scope > .data-table-wrapper > table');

    // If programmatic columns/data are provided, construct or replace the table
    if (this._columns && this._columns.length > 0) {
      existingTable = this._buildTableFromData();
    } else if (!existingTable) {
      // If table is not attached yet (common with React/HTML parsers appending children after attach),
      // watch for child additions to populate the table.
      this._observer?.disconnect();
      this._observer = new MutationObserver(() => {
        const lateTable = this.querySelector<HTMLTableElement>(':scope > table');
        if (lateTable && !lateTable.closest('.data-table-wrapper')) {
          this._observer?.disconnect();
          this._observer = null;
          this._render();
        }
      });
      this._observer.observe(this, { childList: true, subtree: true });
      return;
    }

    if (!existingTable) return;

    this._observer?.disconnect();
    this._observer = null;

    // Clean up any previous wrapper or loose table before attaching wrapper
    Array.from(this.children).forEach((child) => {
      if (child !== existingTable) {
        child.remove();
      }
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'data-table-wrapper';

    existingTable.className =
      `data-table ${this.selectable ? 'data-table--selectable' : ''}`.trim();

    // Caption
    let captionEl = existingTable.querySelector('caption');
    if (!captionEl && this.caption) {
      captionEl = document.createElement('caption');
      existingTable.prepend(captionEl);
    }
    if (captionEl) {
      captionEl.className = 'data-table-caption';
      if (this.caption) captionEl.textContent = this.caption;
    }

    // If selectable, inject header checkbox
    if (this.selectable) {
      const headerRow = existingTable.querySelector('thead tr');
      if (headerRow && !headerRow.querySelector('.data-table-header--checkbox')) {
        const thCheckbox = document.createElement('th');
        thCheckbox.setAttribute('scope', 'col');
        thCheckbox.className = 'data-table-header data-table-header--checkbox';

        const allCheck = document.createElement('input');
        allCheck.type = 'checkbox';
        allCheck.className = 'form-checkbox';
        allCheck.setAttribute('aria-label', 'Select all rows');

        thCheckbox.appendChild(allCheck);
        headerRow.prepend(thCheckbox);
      }
    }

    // Status live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.className = 'data-table-live-region sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText =
      'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;';
    wrapper.appendChild(liveRegion);
    this._liveRegion = liveRegion;

    // Row headers in the body keep (or get) scope="row"; never force them to "col".
    existingTable.querySelectorAll('tbody th').forEach((th) => {
      if (!th.hasAttribute('scope')) th.setAttribute('scope', 'row');
      th.classList.add('data-table-header');
    });

    // Enhance column headers
    const ths = existingTable.querySelectorAll<HTMLTableCellElement>('thead th');
    ths.forEach((th) => {
      th.setAttribute('scope', 'col');
      th.classList.add('data-table-header');

      const isSortable = th.hasAttribute('data-sortable');
      if (isSortable) {
        th.classList.add('data-table-header--sortable');
        if (!th.hasAttribute('aria-sort')) {
          th.setAttribute('aria-sort', 'none');
        }

        const headerText =
          th.querySelector('.data-table-sort-button')?.childNodes[0]?.textContent?.trim() ||
          th.textContent?.trim() ||
          '';

        let button = th.querySelector<HTMLButtonElement>('.data-table-sort-button');
        if (!button) {
          button = document.createElement('button');
          button.type = 'button';
          button.className = 'data-table-sort-button';
          button.textContent = headerText;
          button.setAttribute('aria-label', `Sort by ${headerText}`);
          th.innerHTML = '';
          th.appendChild(button);
        }

        if (button.dataset.a11yBound === 'true') return;
        button.dataset.a11yBound = 'true';

        button.addEventListener('click', () => {
          const currentSort = th.getAttribute('aria-sort');
          const nextSort = currentSort === 'ascending' ? 'descending' : 'ascending';
          // Resolve the column at click time: cellIndex stays correct after the
          // selectable checkbox column is injected or row headers are present.
          const index = th.cellIndex;
          const columnHeaders = existingTable.querySelectorAll<HTMLTableCellElement>('thead th');

          columnHeaders.forEach((otherTh) => {
            if (otherTh !== th && otherTh.hasAttribute('data-sortable')) {
              otherTh.setAttribute('aria-sort', 'none');
              const otherBtn = otherTh.querySelector<HTMLButtonElement>('.data-table-sort-button');
              if (otherBtn) {
                const otherIndicator = otherBtn.querySelector('.data-table-sort-indicator');
                otherIndicator?.remove();
                const otherText =
                  otherBtn.childNodes[0]?.textContent?.trim() ||
                  otherTh.textContent?.trim() ||
                  '';
                otherBtn.setAttribute('aria-label', `Sort by ${otherText}`);
              }
            }
          });

          th.setAttribute('aria-sort', nextSort);

          // Update or add sort indicator
          let indicator = button.querySelector('.data-table-sort-indicator');
          if (!indicator) {
            indicator = document.createElement('span');
            indicator.className = 'data-table-sort-indicator';
            indicator.setAttribute('aria-hidden', 'true');
            button.appendChild(indicator);
          }
          indicator.textContent = nextSort === 'ascending' ? ' ↑' : ' ↓';

          button.setAttribute(
            'aria-label',
            `${headerText}, sorted ${nextSort}, activate to sort ${nextSort === 'ascending' ? 'descending' : 'ascending'}`
          );

          // Sort rows in the tbody
          const tbody = existingTable.querySelector('tbody');
          if (tbody) {
            const rows = Array.from(tbody.querySelectorAll('tr'));
            rows.sort((rowA, rowB) => {
              const cellA = rowA.children[index]?.textContent?.trim() || '';
              const cellB = rowB.children[index]?.textContent?.trim() || '';

              const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
              const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));
              const isNumeric = !isNaN(numA) && !isNaN(numB) && cellA !== '' && cellB !== '';

              let cmp = 0;
              if (isNumeric) {
                cmp = numA - numB;
              } else {
                cmp = cellA.localeCompare(cellB, undefined, { numeric: true, sensitivity: 'base' });
              }

              return nextSort === 'ascending' ? cmp : -cmp;
            });

            rows.forEach((row) => tbody.appendChild(row));
          }

          // Announce to screen readers (look up at click time; re-renders replace the region)
          const region =
            this._liveRegion || this.querySelector<HTMLDivElement>('.data-table-live-region');
          if (region) {
            region.textContent = `Sorted by ${headerText}, ${nextSort}`;
          }

          this.dispatchEvent(
            new CustomEvent('sort', {
              bubbles: true,
              composed: true,
              detail: { columnIndex: index, direction: nextSort },
            })
          );
        });
      }
    });

    // Enhance cells & rows
    const bodyRows = Array.from(existingTable.querySelectorAll('tbody tr'));
    const allCheckInput = existingTable.querySelector<HTMLInputElement>(
      '.data-table-header--checkbox input'
    );

    const updateHeaderCheckbox = () => {
      if (!allCheckInput) return;
      const rowChecks = existingTable.querySelectorAll<HTMLInputElement>(
        '.data-table-cell--checkbox input'
      );
      const checkedCount = Array.from(rowChecks).filter((c) => c.checked).length;
      if (checkedCount === 0) {
        allCheckInput.checked = false;
        allCheckInput.indeterminate = false;
      } else if (checkedCount === rowChecks.length) {
        allCheckInput.checked = true;
        allCheckInput.indeterminate = false;
      } else {
        allCheckInput.checked = false;
        allCheckInput.indeterminate = true;
      }
    };

    bodyRows.forEach((tr, rowIndex) => {
      tr.classList.add('data-table-row');

      if (this.selectable && !tr.querySelector('.data-table-cell--checkbox')) {
        const tdCheck = document.createElement('td');
        tdCheck.className = 'data-table-cell data-table-cell--checkbox';

        const rowCheck = document.createElement('input');
        rowCheck.type = 'checkbox';
        rowCheck.className = 'form-checkbox';
        rowCheck.setAttribute('aria-label', `Select row ${rowIndex + 1}`);

        rowCheck.addEventListener('change', () => {
          tr.classList.toggle('data-table-row--selected', rowCheck.checked);
          tr.setAttribute('aria-selected', String(rowCheck.checked));
          updateHeaderCheckbox();

          const selectedIndices = bodyRows
            .map((r, idx) =>
              r.querySelector<HTMLInputElement>('.data-table-cell--checkbox input')?.checked
                ? idx
                : -1
            )
            .filter((idx) => idx !== -1);

          this.dispatchEvent(
            new CustomEvent('selectionchange', {
              bubbles: true,
              composed: true,
              detail: { selectedIndices },
            })
          );
        });

        tdCheck.appendChild(rowCheck);
        tr.prepend(tdCheck);
      }
    });

    if (allCheckInput && allCheckInput.dataset.a11yBound !== 'true') {
      allCheckInput.dataset.a11yBound = 'true';
      allCheckInput.addEventListener('change', () => {
        const isChecked = allCheckInput.checked;
        const rowChecks = existingTable.querySelectorAll<HTMLInputElement>(
          '.data-table-cell--checkbox input'
        );

        rowChecks.forEach((c) => {
          c.checked = isChecked;
          const tr = c.closest('tr');
          if (tr) {
            tr.classList.toggle('data-table-row--selected', isChecked);
            tr.setAttribute('aria-selected', String(isChecked));
          }
        });

        const selectedIndices = isChecked ? bodyRows.map((_, i) => i) : [];
        this.dispatchEvent(
          new CustomEvent('selectionchange', {
            bubbles: true,
            composed: true,
            detail: { selectedIndices },
          })
        );
      });
    }

    existingTable.querySelectorAll('td').forEach((td) => {
      td.classList.add('data-table-cell');
    });

    if (existingTable.parentElement !== wrapper) {
      existingTable.remove();
      wrapper.appendChild(existingTable);
    }
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._table = existingTable;
    this._captionEl = captionEl;
    this._isInitialized = true;
  }

  private _updateState(): void {
    if (!this._table) return;

    if (this.caption) {
      if (!this._captionEl) {
        this._captionEl = document.createElement('caption');
        this._captionEl.className = 'data-table-caption';
        this._table.prepend(this._captionEl);
      }
      this._captionEl.textContent = this.caption;
      this._table.setAttribute('aria-label', this.caption);
    }
  }
}

export function registerDataTable(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-data-table')) {
    customElements.define('a11y-data-table', A11yDataTable);
  }
}

if (typeof customElements !== 'undefined') {
  registerDataTable();
}
