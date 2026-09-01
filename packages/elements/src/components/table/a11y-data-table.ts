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
    existingTable.querySelectorAll('tr').forEach((tr) => {
      if (tr.parentElement?.tagName === 'TBODY') {
        tr.classList.add('data-table-row');
      }
    });

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
