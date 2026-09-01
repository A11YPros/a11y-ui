/**
 * Accessible Label Web Component (<a11y-label>)
 *
 * Exact HTML5 parity with React Label:
 * - WCAG 1.3.1 Info and Relationships: Native <label for="..."> association
 * - WCAG 2.5.3 Label in Name: Label text matches accessible name
 * - Light DOM rendering preserving CSS classes 1:1 with Label.css
 *
 * @example
 * ```html
 * <a11y-label for="email" required>Email address</a11y-label>
 * <input id="email" type="email" class="form-input" />
 * ```
 */
export class A11yLabel extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['for', 'htmlfor', 'required'];

  public static get observedAttributes(): string[] {
    return A11yLabel.OBSERVED_ATTRS;
  }

  private _labelElement: HTMLLabelElement | null = null;
  private _textSpan: HTMLSpanElement | null = null;
  private _reqSpan: HTMLSpanElement | null = null;
  private _isInitialized = false;

  get htmlFor(): string {
    return this.getAttribute('for') || this.getAttribute('htmlfor') || '';
  }

  set htmlFor(val: string) {
    this.setAttribute('for', val);
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
    const initialChildren = Array.from(this.childNodes);
    this.innerHTML = '';

    const label = document.createElement('label');
    label.className = 'form-label';

    const textSpan = document.createElement('span');
    textSpan.className = 'form-label__text';
    initialChildren.forEach((child) => textSpan.appendChild(child));

    const reqSpan = document.createElement('span');
    reqSpan.className = 'form-label__required';
    reqSpan.setAttribute('aria-hidden', 'true');
    reqSpan.textContent = ' *';

    label.appendChild(textSpan);
    label.appendChild(reqSpan);
    this.appendChild(label);

    this._labelElement = label;
    this._textSpan = textSpan;
    this._reqSpan = reqSpan;
  }

  private _updateState(): void {
    if (!this._labelElement || !this._reqSpan) return;

    const targetFor = this.htmlFor;
    if (targetFor) {
      this._labelElement.htmlFor = targetFor;
    } else {
      this._labelElement.removeAttribute('for');
    }

    this._labelElement.className = ['form-label', this.required ? 'form-label--required' : '']
      .filter(Boolean)
      .join(' ');

    this._reqSpan.style.display = this.required ? '' : 'none';
  }
}

export function registerLabel(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-label')) {
    customElements.define('a11y-label', A11yLabel);
  }
}

if (typeof customElements !== 'undefined') {
  registerLabel();
}
