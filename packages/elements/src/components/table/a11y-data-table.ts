let nextTableId = 0;

/**
 * Accessible Data Table Web Component (<a11y-data-table>)
 *
 * Exact HTML5 parity with React DataTable:
 * - WCAG 1.3.1 Info and Relationships: Semantic <table>, <caption>, <thead>, <tbody>, <th> with scope="col"
 * - WCAG 4.1.2 Name, Role, Value: aria-sort="ascending|descending|none"
 * - Light DOM rendering preserving CSS classes 1:1 with DataTable.css
 *
 * @example
 * ```html
 * <a11y-data-table caption="User Directory">
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

  connectedCallback(): void {
    if (!this._isInitialized) {
      this._render();
      this._isInitialized = true;
    }
    this._updateState();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this._isInitialized || oldValue === newValue) return;
    this._updateState();
  }

  private _render(): void {
    let existingTable = this.querySelector('table');

    if (!existingTable) {
      existingTable = document.createElement('table');
    }

    this.innerHTML = '';

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

    // Enhance headers
    const ths = existingTable.querySelectorAll('th');
    ths.forEach((th, index) => {
      th.setAttribute('scope', 'col');
      th.classList.add('data-table-header');

      const isSortable = th.hasAttribute('data-sortable');
      if (isSortable) {
        th.classList.add('data-table-header--sortable');
        if (!th.hasAttribute('aria-sort')) {
          th.setAttribute('aria-sort', 'none');
        }

        let button = th.querySelector('button');
        if (!button) {
          button = document.createElement('button');
          button.type = 'button';
          button.className = 'data-table-sort-button';
          button.textContent = th.textContent || '';
          th.innerHTML = '';
          th.appendChild(button);
        }

        button.addEventListener('click', () => {
          const currentSort = th.getAttribute('aria-sort');
          const nextSort = currentSort === 'ascending' ? 'descending' : 'ascending';

          ths.forEach((otherTh) => {
            if (otherTh !== th && otherTh.hasAttribute('data-sortable')) {
              otherTh.setAttribute('aria-sort', 'none');
            }
          });

          th.setAttribute('aria-sort', nextSort);
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

    if (allCheckInput) {
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

    wrapper.appendChild(existingTable);
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._table = existingTable;
    this._captionEl = captionEl;
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
