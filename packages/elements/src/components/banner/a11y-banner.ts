export type BannerVariant = 'info' | 'success' | 'warning' | 'error' | 'critical';

const ARIA_MAP: Record<BannerVariant, { live: 'polite' | 'assertive'; atomic: 'true' | 'false' }> =
  {
    info: { live: 'polite', atomic: 'false' },
    success: { live: 'polite', atomic: 'false' },
    warning: { live: 'assertive', atomic: 'true' },
    error: { live: 'assertive', atomic: 'true' },
    critical: { live: 'assertive', atomic: 'true' },
  };

function createSvgIcon(variant: BannerVariant): SVGElement {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('class', 'banner__variant-icon');

  if (variant === 'info') {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '10');
    circle.setAttribute('cy', '10');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '1.8');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M10 8V14');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-linecap', 'round');

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', '10');
    dot.setAttribute('cy', '5.75');
    dot.setAttribute('r', '1');
    dot.setAttribute('fill', 'currentColor');

    svg.appendChild(circle);
    svg.appendChild(path);
    svg.appendChild(dot);
  } else if (variant === 'success') {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '10');
    circle.setAttribute('cy', '10');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '1.8');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M6.5 10.25L8.9 12.65L13.5 8.05');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.9');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    svg.appendChild(circle);
    svg.appendChild(path);
  } else if (variant === 'warning') {
    const tri = document.createElementNS(svgNS, 'path');
    tri.setAttribute('d', 'M10 3.5L17 16.5H3L10 3.5Z');
    tri.setAttribute('fill', 'none');
    tri.setAttribute('stroke', 'currentColor');
    tri.setAttribute('stroke-width', '1.8');
    tri.setAttribute('stroke-linejoin', 'round');

    const line = document.createElementNS(svgNS, 'path');
    line.setAttribute('d', 'M10 7.5V11.75');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '1.8');
    line.setAttribute('stroke-linecap', 'round');

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', '10');
    dot.setAttribute('cy', '14.25');
    dot.setAttribute('r', '1');
    dot.setAttribute('fill', 'currentColor');

    svg.appendChild(tri);
    svg.appendChild(line);
    svg.appendChild(dot);
  } else if (variant === 'error') {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '10');
    circle.setAttribute('cy', '10');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '1.8');

    const line = document.createElementNS(svgNS, 'path');
    line.setAttribute('d', 'M10 6.5V11.5');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '1.8');
    line.setAttribute('stroke-linecap', 'round');

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', '10');
    dot.setAttribute('cy', '13.75');
    dot.setAttribute('r', '1');
    dot.setAttribute('fill', 'currentColor');

    svg.appendChild(circle);
    svg.appendChild(line);
    svg.appendChild(dot);
  } else {
    // critical
    const shield = document.createElementNS(svgNS, 'path');
    shield.setAttribute('d', 'M10 2.75L15.75 5V10L10 17.25L4.25 10V5L10 2.75Z');
    shield.setAttribute('fill', 'none');
    shield.setAttribute('stroke', 'currentColor');
    shield.setAttribute('stroke-width', '1.8');
    shield.setAttribute('stroke-linejoin', 'round');

    const line = document.createElementNS(svgNS, 'path');
    line.setAttribute('d', 'M10 6.5V11');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '1.8');
    line.setAttribute('stroke-linecap', 'round');

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', '10');
    dot.setAttribute('cy', '13.25');
    dot.setAttribute('r', '1');
    dot.setAttribute('fill', 'currentColor');

    svg.appendChild(shield);
    svg.appendChild(line);
    svg.appendChild(dot);
  }

  return svg;
}

/**
 * Accessible Banner Web Component (<a11y-banner>)
 *
 * Exact HTML5 parity with React Banner:
 * - WCAG 4.1.3 Status Messages: Appropriate aria-live and aria-atomic by variant
 * - WCAG 2.1.1 Keyboard: Dismissible with keyboard-focusable close button
 * - Light DOM rendering preserving CSS classes 1:1 with Banner.css
 *
 * @example
 * ```html
 * <a11y-banner variant="success" title="Profile updated" dismissible>
 *   Your preferences have been saved.
 * </a11y-banner>
 * ```
 */
