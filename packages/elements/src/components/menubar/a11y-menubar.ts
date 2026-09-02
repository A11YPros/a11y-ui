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

  /** Close all menus when clicking outside the menubar. Bound once for removal. */
  private _onDocumentClick = (e: MouseEvent): void => {
    const bar = this._container;
    if (!bar || bar.contains(e.target as Node)) return;
    bar.querySelectorAll<any>('a11y-menu').forEach((m) => {
      if (m.open) m.open = false;
    });
  };

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
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this._onDocumentClick);
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
    if (this.orientation === 'vertical') {
      bar.classList.add('a11y-menubar--vertical');
    }
    bar.setAttribute('aria-orientation', this.orientation);
    if (this.label) bar.setAttribute('aria-label', this.label);

    // Attach bar FIRST so that menus added to it have a valid closest('a11y-menubar')
    this.appendChild(bar);
    this._container = bar;

    initialMenus.forEach((menu, index) => {
      bar.appendChild(menu);
      menu.setAttribute('role', 'none');
      const trigger = menu.querySelector<HTMLElement>('[aria-haspopup="menu"]');
      if (trigger) {
        // Only strip button styling from generated triggers; leave custom ones alone.
        if (!menu.querySelector('[slot="trigger"]')) trigger.className = '';
        trigger.setAttribute('role', 'menuitem');
        trigger.tabIndex = index === 0 ? 0 : -1;
      }
    });

    // Single active menu coordination: when one menu opens, close all other menus!
    bar.addEventListener('menu-open', (e) => {
      const targetMenu = (e.target as HTMLElement).closest('a11y-menu');
      const allMenus = bar.querySelectorAll<any>('a11y-menu');
      allMenus.forEach((m) => {
        if (m !== targetMenu && m.open) {
          m.open = false;
        }
      });
    });

    bar.addEventListener('keydown', (e) => this._handleKeyDown(e));
  }

  public switchMenu(currentMenu: any, direction: 'next' | 'prev', focusFirstItem = false): void {
    const menus = Array.from(this.querySelectorAll<any>('a11y-menu'));
    if (menus.length <= 1) return;

    const currentIdx = menus.indexOf(currentMenu);
    if (currentIdx === -1) return;

    const nextIdx = direction === 'next'
      ? (currentIdx + 1) % menus.length
      : (currentIdx - 1 + menus.length) % menus.length;

    const nextMenu = menus[nextIdx];
    currentMenu.open = false;
    nextMenu.open = true;

    this._updateRovingTabIndex(nextIdx);

    if (focusFirstItem && typeof nextMenu.focusFirstItem === 'function') {
      nextMenu.focusFirstItem();
    } else if (typeof nextMenu.focusTrigger === 'function') {
      nextMenu.focusTrigger();
    }
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    const menus = Array.from(this.querySelectorAll('a11y-menu')) as any[];
    const triggers = menus
      .map((m) => m.querySelector('[aria-haspopup="menu"]') as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];
    const activeEl = document.activeElement as HTMLElement;
    const currentIndex = triggers.indexOf(activeEl);

    if (currentIndex === -1) return;

    const isHorizontal = this.orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    const anyOpenMenu = menus.find((m) => m.open);
    const isSubmenuOpen = Boolean(anyOpenMenu);

    if (e.key === nextKey) {
      e.preventDefault();
      const nextIdx = (currentIndex + 1) % menus.length;
      if (isSubmenuOpen) {
        anyOpenMenu!.open = false;
        menus[nextIdx].open = true;
      }
      this._updateRovingTabIndex(nextIdx);
      triggers[nextIdx]?.focus();
    } else if (e.key === prevKey) {
      e.preventDefault();
      const prevIdx = (currentIndex - 1 + menus.length) % menus.length;
      if (isSubmenuOpen) {
        anyOpenMenu!.open = false;
        menus[prevIdx].open = true;
      }
      this._updateRovingTabIndex(prevIdx);
      triggers[prevIdx]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      if (isSubmenuOpen) {
        anyOpenMenu!.open = false;
        menus[0].open = true;
      }
      this._updateRovingTabIndex(0);
      triggers[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastIdx = menus.length - 1;
      if (isSubmenuOpen) {
        anyOpenMenu!.open = false;
        menus[lastIdx].open = true;
      }
      this._updateRovingTabIndex(lastIdx);
      triggers[lastIdx]?.focus();
    }
  }

  private _updateRovingTabIndex(activeIdx: number): void {
    const menus = Array.from(this.querySelectorAll('a11y-menu')) as any[];
    menus.forEach((menu, idx) => {
      const trigger = menu.querySelector('[aria-haspopup="menu"]') as HTMLElement | null;
      if (trigger) {
        trigger.tabIndex = idx === activeIdx ? 0 : -1;
      }
    });
  }

  private _updateState(): void {
    if (!this._container) return;
    this._container.setAttribute('aria-orientation', this.orientation);
    if (this.label) {
      this._container.setAttribute('aria-label', this.label);
    } else {
      this._container.removeAttribute('aria-label');
    }
    if (this.orientation === 'vertical') {
      this._container.classList.add('a11y-menubar--vertical');
    } else {
      this._container.classList.remove('a11y-menubar--vertical');
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
