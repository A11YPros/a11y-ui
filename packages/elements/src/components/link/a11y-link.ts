/**
 * Accessible Link Web Component (<a11y-link>)
 *
 * Exact HTML5 parity with React Link:
 * - WCAG 2.4.4 Link Purpose: External link indicator and accessible label
 * - WCAG 2.4.7 Focus Visible: Focus outline on link
 * - Automatic noopener noreferrer on external targets
 * - Light DOM rendering preserving CSS classes 1:1 with Link.css
 *
 * @example
 * ```html
 * <a11y-link href="https://example.com" external>Visit Example</a11y-link>
 * ```
 */
export class A11yLink extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'href',
    'external',
    'skip',
    'target',
    'rel',
    'aria-label',
  ];

  public static get observedAttributes(): string[] {
    return A11yLink.OBSERVED_ATTRS;
  }

  private _anchor: HTMLAnchorElement | HTMLButtonElement | null = null;
  private _contentSpan: HTMLSpanElement | null = null;
  private _iconSpan: HTMLSpanElement | null = null;
  private _isInitialized = false;

  get href(): string {
    return this.getAttribute('href') || '';
  }

  set href(val: string) {
    this.setAttribute('href', val);
  }

  get external(): boolean {
    const isExplicit = this.hasAttribute('external');
    const href = this.href;
    return (
      isExplicit ||
      Boolean(
        href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'))
      )
    );
  }

  set external(val: boolean) {
    if (val) {
      this.setAttribute('external', '');
    } else {
      this.removeAttribute('external');
    }
  }

  get skip(): boolean {
    return this.hasAttribute('skip');
  }

  set skip(val: boolean) {
    if (val) {
      this.setAttribute('skip', '');
    } else {
      this.removeAttribute('skip');
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

    const isSkipButton = this.skip && !this.href;
    const el = isSkipButton ? document.createElement('button') : document.createElement('a');

    const contentSpan = document.createElement('span');
    contentSpan.className = 'link__text';
    initialChildren.forEach((child) => contentSpan.appendChild(child));

    const iconSpan = document.createElement('span');
    iconSpan.className = 'link__external-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = ' ↗';

    el.appendChild(contentSpan);
    el.appendChild(iconSpan);
    this.appendChild(el);

    this._anchor = el;
    this._contentSpan = contentSpan;
    this._iconSpan = iconSpan;
  }

  private _updateState(): void {
    if (!this._anchor || !this._iconSpan) return;

    const isExt = this.external;
    const classes = ['link', this.skip ? 'link--skip' : ''].filter(Boolean).join(' ');
    this._anchor.className = classes;

    if (this._anchor instanceof HTMLAnchorElement) {
      this._anchor.href = this.href;

      if (isExt) {
        this._anchor.target = this.getAttribute('target') || '_blank';
        this._anchor.rel = this.getAttribute('rel') || 'noopener noreferrer';
        this._iconSpan.style.display = '';

        const customAria = this.getAttribute('aria-label');
        if (customAria) {
          this._anchor.setAttribute('aria-label', `${customAria} (opens in new tab)`);
        } else if (this._anchor.target === '_blank') {
          const text = this._contentSpan?.textContent || '';
          this._anchor.setAttribute('aria-label', `${text} (opens in new tab)`);
        }
      } else {
        if (this.hasAttribute('target')) this._anchor.target = this.getAttribute('target')!;
        if (this.hasAttribute('rel')) this._anchor.rel = this.getAttribute('rel')!;
        this._iconSpan.style.display = 'none';
        if (this.hasAttribute('aria-label')) {
          this._anchor.setAttribute('aria-label', this.getAttribute('aria-label')!);
        } else {
          this._anchor.removeAttribute('aria-label');
        }
      }
    }
  }
}

export function registerLink(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-link')) {
    customElements.define('a11y-link', A11yLink);
  }
}

if (typeof customElements !== 'undefined') {
  registerLink();
}
