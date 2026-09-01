let nextRadioId = 0;

/**
 * Accessible Radio Web Component (<a11y-radio>)
 *
 * Exact HTML5 parity with React Radio:
 * - WCAG 1.3.1 Info and Relationships: Native <label for="..."> association
 * - WCAG 2.1.1 Keyboard: Native arrow key navigation within group
 * - WCAG 4.1.2 Name, Role, Value: Radio input semantics
 * - Light DOM rendering preserving CSS classes 1:1 with Radio.css
 *
 * @example
 * ```html
 * <a11y-radio name="plan" value="free" label="Free Tier" checked></a11y-radio>
 * <a11y-radio name="plan" value="pro" label="Pro Tier"></a11y-radio>
 * ```
 */
export class A11yRadio extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'label',
    'name',
    'value',
    'checked',
    'error',
    'helper-text',
    'required',
    'disabled',
  ];

  public static get observedAttributes(): string[] {
    return A11yRadio.OBSERVED_ATTRS;
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
    this._uniqueId = `a11y-radio-${++nextRadioId}`;
  }

  get checked(): boolean {
    return this._inputElement ? this._inputElement.checked : this.hasAttribute('checked');
  }

  set checked(val: boolean) {
    if (val) {
      this.setAttribute('checked', '');
      if (this._inputElement) this._inputElement.checked = true;
    } else {
      this.removeAttribute('checked');
      if (this._inputElement) this._inputElement.checked = false;
    }
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(val: string) {
    this.setAttribute('name', val);
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
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
    this._updateState();
  }

  private _render(): void {
    const finalId = this.id || this._uniqueId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    this.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'form-radio-wrapper';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'form-radio-input-wrapper';

    const input = document.createElement('input');
    input.id = finalId;
    input.type = 'radio';
    input.className = 'form-radio';

    input.addEventListener('change', () => {
      if (input.checked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: input.value, checked: input.checked },
        })
      );
    });

    const label = document.createElement('label');
    label.htmlFor = finalId;
    label.className = 'form-radio-label';

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(label);

    const helper = document.createElement('span');
    helper.id = helperId;
    helper.className = 'form-helper-text';

    const error = document.createElement('span');
    error.id = errorId;
    error.className = 'form-error-text';
    error.setAttribute('role', 'alert');

    wrapper.appendChild(inputWrapper);
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

    const finalId = this.id || this._uniqueId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    this._inputElement.checked = this.hasAttribute('checked');
    this._inputElement.name = this.name;
    this._inputElement.value = this.value;
    this._inputElement.disabled = this.disabled;

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
    const classes = ['form-radio', isError ? 'form-radio--error' : ''].filter(Boolean).join(' ');
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

export function registerRadio(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-radio')) {
    customElements.define('a11y-radio', A11yRadio);
  }
}

if (typeof customElements !== 'undefined') {
  registerRadio();
}
