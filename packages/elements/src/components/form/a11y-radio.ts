let nextRadioId = 0;

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Accessible Radio Web Component (<a11y-radio>)
 *
 * Exact HTML5 parity with React Radio:
 * - WCAG 1.3.1 Info and Relationships: Proper fieldset/legend semantics or radiogroup with aria-labelledby
 * - WCAG 2.1.1 Keyboard: Native arrow key navigation within radio group
 * - WCAG 4.1.2 Name, Role, Value: Radio input and radiogroup ARIA attributes
 * - Light DOM rendering preserving CSS classes 1:1 with Radio.css
 *
 * Supports both:
 * 1. Radio Group mode with `options` array (identical to React <Radio>):
 *    `<a11y-radio name="contact" label="Preferred contact method" options='[{"value":"email","label":"Email"},{"value":"phone","label":"Phone"}]' value="email"></a11y-radio>`
 * 2. Composable child options:
 *    `<a11y-radio name="contact" label="Preferred contact method" value="email">
 *       <a11y-radio-option value="email" label="Email"></a11y-radio-option>
 *       <a11y-radio-option value="phone" label="Phone"></a11y-radio-option>
 *     </a11y-radio>`
 * 3. Standalone single radio mode:
 *    `<a11y-radio name="plan" value="free" label="Free Tier" checked></a11y-radio>`
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
    'options',
  ];

  public static get observedAttributes(): string[] {
    return A11yRadio.OBSERVED_ATTRS;
  }

  private _options: RadioOption[] = [];
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-radio-${++nextRadioId}`;
  }

  get options(): RadioOption[] {
    return this._options;
  }

  set options(val: RadioOption[] | string) {
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        this._options = Array.isArray(parsed) ? parsed : [];
      } catch {
        this._options = [];
      }
    } else if (Array.isArray(val)) {
      this._options = [...val];
    } else {
      this._options = [];
    }
    if (this._isInitialized) {
      this._render();
    }
  }

  get checked(): boolean {
    const checkedInput = this.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if (checkedInput) return true;
    return this.hasAttribute('checked');
  }

  set checked(val: boolean) {
    if (val) {
      this.setAttribute('checked', '');
      const input = this.querySelector<HTMLInputElement>('input[type="radio"]');
      if (input) input.checked = true;
    } else {
      this.removeAttribute('checked');
      const input = this.querySelector<HTMLInputElement>('input[type="radio"]');
      if (input) input.checked = false;
    }
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(val: string) {
    this.setAttribute('name', val);
  }

  get value(): string {
    const checkedInput = this.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if (checkedInput) return checkedInput.value;
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
    const inputs = this.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    inputs.forEach((input) => {
      input.checked = input.value === val;
    });
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
    // If options was passed as attribute string and not yet parsed
    if (this._options.length === 0 && this.hasAttribute('options')) {
      const attrVal = this.getAttribute('options');
      if (attrVal) {
        this.options = attrVal;
      }
    }

    // Extract options from child <a11y-radio-option> elements if provided
    if (this._options.length === 0) {
      const childOptions = Array.from(this.querySelectorAll('a11y-radio-option'));
      if (childOptions.length > 0) {
        this._options = childOptions.map((opt) => ({
          value: opt.getAttribute('value') || '',
          label: opt.getAttribute('label') || opt.textContent?.trim() || '',
          disabled: opt.hasAttribute('disabled'),
        }));
      }
    }

    this._render();
    this._isInitialized = true;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this._isInitialized || oldValue === newValue) return;

    if (name === 'options') {
      this.options = newValue || '';
      return;
    }

    if (name === 'value') {
      const inputs = this.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      inputs.forEach((input) => {
        input.checked = input.value === newValue;
      });
      return;
    }

    this._render();
  }

  private _render(): void {
    const finalId = this.id || this._uniqueId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const labelId = `${finalId}-label`;

    const describedBy = [
      this.getAttribute('aria-describedby'),
      this.error ? errorId : null,
      this.helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ');

    this.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'form-radio-wrapper';

    // If options array is provided: Render Full Radio Group (1:1 with React Radio)
    if (this._options.length > 0) {
      if (this.label) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'form-radio-label';

        const labelSpan = document.createElement('span');
        labelSpan.id = labelId;
        labelSpan.className = 'form-label';
        labelSpan.textContent = this.label;

        if (this.required) {
          const reqSpan = document.createElement('span');
          reqSpan.className = 'form-label__required';
          reqSpan.setAttribute('aria-hidden', 'true');
          reqSpan.textContent = ' *';
          labelSpan.appendChild(reqSpan);
        }

        labelDiv.appendChild(labelSpan);
        wrapper.appendChild(labelDiv);
      }

      const groupDiv = document.createElement('div');
      groupDiv.className = 'form-radio-group';
      groupDiv.setAttribute('role', 'radiogroup');
      if (this.label) {
        groupDiv.setAttribute('aria-labelledby', labelId);
      }
      if (describedBy) {
        groupDiv.setAttribute('aria-describedby', describedBy);
      }
      if (this.error) {
        groupDiv.setAttribute('aria-invalid', 'true');
      }

      this._options.forEach((option, index) => {
        const optionId = `${finalId}-${index}`;
        const optionDiv = document.createElement('div');
        optionDiv.className = 'form-radio-option';

        const input = document.createElement('input');
        input.id = optionId;
        input.type = 'radio';
        input.name = this.name;
        input.value = option.value;
        input.className = ['form-radio', this.error ? 'form-radio--error' : '']
          .filter(Boolean)
          .join(' ');
        input.disabled = Boolean(option.disabled || this.disabled);
        if (this.required) input.required = true;

        if (this.value === option.value) {
          input.checked = true;
        }

        input.addEventListener('change', () => {
          if (input.checked) {
            this.setAttribute('value', option.value);
            this.dispatchEvent(
              new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: option.value },
              })
            );
          }
        });

        const optLabel = document.createElement('label');
        optLabel.htmlFor = optionId;
        optLabel.className = 'form-radio-label';
        optLabel.textContent = option.label;

        optionDiv.appendChild(input);
        optionDiv.appendChild(optLabel);
        groupDiv.appendChild(optionDiv);
      });

      wrapper.appendChild(groupDiv);

      if (this.helperText && !this.error) {
        const helper = document.createElement('span');
        helper.id = helperId;
        helper.className = 'form-helper-text';
        helper.textContent = this.helperText;
        wrapper.appendChild(helper);
      }

      if (this.error) {
        const errorSpan = document.createElement('span');
        errorSpan.id = errorId;
        errorSpan.className = 'form-error-text';
        errorSpan.setAttribute('role', 'alert');
        errorSpan.textContent = this.error;
        wrapper.appendChild(errorSpan);
      }

      this.appendChild(wrapper);
      return;
    }

    // Standalone single radio option mode
    const optionDiv = document.createElement('div');
    optionDiv.className = 'form-radio-option';

    const input = document.createElement('input');
    input.id = finalId;
    input.type = 'radio';
    input.name = this.name;
    input.value = this.value;
    input.className = ['form-radio', this.error ? 'form-radio--error' : ''].filter(Boolean).join(' ');
    input.checked = this.hasAttribute('checked');
    input.disabled = this.disabled;
    if (this.required) input.required = true;

    if (this.error) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
    } else if (this.helperText) {
      input.setAttribute('aria-describedby', helperId);
    }

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

    const optLabel = document.createElement('label');
    optLabel.htmlFor = finalId;
    optLabel.className = 'form-radio-label';
    optLabel.textContent = this.label;

    optionDiv.appendChild(input);
    optionDiv.appendChild(optLabel);
    wrapper.appendChild(optionDiv);

    if (this.helperText && !this.error) {
      const helper = document.createElement('span');
      helper.id = helperId;
      helper.className = 'form-helper-text';
      helper.textContent = this.helperText;
      wrapper.appendChild(helper);
    }

    if (this.error) {
      const errorSpan = document.createElement('span');
      errorSpan.id = errorId;
      errorSpan.className = 'form-error-text';
      errorSpan.setAttribute('role', 'alert');
      errorSpan.textContent = this.error;
      wrapper.appendChild(errorSpan);
    }

    this.appendChild(wrapper);
  }
}

export class A11yRadioOption extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ['value', 'label', 'disabled'];
  }
}

export function registerRadio(): void {
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('a11y-radio')) {
      customElements.define('a11y-radio', A11yRadio);
    }
    if (!customElements.get('a11y-radio-option')) {
      customElements.define('a11y-radio-option', A11yRadioOption);
    }
  }
}

if (typeof customElements !== 'undefined') {
  registerRadio();
}
