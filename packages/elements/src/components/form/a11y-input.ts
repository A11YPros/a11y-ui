let nextInputId = 0;

/**
 * Accessible Input Web Component (<a11y-input>)
 *
 * Exact HTML5 parity with React Input:
 * - WCAG 1.3.1 Info and Relationships: Native <label for="..."> association
 * - WCAG 2.5.3 Label in Name: Label text matches accessible name
 * - WCAG 4.1.2 Name, Role, Value: Proper ARIA invalid and describedby attributes
 * - WCAG 4.1.3 Status Messages: Error message with role="alert"
 * - Light DOM rendering preserving CSS classes 1:1 with Input.css
 *
 * @example
 * ```html
 * <a11y-input
 *   id="email"
 *   type="email"
 *   label="Email address"
 *   required
 *   error="Please enter a valid email"
 * ></a11y-input>
 * ```
 */
export class A11yInput extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'type',
    'label',
    'value',
    'placeholder',
    'error',
    'helper-text',
    'required',
    'disabled',
    'name',
    'readonly',
  ];

  public static get observedAttributes(): string[] {
    return A11yInput.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLDivElement | null = null;
  private _inputElement: HTMLInputElement | null = null;
  private _labelElement: HTMLLabelElement | null = null;
  private _helperElement: HTMLSpanElement | null = null;
  private _errorElement: HTMLSpanElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-input-${++nextInputId}`;
  }

  get value(): string {
    return this._inputElement ? this._inputElement.value : this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
    if (this._inputElement) this._inputElement.value = val;
  }

  get type(): string {
    return this.getAttribute('type') || 'text';
  }

  set type(val: string) {
    this.setAttribute('type', val);
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(val: string) {
    this.setAttribute('label', val);
  }

  get error(): string {
    return this.getAttribute('error') || '';
  }

  set error(val: string) {
    if (val) {
      this.setAttribute('error', val);
    } else {
      this.removeAttribute('error');
    }
  }

  get helperText(): string {
    return this.getAttribute('helper-text') || '';
  }

  set helperText(val: string) {
    if (val) {
      this.setAttribute('helper-text', val);
    } else {
      this.removeAttribute('helper-text');
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get required(): boolean {
    return this.hasAttribute('required');
  }

  set required(val: boolean) {
    if (val) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
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
    if (name === 'value') {
      // Only the `value` attribute may overwrite what the user has typed.
      if (this._inputElement) this._inputElement.value = newValue || '';
      return;
    }
    this._updateState();
  }

  override focus(options?: FocusOptions): void {
    this._inputElement?.focus(options);
  }

  private _render(): void {
    const hostId = this.getAttribute('id');
    const finalId = this.getAttribute('input-id') || hostId || this._uniqueId;

    if (this.hasAttribute('id')) {
      this.removeAttribute('id');
      this.setAttribute('data-input-id', finalId);
    }

    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    this.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'form-input-wrapper';

    const label = document.createElement('label');
    label.htmlFor = finalId;
    label.className = 'form-label';

    const input = document.createElement('input');
    input.id = finalId;
    input.className = 'form-input';
    input.value = this.getAttribute('value') || '';

    input.addEventListener('input', (e) => {
      this.dispatchEvent(
        new CustomEvent('input', { bubbles: true, composed: true, detail: { value: input.value } })
      );
    });

    input.addEventListener('change', (e) => {
      this.dispatchEvent(
        new CustomEvent('change', { bubbles: true, composed: true, detail: { value: input.value } })
      );
    });

    const helper = document.createElement('span');
    helper.id = helperId;
    helper.className = 'form-helper-text';

    const error = document.createElement('span');
    error.id = errorId;
    error.className = 'form-error-text';
    error.setAttribute('role', 'alert');

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(helper);
    wrapper.appendChild(error);
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._inputElement = input;
    this._labelElement = label;
    this._helperElement = helper;
    this._errorElement = error;
  }

  private _updateState(): void {
    if (!this._inputElement || !this._labelElement || !this._helperElement || !this._errorElement) {
      return;
    }

    const finalId = this._inputElement.id;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    this._inputElement.type = this.type;
    this._inputElement.placeholder = this.getAttribute('placeholder') || '';
    this._inputElement.name = this.getAttribute('name') || '';
    this._inputElement.disabled = this.disabled;
    this._inputElement.readOnly = this.hasAttribute('readonly');

    if (this.required) {
      this._inputElement.setAttribute('required', '');
    } else {
      this._inputElement.removeAttribute('required');
    }

    // Label
    if (this.label) {
      this._labelElement.style.display = '';
      this._labelElement.textContent = this.label;
      if (this.required) {
        const reqSpan = document.createElement('span');
        reqSpan.className = 'form-label__required';
        reqSpan.setAttribute('aria-hidden', 'true');
        reqSpan.textContent = ' *';
        this._labelElement.appendChild(reqSpan);
      }
    } else {
      this._labelElement.style.display = 'none';
    }

    // Classes & ARIA
    const isError = Boolean(this.error);
    const classes = [
      'form-input',
      isError ? 'form-input--error' : '',
      this.disabled ? 'form-input--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
    this._inputElement.className = classes;

    if (isError) {
      this._inputElement.setAttribute('aria-invalid', 'true');
      this._inputElement.setAttribute('aria-describedby', errorId);
      this._errorElement.textContent = this.error;
      this._errorElement.style.display = '';
      this._helperElement.style.display = 'none';
    } else {
      this._inputElement.removeAttribute('aria-invalid');
      this._errorElement.style.display = 'none';
      if (this.helperText) {
        this._inputElement.setAttribute('aria-describedby', helperId);
        this._helperElement.textContent = this.helperText;
        this._helperElement.style.display = '';
      } else {
        this._inputElement.removeAttribute('aria-describedby');
        this._helperElement.style.display = 'none';
      }
    }
  }
}

export function registerInput(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-input')) {
    customElements.define('a11y-input', A11yInput);
  }
}

if (typeof customElements !== 'undefined') {
  registerInput();
}
