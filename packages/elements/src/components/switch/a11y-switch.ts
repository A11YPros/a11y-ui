let nextSwitchId = 0;

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPosition = 'start' | 'end';

/**
 * Accessible Switch Web Component (<a11y-switch>)
 *
 * Implements WAI-ARIA Switch pattern:
 * - WCAG 2.1.1 Keyboard: Space and Enter toggle
 * - WCAG 2.4.7 Focus Visible: Clear focus ring on the interactive track
 * - WCAG 4.1.2 Name, Role, Value: role="switch", aria-checked, aria-describedby
 * - Light DOM rendering for 100% transparent accessibility and CSS inheritance
 *
 * @example
 * ```html
 * <a11y-switch label="Dark mode" checked></a11y-switch>
 * <a11y-switch label="Notifications" helper-text="Receive weekly digests"></a11y-switch>
 * ```
 */
export class A11ySwitch extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'checked',
    'disabled',
    'size',
    'label',
    'label-position',
    'error',
    'helper-text',
    'aria-label',
  ];

  public static get observedAttributes(): string[] {
    return A11ySwitch.OBSERVED_ATTRS;
  }

  private _buttonElement: HTMLButtonElement | null = null;
  private _thumbElement: HTMLSpanElement | null = null;
  private _labelElement: HTMLLabelElement | null = null;
  private _errorElement: HTMLSpanElement | null = null;
  private _helperElement: HTMLSpanElement | null = null;
  private _wrapperElement: HTMLDivElement | null = null;
  private _containerElement: HTMLDivElement | null = null;

  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-switch-${++nextSwitchId}`;
  }

  /* --------------------------------------------------------------------------
   * Properties (Getters / Setters)
   * -------------------------------------------------------------------------- */

  get checked(): boolean {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
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

  get size(): SwitchSize {
    const s = this.getAttribute('size');
    return s === 'sm' || s === 'lg' ? s : 'md';
  }

  set size(value: SwitchSize) {
    this.setAttribute('size', value);
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get labelPosition(): SwitchLabelPosition {
    return this.getAttribute('label-position') === 'start' ? 'start' : 'end';
  }

  set labelPosition(value: SwitchLabelPosition) {
    this.setAttribute('label-position', value);
  }

  get error(): string {
    return this.getAttribute('error') || '';
  }

  set error(value: string) {
    if (value) {
      this.setAttribute('error', value);
    } else {
      this.removeAttribute('error');
    }
  }

  get helperText(): string {
    return this.getAttribute('helper-text') || '';
  }

  set helperText(value: string) {
    if (value) {
      this.setAttribute('helper-text', value);
    } else {
      this.removeAttribute('helper-text');
    }
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

  /* --------------------------------------------------------------------------
   * Public Methods
   * -------------------------------------------------------------------------- */

  public toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this._dispatchChangeEvent();
  }

  public override focus(options?: FocusOptions): void {
    this._buttonElement?.focus(options);
  }

  public override blur(): void {
    this._buttonElement?.blur();
  }

  /* --------------------------------------------------------------------------
   * Rendering & DOM Management (Light DOM)
   * -------------------------------------------------------------------------- */

  private _render(): void {
    this.innerHTML = '';

    const switchId = `${this._uniqueId}-track`;
    const labelId = `${this._uniqueId}-label`;

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'a11y-switch-wrapper';

    // Container for switch + label
    const container = document.createElement('div');
    container.className = 'a11y-switch-container';

    // Label
    const labelEl = document.createElement('label');
    labelEl.id = labelId;
    labelEl.htmlFor = switchId;
    labelEl.className = 'a11y-switch-label';

    // Switch Track (native button with role="switch")
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'switch';
    button.id = switchId;
    button.className = 'a11y-switch';

    // Switch Thumb
    const thumb = document.createElement('span');
    thumb.className = 'a11y-switch-thumb';
    thumb.setAttribute('aria-hidden', 'true');
    button.appendChild(thumb);

    // Event listeners
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    button.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    });

    labelEl.addEventListener('click', (e) => {
      e.preventDefault();
      this.focus();
      this.toggle();
    });

    // Error message container
    const errorSpan = document.createElement('span');
    errorSpan.id = `${this._uniqueId}-error`;
    errorSpan.className = 'a11y-switch-error';
    errorSpan.setAttribute('role', 'alert');

    // Helper text container
    const helperSpan = document.createElement('span');
    helperSpan.id = `${this._uniqueId}-helper`;
    helperSpan.className = 'a11y-switch-helper';

    // Attach button and label to container
    container.appendChild(button);
    container.appendChild(labelEl);

    wrapper.appendChild(container);
    wrapper.appendChild(errorSpan);
    wrapper.appendChild(helperSpan);
    this.appendChild(wrapper);

    this._buttonElement = button;
    this._thumbElement = thumb;
    this._labelElement = labelEl;
    this._errorElement = errorSpan;
    this._helperElement = helperSpan;
    this._wrapperElement = wrapper;
    this._containerElement = container;
  }

  private _updateState(): void {
    if (
      !this._buttonElement ||
      !this._thumbElement ||
      !this._labelElement ||
      !this._containerElement ||
      !this._errorElement ||
      !this._helperElement
    ) {
      return;
    }

    const wasFocused = document.activeElement === this._buttonElement;

    const isChecked = this.checked;
    const isDisabled = this.disabled;
    const size = this.size;
    const labelText = this.label;
    const position = this.labelPosition;
    const errorText = this.error;
    const helperText = this.helperText;
    const ariaLabel = this.getAttribute('aria-label');

    // Button states & ARIA
    this._buttonElement.setAttribute('aria-checked', String(isChecked));
    this._buttonElement.disabled = isDisabled;

    if (isDisabled) {
      this._buttonElement.setAttribute('aria-disabled', 'true');
    } else {
      this._buttonElement.removeAttribute('aria-disabled');
    }

    // ARIA invalid and descriptions
    const describedByIds: string[] = [];
    if (errorText) {
      this._buttonElement.setAttribute('aria-invalid', 'true');
      this._errorElement.textContent = errorText;
      this._errorElement.style.display = '';
      describedByIds.push(this._errorElement.id);
    } else {
      this._buttonElement.removeAttribute('aria-invalid');
      this._errorElement.textContent = '';
      this._errorElement.style.display = 'none';
    }

    if (helperText && !errorText) {
      this._helperElement.textContent = helperText;
      this._helperElement.style.display = '';
      describedByIds.push(this._helperElement.id);
    } else {
      this._helperElement.textContent = '';
      this._helperElement.style.display = 'none';
    }

    if (describedByIds.length > 0) {
      this._buttonElement.setAttribute('aria-describedby', describedByIds.join(' '));
    } else {
      this._buttonElement.removeAttribute('aria-describedby');
    }

    // Labeling
    if (labelText) {
      this._labelElement.textContent = labelText;
      this._labelElement.style.display = '';
      this._buttonElement.removeAttribute('aria-label');
    } else {
      this._labelElement.textContent = '';
      this._labelElement.style.display = 'none';
      if (ariaLabel) {
        this._buttonElement.setAttribute('aria-label', ariaLabel);
      }
    }

    // Container layout
    this._containerElement.className = `a11y-switch-container a11y-switch-container--label-${position}${
      isDisabled ? ' a11y-switch-container--disabled' : ''
    }`;

    // Reorder elements inside container based on label position without clearing DOM
    if (position === 'start') {
      if (this._containerElement.firstElementChild !== this._labelElement) {
        this._containerElement.insertBefore(this._labelElement, this._buttonElement);
      }
    } else {
      if (this._containerElement.lastElementChild !== this._labelElement) {
        this._containerElement.appendChild(this._labelElement);
      }
    }

    // Classes for button track
    this._buttonElement.className = [
      'a11y-switch',
      `a11y-switch--${size}`,
      isChecked ? 'a11y-switch--checked' : '',
      isDisabled ? 'a11y-switch--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Classes for thumb
    this._thumbElement.className = [
      'a11y-switch-thumb',
      `a11y-switch-thumb--${size}`,
      isChecked ? 'a11y-switch-thumb--checked' : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (wasFocused && document.activeElement !== this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  private _dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }
}

/**
 * Register the <a11y-switch> element if not already defined
 */
export function registerSwitch(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-switch')) {
    customElements.define('a11y-switch', A11ySwitch);
  }
}

// Auto-register when imported directly in browsers
if (typeof customElements !== 'undefined') {
  registerSwitch();
}
