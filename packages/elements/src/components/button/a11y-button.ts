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
  private _spinnerElement: HTMLSpanElement | null = null;
  private _statusElement: HTMLSpanElement | null = null;
  private _isInitialized = false;
  private _observer: MutationObserver | null = null;

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
    if (!this.style.display) {
      this.style.display = 'inline-block';
    }
    if (!this._isInitialized) {
      this._render();
      this._isInitialized = true;
    }
    this._updateState();
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    this._observer = null;
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

    // Spinner container matching React Button.tsx structure exactly
    const spinnerWrap = document.createElement('span');
    spinnerWrap.className = 'btn__spinner';
    spinnerWrap.setAttribute('aria-hidden', 'true');
    spinnerWrap.style.display = 'none';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'btn__spinner-icon');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('class', 'btn__spinner-circle');
    circle.setAttribute('cx', '8');
    circle.setAttribute('cy', '8');
    circle.setAttribute('r', '6');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('stroke-linecap', 'round');
    circle.setAttribute('stroke-dasharray', '31.416');
    circle.setAttribute('stroke-dashoffset', '31.416');

    svg.appendChild(circle);
    spinnerWrap.appendChild(svg);

    // Text content container matching React .btn__content exactly
    const contentSpan = document.createElement('span');
    contentSpan.className = 'btn__content';
    initialNodes.forEach((node) => contentSpan.appendChild(node));

    // Screen reader loading status - absolutely positioned so it never affects flex gap/width
    const statusSpan = document.createElement('span');
    statusSpan.className = 'btn__sr-status';
    statusSpan.setAttribute('role', 'status');
    statusSpan.setAttribute('aria-live', 'polite');
    statusSpan.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;display:none;';

    button.appendChild(spinnerWrap);
    button.appendChild(contentSpan);
    button.appendChild(statusSpan);
    this.appendChild(button);

    // Watch for late-bound children added by React/HTML parser and route into contentSpan
    this._observer?.disconnect();
    this._observer = new MutationObserver(() => {
      const extraNodes = Array.from(this.childNodes).filter((n) => n !== button);
      if (extraNodes.length > 0) {
        extraNodes.forEach((node) => contentSpan.appendChild(node));
      }
    });
    this._observer.observe(this, { childList: true });

    // The inner <button> lives in the light DOM, so it is a real form-associated
    // element: the browser handles submit/reset natively. Do not re-trigger them
    // here or every submit fires twice.
    button.addEventListener('click', (e) => {
      if (this.disabled || this.loading) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    this._buttonElement = button;
    this._spinnerElement = spinnerWrap;
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

    // ARIA attributes & loading states
    if (isLoading) {
      this._buttonElement.setAttribute('aria-busy', 'true');
      this._spinnerElement.style.display = '';
      this._statusElement.style.display = '';
      this._statusElement.textContent = 'Loading...';
    } else {
      this._buttonElement.removeAttribute('aria-busy');
      this._spinnerElement.style.display = 'none';
      this._statusElement.style.display = 'none';
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
