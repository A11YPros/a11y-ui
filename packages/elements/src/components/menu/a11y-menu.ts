let nextMenuId = 0;

/**
 * Menu Divider component (<a11y-menu-divider>)
 */
export class A11yMenuDivider extends HTMLElement {
  connectedCallback(): void {
    this.setAttribute('role', 'separator');
    this.className = 'a11y-menu-divider';
  }
}

/**
 * Menu Group component (<a11y-menu-group>)
 */
export class A11yMenuGroup extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ['label'];
  }

  connectedCallback(): void {
    this._render();
  }

  attributeChangedCallback(): void {
    this._render();
  }

  private _render(): void {
    const label = this.getAttribute('label');
    this.setAttribute('role', 'group');
    if (label) this.setAttribute('aria-label', label);
    this.className = 'a11y-menu-group';

    let labelEl = this.querySelector('.a11y-menu-group__label');
    if (label) {
      if (!labelEl) {
        labelEl = document.createElement('div');
        labelEl.className = 'a11y-menu-group__label';
        this.prepend(labelEl);
      }
      labelEl.textContent = label;
    } else if (labelEl) {
      labelEl.remove();
    }
  }
}

/**
 * Menu Item component (<a11y-menu-item>)
 */
export class A11yMenuItem extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ['disabled', 'danger', 'href', 'shortcut', 'target'];
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

  get danger(): boolean {
    return this.hasAttribute('danger');
  }

  set danger(val: boolean) {
    if (val) {
      this.setAttribute('danger', '');
    } else {
      this.removeAttribute('danger');
    }
  }

  get href(): string | null {
    return this.getAttribute('href');
  }

  set href(val: string | null) {
    if (val) {
      this.setAttribute('href', val);
    } else {
      this.removeAttribute('href');
    }
  }

  connectedCallback(): void {
    this._render();
  }

  attributeChangedCallback(): void {
    this._render();
  }

  private _render(): void {
    const rawLabel = this.getAttribute('label') || this.textContent || '';
    const shortcut = this.getAttribute('shortcut');
    const href = this.href;

    this.innerHTML = '';
    const el = href ? document.createElement('a') : document.createElement('button');
    if (el instanceof HTMLButtonElement) {
      el.type = 'button';
    } else if (href) {
      el.href = href;
      if (this.hasAttribute('target')) el.target = this.getAttribute('target')!;
    }

    el.setAttribute('role', 'menuitem');
    el.tabIndex = this.disabled ? -1 : 0;
    if (this.disabled) el.setAttribute('aria-disabled', 'true');

    el.className = [
      'a11y-menu-item',
      this.danger ? 'a11y-menu-item--danger' : '',
      this.disabled ? 'a11y-menu-item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const labelSpan = document.createElement('span');
    labelSpan.className = 'a11y-menu-item__label';
    labelSpan.textContent = rawLabel;
    el.appendChild(labelSpan);

    if (shortcut) {
      const kbd = document.createElement('kbd');
      kbd.className = 'a11y-menu-item__shortcut';
      kbd.textContent = shortcut;
      el.appendChild(kbd);
    }

    el.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      this.dispatchEvent(new CustomEvent('select', { bubbles: true, composed: true }));
    });

    this.appendChild(el);
  }
}

/**
 * Accessible Menu Web Component (<a11y-menu>)
 *
 * Exact HTML5 parity with React Menu:
 * - WCAG 2.1.1 Keyboard: Arrow key navigation, Escape to close, focus restoration
 * - WCAG 4.1.2 Name, Role, Value: role="menu" and role="menuitem"
 * - Light DOM rendering preserving CSS classes 1:1 with Menu.css
 *
 * @example
 * ```html
 * <a11y-menu label="Actions">
 *   <button slot="trigger" type="button">Actions ▾</button>
 *   <a11y-menu-item>Edit</a11y-menu-item>
 *   <a11y-menu-item shortcut="⌘D">Duplicate</a11y-menu-item>
 *   <a11y-menu-divider></a11y-menu-divider>
 *   <a11y-menu-item danger>Delete</a11y-menu-item>
 * </a11y-menu>
 * ```
 */