export class A11yBanner extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['variant', 'title', 'dismissible', 'exposed'];

  public static get observedAttributes(): string[] {
    return A11yBanner.OBSERVED_ATTRS;
  }

  private _container: HTMLDivElement | null = null;
  private _iconWrap: HTMLSpanElement | null = null;
  private _titleElement: HTMLElement | null = null;
  private _bodyElement: HTMLDivElement | null = null;
  private _closeBtn: HTMLButtonElement | null = null;
  private _isInitialized = false;

  get variant(): BannerVariant {
    const v = this.getAttribute('variant');
    return v === 'success' || v === 'warning' || v === 'error' || v === 'critical' ? v : 'info';
  }

  set variant(val: BannerVariant) {
    this.setAttribute('variant', val);
  }

  get title(): string {
    return this.getAttribute('title') || '';
  }

  set title(val: string) {
    this.setAttribute('title', val);
  }

  get dismissible(): boolean {
    return this.hasAttribute('dismissible');
  }

  set dismissible(val: boolean) {
    if (val) {
      this.setAttribute('dismissible', '');
    } else {
      this.removeAttribute('dismissible');
    }
  }

  get exposed(): boolean {
    return this.getAttribute('exposed') !== 'false';
  }

  set exposed(val: boolean) {
    if (val) {
      this.removeAttribute('exposed');
    } else {
      this.setAttribute('exposed', 'false');
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

  public dismiss(): void {
    this.exposed = false;
    this.style.display = 'none';
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _render(): void {
    const initialChildren = Array.from(this.childNodes);
    this.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'banner';

    const contentWrap = document.createElement('div');
    contentWrap.className = 'banner__content-wrap';

    const iconWrap = document.createElement('span');
    iconWrap.className = 'banner__icon-wrap';

    const content = document.createElement('div');
    content.className = 'banner__content';

    const strongTitle = document.createElement('strong');
    strongTitle.className = 'banner__title';

    const body = document.createElement('div');
    body.className = 'banner__body';
    initialChildren.forEach((child) => body.appendChild(child));

    content.appendChild(strongTitle);
    content.appendChild(body);
    contentWrap.appendChild(iconWrap);
    contentWrap.appendChild(content);

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'banner__close';

    const svgNS = 'http://www.w3.org/2000/svg';
    const closeSvg = document.createElementNS(svgNS, 'svg');
    closeSvg.setAttribute('viewBox', '0 0 20 20');
    closeSvg.setAttribute('width', '18');
    closeSvg.setAttribute('height', '18');
    closeSvg.setAttribute('aria-hidden', 'true');
    closeSvg.setAttribute('class', 'banner__close-icon');

    const closePath = document.createElementNS(svgNS, 'path');
    closePath.setAttribute('d', 'M5 5L15 15M15 5L5 15');
    closePath.setAttribute('fill', 'none');
    closePath.setAttribute('stroke', 'currentColor');
    closePath.setAttribute('stroke-width', '2');
    closePath.setAttribute('stroke-linecap', 'round');
    closeSvg.appendChild(closePath);

    const srOnly = document.createElement('span');
    srOnly.className = 'sr-only';
    srOnly.textContent = 'Close';

    closeBtn.appendChild(closeSvg);
    closeBtn.appendChild(srOnly);
    closeBtn.addEventListener('click', () => this.dismiss());

    container.appendChild(contentWrap);
    container.appendChild(closeBtn);
    this.appendChild(container);

    this._container = container;
    this._iconWrap = iconWrap;
    this._titleElement = strongTitle;
    this._bodyElement = body;
    this._closeBtn = closeBtn;
  }

  private _updateState(): void {
    if (!this._container || !this._iconWrap || !this._titleElement || !this._closeBtn) return;

    if (!this.exposed) {
      this.style.display = 'none';
      return;
    }
    this.style.display = '';

    const aria = ARIA_MAP[this.variant];
    this._container.setAttribute('aria-live', aria.live);
    this._container.setAttribute('aria-atomic', aria.atomic);
    this._container.className = `banner banner--${this.variant}`;

    this._titleElement.textContent = this.title;

    this._iconWrap.innerHTML = '';
    this._iconWrap.appendChild(createSvgIcon(this.variant));

    this._closeBtn.style.display = this.dismissible ? '' : 'none';
  }
}

export function registerBanner(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-banner')) {
    customElements.define('a11y-banner', A11yBanner);
  }
}

if (typeof customElements !== 'undefined') {
  registerBanner();
}
