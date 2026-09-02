let nextAccordionId = 0;

/**
 * Accessible Accordion Item Web Component (<a11y-accordion-item>)
 *
 * Exact HTML5 parity with React AccordionItem using native <details> and <summary>:
 * - WCAG 2.1.1 Keyboard: Native Space/Enter toggle on <summary>
 * - WCAG 2.4.7 Focus Visible: Focus outline on <summary>
 * - WCAG 4.1.2 Name, Role, Value: Native expandable section semantics
 * - Light DOM rendering preserving CSS classes 1:1 with Accordion.css
 *
 * @example
 * ```html
 * <a11y-accordion-item title="Section 1" open>
 *   <p>Content for section 1</p>
 * </a11y-accordion-item>
 * ```
 */
export class A11yAccordionItem extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['title', 'open', 'disabled'];

  public static get observedAttributes(): string[] {
    return A11yAccordionItem.OBSERVED_ATTRS;
  }

  private _detailsElement: HTMLDetailsElement | null = null;
  private _summaryElement: HTMLElement | null = null;
  private _titleElement: HTMLSpanElement | null = null;
  private _contentElement: HTMLDivElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-accordion-item-${++nextAccordionId}`;
  }

  get title(): string {
    return this.getAttribute('title') || '';
  }

  set title(value: string) {
    this.setAttribute('title', value);
  }

  get open(): boolean {
    return this._detailsElement ? this._detailsElement.open : this.hasAttribute('open');
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
      if (this._detailsElement) this._detailsElement.open = true;
    } else {
      this.removeAttribute('open');
      if (this._detailsElement) this._detailsElement.open = false;
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
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
    const initialChildren = Array.from(this.childNodes);
    this.innerHTML = '';

    const details = document.createElement('details');
    details.id = this.id || this._uniqueId;
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-item__summary';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'accordion-item__title';
    titleSpan.textContent = this.title;

    // SVG icon matching React Accordion exactly
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'accordion-item__icon');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M5 7.5L10 12.5L15 7.5');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    summary.appendChild(titleSpan);
    summary.appendChild(svg);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'accordion-item__content';
    initialChildren.forEach((child) => contentDiv.appendChild(child));

    details.appendChild(summary);
    details.appendChild(contentDiv);
    this.appendChild(details);

    // A disabled item must not toggle. <summary> toggles on click, and Enter/Space
    // synthesize a click, so preventing the click covers both; the keydown guard is
    // defensive. Programmatic `open` changes are still allowed.
    summary.addEventListener('click', (e) => {
      if (this.disabled) e.preventDefault();
    });
    summary.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.disabled && (e.key === 'Enter' || e.key === ' ')) e.preventDefault();
    });

    // Sync toggle state with attribute and dispatch custom event
    details.addEventListener('toggle', () => {
      if (details.open) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
      this.dispatchEvent(
        new CustomEvent('toggle', {
          detail: { open: details.open },
          bubbles: true,
          composed: true,
        })
      );
    });

    this._detailsElement = details;
    this._summaryElement = summary;
    this._titleElement = titleSpan;
    this._contentElement = contentDiv;
  }

  private _updateState(): void {
    if (!this._detailsElement || !this._titleElement) return;

    this._titleElement.textContent = this.title;
    this._detailsElement.open = this.hasAttribute('open');

    if (this.disabled) {
      this._detailsElement.classList.add('accordion-item--disabled');
      if (this._summaryElement) {
        this._summaryElement.setAttribute('tabindex', '-1');
        this._summaryElement.setAttribute('aria-disabled', 'true');
      }
    } else {
      this._detailsElement.classList.remove('accordion-item--disabled');
      if (this._summaryElement) {
        this._summaryElement.removeAttribute('tabindex');
        this._summaryElement.removeAttribute('aria-disabled');
      }
    }
  }
}

/**
 * Accessible Accordion Web Component (<a11y-accordion>)
 *
 * Container component that coordinates multiple <a11y-accordion-item> elements.
 * Supports single-expand or multi-expand mode via `allow-multiple`.
 *
 * @example
 * ```html
 * <a11y-accordion allow-multiple="false">
 *   <a11y-accordion-item title="First Section">Content 1</a11y-accordion-item>
 *   <a11y-accordion-item title="Second Section">Content 2</a11y-accordion-item>
 * </a11y-accordion>
 * ```
 */
export class A11yAccordion extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ['allow-multiple'];
  }

  get allowMultiple(): boolean {
    const val = this.getAttribute('allow-multiple');
    return val !== 'false';
  }

  set allowMultiple(value: boolean) {
    this.setAttribute('allow-multiple', String(value));
  }

  connectedCallback(): void {
    this.classList.add('accordion');
    this.setAttribute('role', 'region');

    // Coordinate single-expand if allowMultiple is false
    this.addEventListener('toggle', (e) => {
      if (this.allowMultiple) return;

      const target = e.target as HTMLElement;
      const item = target.closest('a11y-accordion-item') as A11yAccordionItem | null;
      if (item && item.open) {
        const items = this.querySelectorAll<A11yAccordionItem>('a11y-accordion-item');
        items.forEach((sibling) => {
          if (sibling !== item && sibling.open) {
            sibling.open = false;
          }
        });
      }
    });
  }
}

export function registerAccordion(): void {
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('a11y-accordion-item')) {
      customElements.define('a11y-accordion-item', A11yAccordionItem);
    }
    if (!customElements.get('a11y-accordion')) {
      customElements.define('a11y-accordion', A11yAccordion);
    }
  }
}

if (typeof customElements !== 'undefined') {
  registerAccordion();
}