export class A11yMenu extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['label', 'open', 'placement', 'variant', 'size'];

  public static get observedAttributes(): string[] {
    return A11yMenu.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLDivElement | null = null;
  private _triggerBtn: HTMLElement | null = null;
  private _menuDropdown: HTMLDivElement | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-menu-${++nextMenuId}`;
  }

  get variant(): string {
    return this.getAttribute('variant') || 'secondary';
  }

  set variant(val: string) {
    this.setAttribute('variant', val);
  }

  get size(): string {
    return this.getAttribute('size') || 'md';
  }

  set size(val: string) {
    this.setAttribute('size', val);
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

  get placement(): string {
    return this.getAttribute('placement') || 'bottom-start';
  }

  set placement(val: string) {
    this.setAttribute('placement', val);
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

  public toggle(): void {
    this.open = !this.open;
  }

  public close(): void {
    this.open = false;
    this._triggerBtn?.focus();
  }

  private _render(): void {
    const triggerSlot = this.querySelector('[slot="trigger"]');
    const items = Array.from(this.querySelectorAll('a11y-menu-item, a11y-menu-divider, a11y-menu-group'));

    this.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'a11y-menu-wrapper';

    // Trigger
    const isMenubarItem = Boolean(this.closest('a11y-menubar'));
    let trigger: HTMLElement;
    if (triggerSlot) {
      triggerSlot.removeAttribute('slot');
      trigger = triggerSlot as HTMLElement;
    } else {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isMenubarItem ? '' : `btn btn--${this.variant} btn--${this.size}`;
      btn.textContent = this.label || 'Menu';
      trigger = btn;
    }

    if (isMenubarItem) {
      this.setAttribute('role', 'none');
      wrapper.setAttribute('role', 'none');
      trigger.setAttribute('role', 'menuitem');
    }
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', String(this.open));
    trigger.id = `${this._uniqueId}-trigger`;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.open = true;
        this._focusFirstItem();
      }
    });

    // Dropdown
    const dropdown = document.createElement('div');
    dropdown.id = `${this._uniqueId}-dropdown`;
    dropdown.setAttribute('role', 'menu');
    dropdown.setAttribute('aria-labelledby', trigger.id);
    dropdown.className = `a11y-menu a11y-menu--${this.placement}`;
    dropdown.tabIndex = -1;

    items.forEach((item) => {
      item.addEventListener('select', () => this.close());
      dropdown.appendChild(item);
    });

    dropdown.addEventListener('keydown', (e) => this._handleMenuKeyDown(e));

    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);
    this.appendChild(wrapper);

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.open && !wrapper.contains(e.target as Node)) {
        this.open = false;
      }
    });

    this._wrapper = wrapper;
    this._triggerBtn = trigger;
    this._menuDropdown = dropdown;
  }

  private _focusFirstItem(): void {
    requestAnimationFrame(() => {
      const item = this.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
      item?.focus();
    });
  }

  private _handleMenuKeyDown(e: KeyboardEvent): void {
    const items = Array.from(
      this.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
    );
    const activeEl = document.activeElement as HTMLElement;
    const currentIndex = items.indexOf(activeEl);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  private _updateState(): void {
    if (!this._triggerBtn || !this._menuDropdown) return;

    this._triggerBtn.setAttribute('aria-expanded', String(this.open));
    const isMenubarItem = Boolean(this.closest('a11y-menubar'));
    if (!isMenubarItem && !this.querySelector('[slot="trigger"]')) {
      this._triggerBtn.className = `btn btn--${this.variant} btn--${this.size}`;
      if (this.label) {
        this._triggerBtn.textContent = this.label;
      }
    }
    this._menuDropdown.className = `a11y-menu a11y-menu--${this.placement}`;
    this._menuDropdown.style.display = this.open ? '' : 'none';
  }
}

export function registerMenu(): void {
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('a11y-menu-divider')) {
      customElements.define('a11y-menu-divider', A11yMenuDivider);
    }
    if (!customElements.get('a11y-menu-item')) {
      customElements.define('a11y-menu-item', A11yMenuItem);
    }
    if (!customElements.get('a11y-menu')) {
      customElements.define('a11y-menu', A11yMenu);
    }
  }
}

if (typeof customElements !== 'undefined') {
  registerMenu();
}
