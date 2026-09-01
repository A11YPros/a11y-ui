let nextCheckboxId = 0;

/**
 * Accessible Checkbox Web Component (<a11y-checkbox>)
 *
 * Exact HTML5 parity with React Checkbox:
 * - WCAG 1.3.1 Info and Relationships: Native <label for="..."> association
 * - WCAG 2.1.1 Keyboard: Native Space toggle
 * - WCAG 4.1.2 Name, Role, Value: Checked and indeterminate states
 * - Light DOM rendering preserving CSS classes 1:1 with Checkbox.css
 *
 * @example
 * ```html
 * <a11y-checkbox id="agree" label="I accept the terms" required></a11y-checkbox>
 * ```
 */
export class A11yCheckbox extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'label',
    'checked',
    'indeterminate',
    'error',
    'helper-text',
    'required',
    'disabled',
    'name',
    'value',
  ];

  public static get observedAttributes(): string[] {
    return A11yCheckbox.OBSERVED_ATTRS;
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
    this._uniqueId = `a11y-checkbox-${++nextCheckboxId}`;
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

  get indeterminate(): boolean {
    return this._inputElement
      ? this._inputElement.indeterminate
      : this.hasAttribute('indeterminate');
  }

  set indeterminate(val: boolean) {
    if (val) {
      this.setAttribute('indeterminate', '');
      if (this._inputElement) this._inputElement.indeterminate = true;
    } else {
      this.removeAttribute('indeterminate');
      if (this._inputElement) this._inputElement.indeterminate = false;
    }
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
    wrapper.className = 'form-checkbox-wrapper';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'form-checkbox-input-wrapper';

    const input = document.createElement('input');
    input.id = finalId;
    input.type = 'checkbox';
    input.className = 'form-checkbox';

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
          detail: { checked: input.checked },
        })
      );
    });

    const label = document.createElement('label');
    label.htmlFor = finalId;
    label.className = 'form-checkbox-label';

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
    this._inputElement.indeterminate = this.hasAttribute('indeterminate');
    this._inputElement.name = this.getAttribute('name') || '';
    this._inputElement.value = this.getAttribute('value') || 'on';
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
    const classes = ['form-checkbox', isError ? 'form-checkbox--error' : '']
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

export function registerCheckbox(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-checkbox')) {
    customElements.define('a11y-checkbox', A11yCheckbox);
  }
}

if (typeof customElements !== 'undefined') {
  registerCheckbox();
}
