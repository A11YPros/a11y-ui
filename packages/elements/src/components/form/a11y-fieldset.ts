/**
 * Accessible Fieldset Web Component (<a11y-fieldset>)
 *
 * Exact HTML5 parity with React Fieldset:
 * - WCAG 1.3.1 Info and Relationships: Native <fieldset> and <legend> structure
 * - WCAG 4.1.2 Name, Role, Value: Semantic grouping of form controls
 * - Light DOM rendering preserving CSS classes 1:1 with Fieldset.css
 *
 * @example
 * ```html
 * <a11y-fieldset legend="Payment Information" required>
 *   <a11y-input label="Card Number" required></a11y-input>
 * </a11y-fieldset>
 * ```
 */
export class A11yFieldset extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['legend', 'legend-hidden', 'required', 'disabled'];

  public static get observedAttributes(): string[] {
    return A11yFieldset.OBSERVED_ATTRS;
  }

  private _fieldsetElement: HTMLFieldSetElement | null = null;
  private _legendElement: HTMLLegendElement | null = null;
  private _requiredNote: HTMLParagraphElement | null = null;
  private _isInitialized = false;

  get legend(): string {
    return this.getAttribute('legend') || '';
  }

  set legend(val: string) {
    this.setAttribute('legend', val);
  }

  get legendHidden(): boolean {
    return this.hasAttribute('legend-hidden');
  }

  set legendHidden(val: boolean) {
    if (val) {
      this.setAttribute('legend-hidden', '');
    } else {
      this.removeAttribute('legend-hidden');
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

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'form-fieldset';

    const legend = document.createElement('legend');
    legend.className = 'form-legend';

    const reqP = document.createElement('p');
    reqP.className = 'fieldset__required';
    reqP.innerHTML =
      ' <span class="fieldset__required-indicator">*</span> indicates a required field.';

    fieldset.appendChild(legend);
    fieldset.appendChild(reqP);
    initialChildren.forEach((child) => fieldset.appendChild(child));
    this.appendChild(fieldset);

    this._fieldsetElement = fieldset;
    this._legendElement = legend;
    this._requiredNote = reqP;
  }

  private _updateState(): void {
    if (!this._fieldsetElement || !this._legendElement || !this._requiredNote) return;

    this._fieldsetElement.disabled = this.disabled;

    if (this.legend) {
      this._legendElement.style.display = '';
      this._legendElement.textContent = this.legend;
      this._legendElement.className = [
        'form-legend',
        this.legendHidden ? 'form-legend--hidden' : '',
      ]
        .filter(Boolean)
        .join(' ');
    } else {
      this._legendElement.style.display = 'none';
    }

    this._requiredNote.style.display = this.required ? '' : 'none';
  }
}

export function registerFieldset(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-fieldset')) {
    customElements.define('a11y-fieldset', A11yFieldset);
  }
}

if (typeof customElements !== 'undefined') {
  registerFieldset();
}
