let nextTabsId = 0;

/**
 * Tab Panel child component for <a11y-tabs>
 */
export class A11yTabPanel extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ['label', 'disabled'];
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(val: string) {
    this.setAttribute('label', val);
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
}

/**
 * Accessible Tabs Web Component (<a11y-tabs>)
 *
 * Exact HTML5 parity with React Tabs:
 * - WCAG 2.1.1 Keyboard: Arrow key navigation, Home/End roving tabindex
 * - WCAG 2.4.3 Focus Order: Tabs control tabpanels with proper ARIA linkage
 * - WCAG 4.1.2 Name, Role, Value: Complete WAI-ARIA tablist pattern
 * - Light DOM rendering preserving CSS classes 1:1 with Tabs.css
 *
 * @example
 * ```html
 * <a11y-tabs aria-label="Account Settings">
 *   <a11y-tab-panel label="General">General settings</a11y-tab-panel>
 *   <a11y-tab-panel label="Security">Security settings</a11y-tab-panel>
 * </a11y-tabs>
 * ```
 */
export class A11yTabs extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'orientation',
    'selected-index',
    'aria-label',
    'aria-labelledby',
  ];

  public static get observedAttributes(): string[] {
    return A11yTabs.OBSERVED_ATTRS;
  }

  private _container: HTMLDivElement | null = null;
  private _tabList: HTMLDivElement | null = null;
  private _panelsContainer: HTMLDivElement | null = null;
  private _tabsButtons: HTMLButtonElement[] = [];
  private _panelDivs: HTMLDivElement[] = [];
  private _selectedIndex = 0;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-tabs-${++nextTabsId}`;
  }

  get orientation(): 'horizontal' | 'vertical' {
    return this.getAttribute('orientation') === 'vertical' ? 'vertical' : 'horizontal';
  }

  set orientation(val: 'horizontal' | 'vertical') {
    this.setAttribute('orientation', val);
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    this._selectTab(index);
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
    if (name === 'selected-index') {
      const idx = parseInt(newValue || '0', 10);
      if (!isNaN(idx)) this._selectTab(idx, false);
    } else {
      this._updateState();
    }
  }

  private _selectTab(index: number, updateAttr = true): void {
    if (index < 0 || index >= this._tabsButtons.length) return;
    this._selectedIndex = index;

    this._tabsButtons.forEach((btn, i) => {
      const isSelected = i === index;
      btn.setAttribute('aria-selected', String(isSelected));
      btn.tabIndex = isSelected ? 0 : -1;
      if (isSelected) {
        btn.classList.add('tabs-tab--selected');
      } else {
        btn.classList.remove('tabs-tab--selected');
      }
    });

    this._panelDivs.forEach((panel, i) => {
      panel.style.display = i === index ? '' : 'none';
    });

    if (updateAttr) {
      this.setAttribute('selected-index', String(index));
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { selectedIndex: index },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent, currentIndex: number): void {
    const isVert = this.orientation === 'vertical';
    const nextKey = isVert ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVert ? 'ArrowUp' : 'ArrowLeft';
    const count = this._tabsButtons.length;

    let targetIndex = currentIndex;

    if (e.key === nextKey) {
      e.preventDefault();
      targetIndex = (currentIndex + 1) % count;
    } else if (e.key === prevKey) {
      e.preventDefault();
      targetIndex = (currentIndex - 1 + count) % count;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = count - 1;
    }

    if (targetIndex !== currentIndex) {
      this._selectTab(targetIndex);
      this._tabsButtons[targetIndex]?.focus();
    }
  }

  private _render(): void {
    const initialPanelElements = Array.from(this.querySelectorAll<A11yTabPanel>('a11y-tab-panel'));
    this.innerHTML = '';

    const container = document.createElement('div');
    container.className = `tabs tabs--${this.orientation}`;

    const tabList = document.createElement('div');
    tabList.className = 'tabs-list';
    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('aria-orientation', this.orientation);
    if (this.hasAttribute('aria-label')) {
      tabList.setAttribute('aria-label', this.getAttribute('aria-label')!);
    }

    const panelsContainer = document.createElement('div');
    panelsContainer.className = 'tabs-panels';

    this._tabsButtons = [];
    this._panelDivs = [];

    initialPanelElements.forEach((panelEl, index) => {
      const tabId = `${this._uniqueId}-tab-${index}`;
      const panelId = `${this._uniqueId}-panel-${index}`;
      const label = panelEl.getAttribute('label') || `Tab ${index + 1}`;
      const isSelected = index === this._selectedIndex;

      // Tab button
      const btn = document.createElement('button');
      btn.id = tabId;
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', panelId);
      btn.setAttribute('aria-selected', String(isSelected));
      btn.tabIndex = isSelected ? 0 : -1;
      btn.className = `tabs-tab ${isSelected ? 'tabs-tab--selected' : ''}`;
      btn.textContent = label;

      btn.addEventListener('click', () => {
        this._selectTab(index);
      });

      btn.addEventListener('keydown', (e) => {
        this._handleKeyDown(e, index);
      });

      tabList.appendChild(btn);
      this._tabsButtons.push(btn);

      // Panel
      const panelDiv = document.createElement('div');
      panelDiv.id = panelId;
      panelDiv.setAttribute('role', 'tabpanel');
      panelDiv.setAttribute('aria-labelledby', tabId);
      panelDiv.className = 'tabs-panel';
      panelDiv.tabIndex = 0;
      panelDiv.style.display = isSelected ? '' : 'none';

      while (panelEl.firstChild) {
        panelDiv.appendChild(panelEl.firstChild);
      }

      panelsContainer.appendChild(panelDiv);
      this._panelDivs.push(panelDiv);
    });

    container.appendChild(tabList);
    container.appendChild(panelsContainer);
    this.appendChild(container);

    this._container = container;
    this._tabList = tabList;
    this._panelsContainer = panelsContainer;
  }

  private _updateState(): void {
    if (!this._container || !this._tabList) return;

    this._container.className = `tabs tabs--${this.orientation}`;
    this._tabList.setAttribute('aria-orientation', this.orientation);

    if (this.hasAttribute('aria-label')) {
      this._tabList.setAttribute('aria-label', this.getAttribute('aria-label')!);
    }
  }
}

export function registerTabs(): void {
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('a11y-tab-panel')) {
      customElements.define('a11y-tab-panel', A11yTabPanel);
    }
    if (!customElements.get('a11y-tabs')) {
      customElements.define('a11y-tabs', A11yTabs);
    }
  }
}

if (typeof customElements !== 'undefined') {
  registerTabs();
}
