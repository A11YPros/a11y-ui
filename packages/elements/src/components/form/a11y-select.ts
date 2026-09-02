let nextSelectId = 0;

/**
 * Accessible Select Web Component (<a11y-select>)
 *
 * Exact HTML5 parity with React Select:
 * - WCAG 1.3.1 Info and Relationships: Native <label for="..."> association
 * - WCAG 2.1.1 Keyboard: Native select keyboard navigation
 * - WCAG 4.1.2 Name, Role, Value: Proper ARIA invalid and describedby
 * - Light DOM rendering preserving CSS classes 1:1 with Select.css
 *
 * @example
 * ```html
 * <a11y-select id="country" label="Country" required>
 *   <option value="">Select a country...</option>
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 * </a11y-select>
 * ```
 */
export class A11ySelect extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'label',
    'value',
    'placeholder',
    'error',
    'helper-text',
    'required',
    'disabled',
    'name',
  ];

  public static get observedAttributes(): string[] {
    return A11ySelect.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLDivElement | null = null;
  private _selectElement: HTMLSelectElement | null = null;
  private _labelElement: HTMLLabelElement | null = null;
  private _helperElement: HTMLSpanElement | null = null;
  private _errorElement: HTMLSpanElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-select-${++nextSelectId}`;
  }

  get value(): string {
    return this._selectElement ? this._selectElement.value : this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
    if (this._selectElement) this._selectElement.value = val;
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

  override focus(options?: FocusOptions): void {
    this._selectElement?.focus(options);
  }

  private _render(): void {
    const initialChildren = Array.from(this.childNodes);
    const hostId = this.getAttribute('id');
    const finalId = this.getAttribute('select-id') || hostId || this._uniqueId;

    // Move the id onto the native control so <label for> and aria-describedby
    // resolve to the select rather than the (non-labelable) host element.
    if (hostId) {
      this.removeAttribute('id');
      this.setAttribute('data-select-id', finalId);
    }

    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    this.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'form-select-wrapper';

    const label = document.createElement('label');
    label.htmlFor = finalId;
    label.className = 'form-label';

    const select = document.createElement('select');
    select.id = finalId;
    select.className = 'form-select';

    // Move initial options into select
    initialChildren.forEach((child) => {
      if (
        child.nodeType === Node.ELEMENT_NODE &&
        (child.nodeName === 'OPTION' || child.nodeName === 'OPTGROUP')
      ) {
        select.appendChild(child);
      }
    });

    select.addEventListener('change', () => {
      this.setAttribute('value', select.value);
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: select.value },
        })
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
    wrapper.appendChild(select);
    wrapper.appendChild(helper);
    wrapper.appendChild(error);
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._selectElement = select;
    this._labelElement = label;
    this._helperElement = helper;
    this._errorElement = error;
  }

  private _updateState(): void {
    if (
      !this._selectElement ||
      !this._labelElement ||
      !this._helperElement ||
      !this._errorElement
    ) {
      return;
    }

    const finalId = this._selectElement.id;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    if (this.hasAttribute('value')) {
      this._selectElement.value = this.getAttribute('value') || '';
    }
    this._selectElement.name = this.getAttribute('name') || '';
    this._selectElement.disabled = this.disabled;

    if (this.required) {
      this._selectElement.setAttribute('required', '');
    } else {
      this._selectElement.removeAttribute('required');
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
      'form-select',
      isError ? 'form-select--error' : '',
      this.disabled ? 'form-select--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
    this._selectElement.className = classes;

    if (isError) {
      this._selectElement.setAttribute('aria-invalid', 'true');
      this._selectElement.setAttribute('aria-describedby', errorId);
      this._errorElement.textContent = this.error;
      this._errorElement.style.display = '';
      this._helperElement.style.display = 'none';
    } else {
      this._selectElement.removeAttribute('aria-invalid');
      this._errorElement.style.display = 'none';
      if (this.helperText) {
        this._selectElement.setAttribute('aria-describedby', helperId);
        this._helperElement.textContent = this.helperText;
        this._helperElement.style.display = '';
      } else {
        this._selectElement.removeAttribute('aria-describedby');
        this._helperElement.style.display = 'none';
      }
    }
  }
}

export function registerSelect(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-select')) {
    customElements.define('a11y-select', A11ySelect);
  }
}

if (typeof customElements !== 'undefined') {
  registerSelect();
}
