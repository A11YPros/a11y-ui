let nextTextareaId = 0;

/**
 * Accessible Textarea Web Component (<a11y-textarea>)
 *
 * Exact HTML5 parity with React Textarea:
 * - WCAG 1.3.1 Info and Relationships: Native <label for="..."> association
 * - WCAG 2.5.3 Label in Name: Label matches accessible name
 * - WCAG 4.1.2 Name, Role, Value: Proper ARIA invalid and describedby
 * - WCAG 4.1.3 Status Messages: Live character counter and error alerts
 * - Light DOM rendering preserving CSS classes 1:1 with Textarea.css
 *
 * @example
 * ```html
 * <a11y-textarea
 *   id="bio"
 *   label="Biography"
 *   max-length="300"
 *   show-count
 *   helper-text="Tell us about yourself"
 * ></a11y-textarea>
 * ```
 */
export class A11yTextarea extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'label',
    'value',
    'placeholder',
    'rows',
    'cols',
    'max-length',
    'show-count',
    'error',
    'helper-text',
    'required',
    'disabled',
    'readonly',
    'name',
  ];

  public static get observedAttributes(): string[] {
    return A11yTextarea.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLDivElement | null = null;
  private _textareaElement: HTMLTextAreaElement | null = null;
  private _labelElement: HTMLLabelElement | null = null;
  private _footerElement: HTMLDivElement | null = null;
  private _helperElement: HTMLSpanElement | null = null;
  private _errorElement: HTMLSpanElement | null = null;
  private _countElement: HTMLSpanElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-textarea-${++nextTextareaId}`;
  }

  get value(): string {
    return this._textareaElement ? this._textareaElement.value : this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
    if (this._textareaElement) {
      this._textareaElement.value = val;
      this._updateCharCount();
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

  get maxLength(): number | undefined {
    const val = this.getAttribute('max-length');
    return val ? parseInt(val, 10) : undefined;
  }

  set maxLength(val: number | undefined) {
    if (val !== undefined) {
      this.setAttribute('max-length', String(val));
    } else {
      this.removeAttribute('max-length');
    }
  }

  get showCount(): boolean {
    return this.hasAttribute('show-count');
  }

  set showCount(val: boolean) {
    if (val) {
      this.setAttribute('show-count', '');
    } else {
      this.removeAttribute('show-count');
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
    const initialText = this.textContent || this.getAttribute('value') || '';
    const finalId = this.id || this._uniqueId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const countId = `${finalId}-count`;

    this.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'form-textarea-wrapper';

    const label = document.createElement('label');
    label.htmlFor = finalId;
    label.className = 'form-label';

    const textarea = document.createElement('textarea');
    textarea.id = finalId;
    textarea.className = 'form-textarea';
    textarea.value = initialText;

    textarea.addEventListener('input', () => {
      this._updateCharCount();
      this.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          composed: true,
          detail: { value: textarea.value },
        })
      );
    });

    textarea.addEventListener('change', () => {
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: textarea.value },
        })
      );
    });

    const footer = document.createElement('div');
    footer.className = 'form-textarea-footer';

    const helper = document.createElement('span');
    helper.id = helperId;
    helper.className = 'form-helper-text';

    const error = document.createElement('span');
    error.id = errorId;
    error.className = 'form-error-text';
    error.setAttribute('role', 'alert');

    const count = document.createElement('span');
    count.id = countId;
    count.className = 'form-character-count';
    count.setAttribute('aria-live', 'polite');

    footer.appendChild(helper);
    footer.appendChild(error);
    footer.appendChild(count);

    wrapper.appendChild(label);
    wrapper.appendChild(textarea);
    wrapper.appendChild(footer);
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._textareaElement = textarea;
    this._labelElement = label;
    this._footerElement = footer;
    this._helperElement = helper;
    this._errorElement = error;
    this._countElement = count;
  }

  private _updateCharCount(): void {
    if (!this._countElement || !this._textareaElement || !this.showCount || !this.maxLength) {
      if (this._countElement) this._countElement.style.display = 'none';
      return;
    }
    const len = this._textareaElement.value.length;
    this._countElement.textContent = `${len} / ${this.maxLength}`;
    this._countElement.style.display = '';
  }

  private _updateState(): void {
    if (
      !this._textareaElement ||
      !this._labelElement ||
      !this._helperElement ||
      !this._errorElement ||
      !this._countElement
    ) {
      return;
    }

    const finalId = this.id || this._uniqueId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const countId = `${finalId}-count`;

    if (this.hasAttribute('value')) {
      this._textareaElement.value = this.getAttribute('value') || '';
    }
    this._textareaElement.placeholder = this.getAttribute('placeholder') || '';
    this._textareaElement.name = this.getAttribute('name') || '';
    this._textareaElement.disabled = this.disabled;
    this._textareaElement.readOnly = this.hasAttribute('readonly');

    if (this.hasAttribute('rows')) {
      this._textareaElement.rows = parseInt(this.getAttribute('rows')!, 10);
    }
    if (this.hasAttribute('cols')) {
      this._textareaElement.cols = parseInt(this.getAttribute('cols')!, 10);
    }
    if (this.maxLength !== undefined) {
      this._textareaElement.maxLength = this.maxLength;
    } else {
      this._textareaElement.removeAttribute('maxlength');
    }

    if (this.required) {
      this._textareaElement.setAttribute('required', '');
    } else {
      this._textareaElement.removeAttribute('required');
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
      'form-textarea',
      isError ? 'form-textarea--error' : '',
      this.disabled ? 'form-textarea--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
    this._textareaElement.className = classes;

    const describedByParts: string[] = [];

    if (isError) {
      this._textareaElement.setAttribute('aria-invalid', 'true');
      describedByParts.push(errorId);
      this._errorElement.textContent = this.error;
      this._errorElement.style.display = '';
      this._helperElement.style.display = 'none';
    } else {
      this._textareaElement.removeAttribute('aria-invalid');
      this._errorElement.style.display = 'none';
      if (this.helperText) {
        describedByParts.push(helperId);
        this._helperElement.textContent = this.helperText;
        this._helperElement.style.display = '';
      } else {
        this._helperElement.style.display = 'none';
      }
    }

    this._updateCharCount();
    if (this.showCount && this.maxLength) {
      describedByParts.push(countId);
    }

    if (describedByParts.length > 0) {
      this._textareaElement.setAttribute('aria-describedby', describedByParts.join(' '));
    } else {
      this._textareaElement.removeAttribute('aria-describedby');
    }
  }
}

export function registerTextarea(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-textarea')) {
    customElements.define('a11y-textarea', A11yTextarea);
  }
}

if (typeof customElements !== 'undefined') {
  registerTextarea();
}
