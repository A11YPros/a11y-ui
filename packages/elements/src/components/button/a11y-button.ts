export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Accessible Button Web Component (<a11y-button>)
 *
 * Implements WCAG compliance:
 * - WCAG 2.1.1 Keyboard: Full keyboard support (Enter/Space) via native button
 * - WCAG 2.4.7 Focus Visible: Focus outline rings
 * - WCAG 4.1.2 Name, Role, Value: Proper ARIA roles and loading announcements
 * - Light DOM rendering for CSS styling and zero ARIA encapsulation issues
 *
 * @example
 * ```html
 * <a11y-button variant="primary">Save Changes</a11y-button>
 * <a11y-button variant="secondary" loading>Saving...</a11y-button>
 * ```
 */
export class A11yButton extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'variant',
    'size',
    'loading',
    'disabled',
    'aria-label',
    'type',
  ];

  public static get observedAttributes(): string[] {
    return A11yButton.OBSERVED_ATTRS;
  }

  private _buttonElement: HTMLButtonElement | null = null;
  private _contentSlot: HTMLSpanElement | null = null;
  private _spinnerElement: SVGElement | null = null;
  private _statusElement: HTMLSpanElement | null = null;
  private _isInitialized = false;

  /* --------------------------------------------------------------------------
   * Properties (Getters / Setters)
   * -------------------------------------------------------------------------- */

  get variant(): ButtonVariant {
    const v = this.getAttribute('variant');
    return v === 'secondary' || v === 'ghost' || v === 'danger' ? v : 'primary';
  }

  set variant(value: ButtonVariant) {
    this.setAttribute('variant', value);
  }

  get size(): ButtonSize {
    const s = this.getAttribute('size');
    return s === 'sm' || s === 'lg' ? s : 'md';
  }

  set size(value: ButtonSize) {
    this.setAttribute('size', value);
  }

  get loading(): boolean {
    return this.hasAttribute('loading');
  }

  set loading(value: boolean) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
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

  get type(): 'button' | 'submit' | 'reset' {
    const t = this.getAttribute('type');
    return t === 'submit' || t === 'reset' ? t : 'button';
  }

  set type(value: 'button' | 'submit' | 'reset') {
    this.setAttribute('type', value);
  }

  /* --------------------------------------------------------------------------
   * Lifecycle
   * -------------------------------------------------------------------------- */

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

  public override focus(options?: FocusOptions): void {
    this._buttonElement?.focus(options);
  }

  public override blur(): void {
    this._buttonElement?.blur();
  }

  /* --------------------------------------------------------------------------
   * Rendering (Light DOM)
   * -------------------------------------------------------------------------- */

  private _render(): void {
    // Preserve any existing light DOM child nodes (e.g. text or icons)
    const initialNodes = Array.from(this.childNodes);
    this.innerHTML = '';

    const button = document.createElement('button');
    button.type = this.type;

    // Spinner SVG for loading state
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'btn__spinner');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '10');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '4');
    circle.setAttribute('opacity', '0.25');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute(
      'd',
      'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    );
    path.setAttribute('opacity', '0.75');

    svg.appendChild(circle);
    svg.appendChild(path);

    // Text content container
    const contentSpan = document.createElement('span');
    contentSpan.className = 'btn__text';
    initialNodes.forEach((node) => contentSpan.appendChild(node));

    // Screen reader loading status
    const statusSpan = document.createElement('span');
    statusSpan.className = 'btn__sr-status';
    statusSpan.setAttribute('role', 'status');
    statusSpan.setAttribute('aria-live', 'polite');

    button.appendChild(svg);
    button.appendChild(contentSpan);
    button.appendChild(statusSpan);
    this.appendChild(button);

    // Form submit delegation if type is submit/reset
    button.addEventListener('click', (e) => {
      if (this.disabled || this.loading) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      if (this.type === 'submit') {
        const form = this.closest('form');
        if (form && e.target === button) {
          form.requestSubmit ? form.requestSubmit() : form.submit();
        }
      } else if (this.type === 'reset') {
        const form = this.closest('form');
        form?.reset();
      }
    });

    this._buttonElement = button;
    this._spinnerElement = svg;
    this._contentSlot = contentSpan;
    this._statusElement = statusSpan;
  }

  private _updateState(): void {
    if (!this._buttonElement || !this._spinnerElement || !this._statusElement) return;

    const isLoading = this.loading;
    const isDisabled = this.disabled || isLoading;
    const variant = this.variant;
    const size = this.size;
    const ariaLabel = this.getAttribute('aria-label');

    this._buttonElement.type = this.type;
    this._buttonElement.disabled = isDisabled;

    // ARIA attributes
    if (isLoading) {
      this._buttonElement.setAttribute('aria-busy', 'true');
      this._spinnerElement.style.display = '';
      this._statusElement.textContent = 'Loading...';
    } else {
      this._buttonElement.removeAttribute('aria-busy');
      this._spinnerElement.style.display = 'none';
      this._statusElement.textContent = '';
    }

    if (this.disabled) {
      this._buttonElement.setAttribute('aria-disabled', 'true');
    } else {
      this._buttonElement.removeAttribute('aria-disabled');
    }

    if (ariaLabel) {
      this._buttonElement.setAttribute('aria-label', ariaLabel);
    } else {
      this._buttonElement.removeAttribute('aria-label');
    }

    // CSS Classes
    this._buttonElement.className = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      isLoading ? 'btn--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}

/**
 * Register the <a11y-button> element if not already defined
 */
export function registerButton(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-button')) {
    customElements.define('a11y-button', A11yButton);
  }
}

// Auto-register when imported directly in browsers
if (typeof customElements !== 'undefined') {
  registerButton();
}
