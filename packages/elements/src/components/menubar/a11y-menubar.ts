let nextMenubarId = 0;

/**
 * Accessible Menubar Web Component (<a11y-menubar>)
 *
 * Exact HTML5 parity with React Menubar:
 * - WCAG 2.1.1 Keyboard: Left/Right arrow cycling of menus, single tab stop
 * - WCAG 4.1.2 Name, Role, Value: role="menubar" container
 * - Light DOM rendering preserving CSS classes 1:1 with Menubar.css
 *
 * @example
 * ```html
 * <a11y-menubar label="Application menu">
 *   <a11y-menu label="File">...</a11y-menu>
 *   <a11y-menu label="Edit">...</a11y-menu>
 *   <a11y-menu label="View">...</a11y-menu>
 * </a11y-menubar>
 * ```
 */
export class A11yMenubar extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['label', 'orientation'];

  public static get observedAttributes(): string[] {
    return A11yMenubar.OBSERVED_ATTRS;
  }

  private _container: HTMLDivElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-menubar-${++nextMenubarId}`;
  }

  get orientation(): 'horizontal' | 'vertical' {
    return this.getAttribute('orientation') === 'vertical' ? 'vertical' : 'horizontal';
  }

  set orientation(val: 'horizontal' | 'vertical') {
    this.setAttribute('orientation', val);
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(val: string) {
    this.setAttribute('label', val);
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
    const initialMenus = Array.from(this.children);
    this.innerHTML = '';

    const bar = document.createElement('div');
    bar.id = this.id || this._uniqueId;
    bar.setAttribute('role', 'menubar');
    bar.className = 'a11y-menubar';
    bar.setAttribute('aria-orientation', this.orientation);
    if (this.label) bar.setAttribute('aria-label', this.label);

    initialMenus.forEach((menu, index) => {
      bar.appendChild(menu);
      const trigger = menu.querySelector<HTMLElement>('[aria-haspopup="menu"]');
      if (trigger) {
        trigger.setAttribute('role', 'menuitem');
        trigger.tabIndex = index === 0 ? 0 : -1;
      }
    });

    bar.addEventListener('keydown', (e) => this._handleKeyDown(e));

    this.appendChild(bar);
    this._container = bar;
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    const triggers = Array.from(this.querySelectorAll<HTMLElement>('[aria-haspopup="menu"]'));
    const activeEl = document.activeElement as HTMLElement;
    const currentIndex = triggers.indexOf(activeEl);

    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (currentIndex + 1) % triggers.length;
      triggers[currentIndex].tabIndex = -1;
      triggers[next].tabIndex = 0;
      triggers[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (currentIndex - 1 + triggers.length) % triggers.length;
      triggers[currentIndex].tabIndex = -1;
      triggers[prev].tabIndex = 0;
      triggers[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      triggers[currentIndex].tabIndex = -1;
      triggers[0].tabIndex = 0;
      triggers[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      triggers[currentIndex].tabIndex = -1;
      triggers[triggers.length - 1].tabIndex = 0;
      triggers[triggers.length - 1]?.focus();
    }
  }

  private _updateState(): void {
    if (!this._container) return;
    this._container.setAttribute('aria-orientation', this.orientation);
    if (this.label) {
      this._container.setAttribute('aria-label', this.label);
    } else {
      this._container.removeAttribute('aria-label');
    }
  }
}

export function registerMenubar(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-menubar')) {
    customElements.define('a11y-menubar', A11yMenubar);
  }
}

if (typeof customElements !== 'undefined') {
  registerMenubar();
}
