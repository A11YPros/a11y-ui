let nextMenuId = 0;
let nextMenuGroupId = 0;

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
    this.className = 'a11y-menu-group';

    let labelEl = this.querySelector<HTMLElement>('.a11y-menu-group__label');
    if (label) {
      if (!labelEl) {
        labelEl = document.createElement('div');
        labelEl.className = 'a11y-menu-group__label';
        labelEl.id = `a11y-menu-group-label-${++nextMenuGroupId}`;
        this.prepend(labelEl);
      }
      labelEl.textContent = label;
      // Reference the visible label rather than duplicating it in aria-label.
      this.setAttribute('aria-labelledby', labelEl.id);
      this.removeAttribute('aria-label');
    } else {
      labelEl?.remove();
      this.removeAttribute('aria-labelledby');
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

  private _rawLabel: string | null = null;
  private _iconEl: Element | null = null;
  private _labelSpan: HTMLSpanElement | null = null;
  private _innerBtn: HTMLElement | null = null;
  private _observer: MutationObserver | null = null;

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

    // If label wasn't ready at connectedCallback time (common with React/HTML parsers appending children after attach),
    // watch for child additions or character changes to populate the label.
    if (!this._rawLabel && !this.hasAttribute('label')) {
      this._observer?.disconnect();
      this._observer = new MutationObserver(() => {
        const text = this._extractLabel();
        if (text) {
          if (this._labelSpan) {
            this._labelSpan.textContent = text;
          } else {
            this._render();
          }
          // Clean up any direct text nodes that React or parser may have appended after the inner button
          Array.from(this.childNodes).forEach((node) => {
            if (node !== this._innerBtn) {
              node.remove();
            }
          });
          this._observer?.disconnect();
          this._observer = null;
        }
      });
      this._observer.observe(this, { childList: true, characterData: true, subtree: true });
    }
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    this._observer = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;
    if (name === 'label') {
      this._rawLabel = newValue;
    }
    this._render();
  }

  private _extractLabel(): string {
    if (this.hasAttribute('label')) {
      return this.getAttribute('label') || '';
    }
    if (this._rawLabel) {
      return this._rawLabel;
    }
    // If label span already exists and has text, use it
    if (this._labelSpan && this._labelSpan.textContent?.trim()) {
      this._rawLabel = this._labelSpan.textContent.trim();
      return this._rawLabel;
    }

    // Walk text nodes ignoring shortcuts and without cloning elements
    let text = '';
    const walker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.parentElement?.closest('kbd, .a11y-menu-item__shortcut')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let currentNode: Node | null;
    while ((currentNode = walker.nextNode())) {
      text += currentNode.textContent || '';
    }
    text = text.trim();
    if (text) {
      this._rawLabel = text;
      return text;
    }
    return '';
  }

  private _render(): void {
    const rawLabel = this._extractLabel();
    const shortcut = this.getAttribute('shortcut');
    const href = this.href;

    const existingSvg = this.querySelector('svg');
    if (existingSvg) {
      this._iconEl = existingSvg.cloneNode(true) as Element;
    }

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

    if (this._iconEl) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'a11y-menu-item__icon';
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.appendChild(this._iconEl.cloneNode(true));
      el.appendChild(iconSpan);
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'a11y-menu-item__label';
    labelSpan.textContent = rawLabel;
    el.appendChild(labelSpan);
    this._labelSpan = labelSpan;

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
    this._innerBtn = el;
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
const FOCUSABLE_TRIGGER_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export class A11yMenu extends HTMLElement {
  private static readonly OBSERVED_ATTRS = ['label', 'open', 'placement', 'variant', 'size'];

  public static get observedAttributes(): string[] {
    return A11yMenu.OBSERVED_ATTRS;
  }

  private _wrapper: HTMLDivElement | null = null;
  private _triggerBtn: HTMLElement | null = null;
  private _menuDropdown: HTMLDivElement | null = null;
  private _hasCustomTrigger = false;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-menu-${++nextMenuId}`;
  }

  /** Close on outside click. Bound once so it can be removed on disconnect. */
  private _onDocumentClick = (e: MouseEvent): void => {
    if (this.open && this._wrapper && !this._wrapper.contains(e.target as Node)) {
      this.open = false;
    }
  };

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
    // attributeChangedCallback dispatches menu-open / menu-close exactly once
    // for both the property and attribute paths.
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
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this._onDocumentClick);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this._isInitialized || oldValue === newValue) return;
    if (name === 'open') {
      // Update ARIA before notifying listeners so handlers observe consistent state.
      this._updateState();
      this.dispatchEvent(
        new CustomEvent(this.open ? 'menu-open' : 'menu-close', { bubbles: true, composed: true })
      );
      return;
    }
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
    this._hasCustomTrigger = Boolean(triggerSlot);
    if (triggerSlot) {
      // Keep the author's markup intact. If the slotted element is a wrapper such
      // as <a11y-button>, attach ARIA to its focusable descendant so assistive
      // tech sees aria-expanded on the element that actually receives focus.
      const focusable = triggerSlot.matches(FOCUSABLE_TRIGGER_SELECTOR)
        ? (triggerSlot as HTMLElement)
        : triggerSlot.querySelector<HTMLElement>(FOCUSABLE_TRIGGER_SELECTOR);
      trigger = focusable || (triggerSlot as HTMLElement);
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

    // Attach to the slotted root (or the generated button) so a wrapper element's
    // click still toggles the menu.
    const triggerRoot = (triggerSlot as HTMLElement | null) || trigger;
    triggerRoot.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    trigger.addEventListener('mouseenter', () => {
      const menubar = this.closest('a11y-menubar') as any;
      if (menubar) {
        const anyOpen = menubar.querySelector('a11y-menu[open]');
        if (anyOpen && anyOpen !== this) {
          (anyOpen as A11yMenu).open = false;
          this.open = true;
          this.focusTrigger();
        }
      }
    });

    trigger.addEventListener('keydown', (e) => {
      const isMenubar = Boolean(this.closest('a11y-menubar'));
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.open = true;
        this.focusFirstItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.open = true;
        this.focusLastItem();
      } else if (isMenubar && e.key === 'Escape') {
        if (this.open) {
          e.preventDefault();
          this.close();
        }
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

    wrapper.appendChild(triggerRoot);
    wrapper.appendChild(dropdown);
    this.appendChild(wrapper);

    this._wrapper = wrapper;
    this._triggerBtn = trigger;
    this._menuDropdown = dropdown;
  }

  public focusFirstItem(): void {
    requestAnimationFrame(() => {
      const item = this._menuDropdown?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
      item?.focus();
    });
  }

  public focusLastItem(): void {
    requestAnimationFrame(() => {
      const items = this._menuDropdown?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
      if (items && items.length > 0) {
        items[items.length - 1]?.focus();
      }
    });
  }

  public focusTrigger(): void {
    this._triggerBtn?.focus();
  }

  private _handleMenuKeyDown(e: KeyboardEvent): void {
    const isMenubarItem = Boolean(this.closest('a11y-menubar'));
    if (isMenubarItem && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      const menubar = this.closest('a11y-menubar') as any;
      if (menubar && typeof menubar.switchMenu === 'function') {
        e.preventDefault();
        menubar.switchMenu(this, e.key === 'ArrowRight' ? 'next' : 'prev', true);
        return;
      }
    }

    const items = Array.from(
      this._menuDropdown?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') || []
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
    // Only the generated trigger is restyled/relabelled; a custom trigger is the author's.
    if (!this._hasCustomTrigger) {
      this._triggerBtn.className = isMenubarItem ? '' : `btn btn--${this.variant} btn--${this.size}`;
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
    if (!customElements.get('a11y-menu-group')) {
      customElements.define('a11y-menu-group', A11yMenuGroup);
    }
    if (!customElements.get('a11y-menu')) {
      customElements.define('a11y-menu', A11yMenu);
    }
  }
}

if (typeof customElements !== 'undefined') {
  registerMenu();
}
