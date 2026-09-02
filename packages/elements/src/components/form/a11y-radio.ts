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
  private _wrapper: HTMLDivElement | null = null;
  private _groupDiv: HTMLDivElement | null = null;
  private _groupLabelDiv: HTMLDivElement | null = null;
  private _groupLabelSpan: HTMLSpanElement | null = null;
  private _helperElement: HTMLSpanElement | null = null;
  private _errorElement: HTMLSpanElement | null = null;
  private _inputs: HTMLInputElement[] = [];
  private _optionLabels: HTMLLabelElement[] = [];
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
      this._updateState();
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

    if (!this._isInitialized) {
      this._render();
      this._isInitialized = true;
    }
    this._updateState();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this._isInitialized || oldValue === newValue) return;

    if (name === 'options') {
      // Structural change: the set of inputs is different, so a rebuild is required.
      this.options = newValue || '';
      return;
    }

    if (name === 'value') {
      if (this._options.length > 0) {
        this._inputs.forEach((input) => {
          input.checked = input.value === newValue;
        });
      } else if (this._inputs[0]) {
        this._inputs[0].value = newValue || '';
      }
      return;
    }

    // Every other attribute (checked, label, name, error, helper-text, required,
    // disabled) is applied in place so a focused radio is never detached
    // (WCAG 2.4.3 Focus Order, 3.2.2 On Input).
    this._updateState();
  }

  override focus(options?: FocusOptions): void {
    const target =
      this._inputs.find((input) => input.checked && !input.disabled) ||
      this._inputs.find((input) => !input.disabled);
    target?.focus(options);
  }

  private _baseId(): string {
    return this.getAttribute('input-id') || this.getAttribute('data-input-id') || this._uniqueId;
  }

  private _render(): void {
    const hostId = this.getAttribute('id');
    if (hostId) {
      // Move the id onto the native control(s) so <label for> resolves to a
      // labelable element rather than the host.
      this.removeAttribute('id');
      this.setAttribute('data-input-id', hostId);
    }

    const finalId = this._baseId();
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const labelId = `${finalId}-label`;

    this.innerHTML = '';
    this._inputs = [];
    this._optionLabels = [];

    const wrapper = document.createElement('div');
    wrapper.className = 'form-radio-wrapper';

    const helper = document.createElement('span');
    helper.id = helperId;
    helper.className = 'form-helper-text';
    helper.style.display = 'none';

    const error = document.createElement('span');
    error.id = errorId;
    error.className = 'form-error-text';
    error.setAttribute('role', 'alert');
    error.style.display = 'none';

    if (this._options.length > 0) {
      // Radio Group mode (1:1 with React Radio)
      const labelDiv = document.createElement('div');
      labelDiv.className = 'form-radio-label';

      const labelSpan = document.createElement('span');
      labelSpan.id = labelId;
      labelSpan.className = 'form-label';

      labelDiv.appendChild(labelSpan);
      wrapper.appendChild(labelDiv);

      const groupDiv = document.createElement('div');
      groupDiv.className = 'form-radio-group';
      groupDiv.setAttribute('role', 'radiogroup');

      this._options.forEach((option, index) => {
        const optionId = `${finalId}-${index}`;
        const optionDiv = document.createElement('div');
        optionDiv.className = 'form-radio-option';

        const input = document.createElement('input');
        input.id = optionId;
        input.type = 'radio';
        input.value = option.value;
        input.className = 'form-radio';
        if ((this.getAttribute('value') || '') === option.value) {
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

        this._inputs.push(input);
        this._optionLabels.push(optLabel);
      });

      wrapper.appendChild(groupDiv);

      this._groupLabelDiv = labelDiv;
      this._groupLabelSpan = labelSpan;
      this._groupDiv = groupDiv;
    } else {
      // Standalone single radio option mode
      const optionDiv = document.createElement('div');
      optionDiv.className = 'form-radio-option';

      const input = document.createElement('input');
      input.id = finalId;
      input.type = 'radio';
      input.value = this.getAttribute('value') || '';
      input.className = 'form-radio';
      input.checked = this.hasAttribute('checked');

      input.addEventListener('change', () => {
        if (input.checked) {
          // Native radio grouping unchecked the siblings; mirror that on their hosts
          // so a later attribute update does not re-check a stale `checked`.
          const scope: ParentNode = this.closest('form') || this.ownerDocument;
          scope.querySelectorAll<A11yRadio>('a11y-radio[checked]').forEach((sibling) => {
            if (sibling !== this && sibling.name === this.name) {
              sibling.removeAttribute('checked');
            }
          });
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

      optionDiv.appendChild(input);
      optionDiv.appendChild(optLabel);
      wrapper.appendChild(optionDiv);

      this._inputs.push(input);
      this._optionLabels.push(optLabel);
      this._groupLabelDiv = null;
      this._groupLabelSpan = null;
      this._groupDiv = null;
    }

    wrapper.appendChild(helper);
    wrapper.appendChild(error);
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._helperElement = helper;
    this._errorElement = error;
  }

  private _updateState(): void {
    if (!this._wrapper || !this._helperElement || !this._errorElement) return;

    const finalId = this._baseId();
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;
    const labelId = `${finalId}-label`;
    const isGroup = this._options.length > 0;
    const hasError = Boolean(this.error);
    const showHelper = Boolean(this.helperText) && !hasError;

    const describedBy = [
      this.getAttribute('aria-describedby'),
      hasError ? errorId : null,
      showHelper ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ');

    // Inputs
    this._inputs.forEach((input, index) => {
      input.name = this.name;
      input.className = ['form-radio', hasError ? 'form-radio--error' : ''].filter(Boolean).join(' ');
      input.required = this.required;
      const optionDisabled = isGroup ? Boolean(this._options[index]?.disabled) : false;
      input.disabled = optionDisabled || this.disabled;
    });

    if (isGroup) {
      if (this._groupLabelSpan && this._groupLabelDiv) {
        this._groupLabelSpan.textContent = this.label;
        if (this.required && this.label) {
          const reqSpan = document.createElement('span');
          reqSpan.className = 'form-label__required';
          reqSpan.setAttribute('aria-hidden', 'true');
          reqSpan.textContent = ' *';
          this._groupLabelSpan.appendChild(reqSpan);
        }
        this._groupLabelDiv.style.display = this.label ? '' : 'none';
      }

      if (this._groupDiv) {
        if (this.label) {
          this._groupDiv.setAttribute('aria-labelledby', labelId);
        } else {
          this._groupDiv.removeAttribute('aria-labelledby');
        }
        if (describedBy) {
          this._groupDiv.setAttribute('aria-describedby', describedBy);
        } else {
          this._groupDiv.removeAttribute('aria-describedby');
        }
        if (hasError) {
          this._groupDiv.setAttribute('aria-invalid', 'true');
        } else {
          this._groupDiv.removeAttribute('aria-invalid');
        }
      }
    } else {
      const input = this._inputs[0];
      const optLabel = this._optionLabels[0];
      if (input) {
        input.checked = this.hasAttribute('checked');
        if (describedBy) {
          input.setAttribute('aria-describedby', describedBy);
        } else {
          input.removeAttribute('aria-describedby');
        }
        if (hasError) {
          input.setAttribute('aria-invalid', 'true');
        } else {
          input.removeAttribute('aria-invalid');
        }
      }
      if (optLabel) {
        optLabel.textContent = this.label;
      }
    }

    // Helper / error text. Show the alert region before filling it so AT announces the change.
    if (showHelper) {
      this._helperElement.textContent = this.helperText;
      this._helperElement.style.display = '';
    } else {
      this._helperElement.style.display = 'none';
      this._helperElement.textContent = '';
    }

    if (hasError) {
      this._errorElement.style.display = '';
      this._errorElement.textContent = this.error;
    } else {
      this._errorElement.style.display = 'none';
      this._errorElement.textContent = '';
    }
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
