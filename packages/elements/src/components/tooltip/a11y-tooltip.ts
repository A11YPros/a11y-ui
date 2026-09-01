let nextTooltipId = 0;

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Accessible Tooltip Web Component (<a11y-tooltip>)
 *
 * Exact HTML5 parity with React Tooltip:
 * - WCAG 2.1.1 Keyboard: Accessible on focus and hover, dismissible via Escape
 * - WCAG 4.1.2 Name, Role, Value: role="tooltip" with aria-describedby
 * - Light DOM rendering preserving CSS classes 1:1 with Tooltip.css
 *
 * @example
 * ```html
 * <a11y-tooltip content="More information" placement="top">
 *   <button type="button">Help</button>
 * </a11y-tooltip>
 * ```
 */
export class A11yTooltip extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['content', 'heading', 'placement', 'open'];

  public static get observedAttributes(): string[] {
    return A11yTooltip.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLSpanElement | null = null;
  private _triggerWrapper: HTMLSpanElement | null = null;
  private _tooltipElement: HTMLSpanElement | null = null;
  private _headingElement: HTMLElement | null = null;
  private _contentElement: HTMLSpanElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-tooltip-${++nextTooltipId}`;
  }

  get content(): string {
    return this.getAttribute('content') || '';
  }

  set content(val: string) {
    this.setAttribute('content', val);
  }

  get heading(): string {
    return this.getAttribute('heading') || '';
  }

  set heading(val: string) {
    this.setAttribute('heading', val);
  }

  get placement(): TooltipPlacement {
    const p = this.getAttribute('placement');
    return p === 'top' || p === 'bottom' || p === 'left' ? p : 'right';
  }

  set placement(val: TooltipPlacement) {
    this.setAttribute('placement', val);
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(val: boolean) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
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

  public show(): void {
    this.open = true;
  }

  public hide(): void {
    this.open = false;
  }

  private _render(): void {
    const initialChildren = Array.from(this.childNodes);
    const tooltipId = `${this._uniqueId}-tip`;

    this.innerHTML = '';

    const wrapper = document.createElement('span');
    wrapper.className = 'a11y-tooltip-wrapper';

    const triggerWrap = document.createElement('span');
    triggerWrap.className = 'a11y-tooltip-trigger-wrap';

    if (initialChildren.length > 0) {
      initialChildren.forEach((child) => triggerWrap.appendChild(child));
    } else {
      const defaultBtn = document.createElement('button');
      defaultBtn.type = 'button';
      defaultBtn.className = 'a11y-tooltip-icon-btn';
      defaultBtn.setAttribute('aria-label', 'Help');

      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'a11y-tooltip-icon-svg');
      svg.setAttribute('viewBox', '0 0 20 20');
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('aria-hidden', 'true');

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute(
        'd',
        'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
      );
      path.setAttribute('clip-rule', 'evenodd');
      svg.appendChild(path);
      defaultBtn.appendChild(svg);
      triggerWrap.appendChild(defaultBtn);
    }

    triggerWrap.setAttribute('aria-describedby', tooltipId);

    const tooltip = document.createElement('span');
    tooltip.id = tooltipId;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.className = `a11y-tooltip a11y-tooltip--${this.placement}`;

    const arrow = document.createElement('span');
    arrow.className = 'a11y-tooltip-arrow';

    const headingEl = document.createElement('strong');
    headingEl.className = 'a11y-tooltip-heading';

    const contentEl = document.createElement('span');
    contentEl.className = 'a11y-tooltip-content';

    tooltip.appendChild(arrow);
    tooltip.appendChild(headingEl);
    tooltip.appendChild(contentEl);

    wrapper.appendChild(triggerWrap);
    wrapper.appendChild(tooltip);
    this.appendChild(wrapper);

    // Event listeners
    const trigger = triggerWrap.firstElementChild || triggerWrap;
    trigger.addEventListener('mouseenter', () => this.show());
    trigger.addEventListener('mouseleave', () => this.hide());
    trigger.addEventListener('focusin', () => this.show());
    trigger.addEventListener('focusout', () => this.hide());
    trigger.addEventListener('keydown', (e: Event) => {
      if ((e as KeyboardEvent).key === 'Escape' && this.open) {
        this.hide();
      }
    });

    this._wrapper = wrapper;
    this._triggerWrapper = triggerWrap;
    this._tooltipElement = tooltip;
    this._headingElement = headingEl;
    this._contentElement = contentEl;
  }

  private _updateState(): void {
    if (!this._tooltipElement || !this._headingElement || !this._contentElement) return;

    this._tooltipElement.className = `a11y-tooltip a11y-tooltip--${this.placement}`;

    if (this.heading) {
      this._headingElement.textContent = this.heading;
      this._headingElement.style.display = '';
    } else {
      this._headingElement.style.display = 'none';
    }

    this._contentElement.textContent = this.content;
    this._tooltipElement.style.display = this.open ? '' : 'none';
  }
}

export function registerTooltip(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-tooltip')) {
    customElements.define('a11y-tooltip', A11yTooltip);
  }
}

if (typeof customElements !== 'undefined') {
  registerTooltip();
}
