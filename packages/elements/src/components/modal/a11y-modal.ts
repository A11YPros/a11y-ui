let nextModalId = 0;

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Accessible Modal Web Component (<a11y-modal>)
 *
 * Exact HTML5 parity with React Modal using native <dialog>:
 * - Built-in native focus trapping and backdrop
 * - WCAG 2.1.1 Keyboard: Escape key dismissal
 * - WCAG 2.1.2 No Keyboard Trap: Returns focus to trigger element on close
 * - WCAG 2.4.3 Focus Order: Trapped within modal
 * - WCAG 4.1.2 Name, Role, Value: Dialog semantics with aria-labelledby and aria-describedby
 * - Light DOM rendering preserving CSS classes 1:1 with Modal.css
 *
 * @example
 * ```html
 * <a11y-modal id="my-modal" title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 * </a11y-modal>
 *
 * <script>
 *   const modal = document.getElementById('my-modal');
 *   modal.showModal();
 * </script>
 * ```
 */
export class A11yModal extends HTMLElement {
  private static readonly OBSERVED_ATTRS = [
    'open',
    'title',
    'size',
    'close-on-backdrop',
    'close-on-escape',
  ];

  public static get observedAttributes(): string[] {
    return A11yModal.OBSERVED_ATTRS;
  }

  private _dialogElement: HTMLDialogElement | null = null;
  private _titleElement: HTMLHeadingElement | null = null;
  private _contentElement: HTMLDivElement | null = null;
  private _closeButton: HTMLButtonElement | null = null;
  private _previousActiveElement: HTMLElement | null = null;
  private _observer: MutationObserver | null = null;
  private _uniqueId: string;
  private _isInitialized = false;

  constructor() {
    super();
    this._uniqueId = `a11y-modal-${++nextModalId}`;
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(value: boolean) {
    if (value) {
      this.showModal();
    } else {
      this.close();
    }
  }

  get title(): string {
    return this.getAttribute('title') || '';
  }

  set title(value: string) {
    this.setAttribute('title', value);
  }

  get size(): ModalSize {
    const s = this.getAttribute('size');
    return s === 'sm' || s === 'lg' || s === 'full' ? s : 'md';
  }

  set size(value: ModalSize) {
    this.setAttribute('size', value);
  }

  get closeOnBackdrop(): boolean {
    return this.getAttribute('close-on-backdrop') !== 'false';
  }

  set closeOnBackdrop(value: boolean) {
    this.setAttribute('close-on-backdrop', String(value));
  }

  get closeOnEscape(): boolean {
    return this.getAttribute('close-on-escape') !== 'false';
  }

  set closeOnEscape(value: boolean) {
    this.setAttribute('close-on-escape', String(value));
  }

  connectedCallback(): void {
    if (!this._isInitialized) {
      this._render();
      this._isInitialized = true;
    }
    this._updateState();
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    this._observer = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (!this._isInitialized || oldValue === newValue) return;

    if (name === 'open') {
      if (this.hasAttribute('open')) {
        this._openDialog();
      } else {
        this._closeDialog();
      }
    } else {
      this._updateState();
    }
  }

  public showModal(): void {
    if (document.activeElement instanceof HTMLElement && !this.contains(document.activeElement)) {
      this._previousActiveElement = document.activeElement;
    }
    // Route through the attribute when possible: attributeChangedCallback calls
    // _openDialog exactly once. Fall back to a direct call if the attribute is
    // already present or the element is not yet initialized.
    if (this._isInitialized && !this.hasAttribute('open')) {
      this.setAttribute('open', '');
    } else {
      if (!this.hasAttribute('open')) this.setAttribute('open', '');
      this._openDialog();
    }
  }

  public close(): void {
    if (this._isInitialized && this.hasAttribute('open')) {
      this.removeAttribute('open');
    } else {
      if (this.hasAttribute('open')) this.removeAttribute('open');
      this._closeDialog();
    }
  }

  private _getFocusableElements(container: HTMLElement = this._dialogElement!): HTMLElement[] {
    if (!container) return [];
    const focusableSelectors = [
      'a[href]:not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter((el) => {
      if (el.hasAttribute('disabled')) return false;
      if (el.getAttribute('aria-hidden') === 'true') return false;
      return true;
    });
  }

  private _handleTabKey(e: KeyboardEvent): void {
    if (!this._dialogElement) return;
    const focusable = this._getFocusableElements(this._dialogElement);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      if (active === first || active === this._dialogElement || !this._dialogElement.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last || !this._dialogElement.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private _openDialog(): void {
    if (!this._dialogElement) return;
    if (this._dialogElement.open) {
      this._updateState();
      return;
    }

    if (!this._previousActiveElement && document.activeElement instanceof HTMLElement) {
      if (!this.contains(document.activeElement)) {
        this._previousActiveElement = document.activeElement;
      }
    }

    if (typeof this._dialogElement.showModal === 'function') {
      this._dialogElement.showModal();
    } else {
      this._dialogElement.open = true;
    }
    this._updateState();

    // Focus management: move focus into the modal (WCAG 2.4.3 Focus Order)
    requestAnimationFrame(() => {
      if (!this._dialogElement || !this.open) return;
      const contentFocusable = this._contentElement ? this._getFocusableElements(this._contentElement)[0] : null;
      const allFocusable = this._getFocusableElements(this._dialogElement);
      const target = contentFocusable || allFocusable[0] || this._closeButton || this._dialogElement;
      target?.focus();
    });
  }

  private _closeDialog(): void {
    if (!this._dialogElement) return;

    // Only an actual open -> closed transition restores focus and emits `close`.
    if (!this._dialogElement.open) {
      this._updateState();
      return;
    }

    if (typeof this._dialogElement.close === 'function') {
      this._dialogElement.close();
    } else {
      this._dialogElement.open = false;
    }

    this._updateState();

    // Return focus to previous element (WCAG 2.1.2)
    const prev = this._previousActiveElement;
    this._previousActiveElement = null;
    if (prev && typeof prev.focus === 'function') {
      requestAnimationFrame(() => {
        prev.focus();
      });
    }

    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _render(): void {
    const initialChildren = Array.from(this.childNodes);
    this.innerHTML = '';

    const titleId = `${this._uniqueId}-title`;
    const contentId = `${this._uniqueId}-content`;

    const dialog = document.createElement('dialog');
    dialog.className = 'modal';
    dialog.setAttribute('aria-labelledby', titleId);
    dialog.setAttribute('aria-describedby', contentId);

    const wrapper = document.createElement('div');
    wrapper.className = 'modal-content-wrapper';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const titleH2 = document.createElement('h2');
    titleH2.id = titleId;
    titleH2.className = 'modal-title';
    titleH2.textContent = this.title;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn btn--ghost btn--sm modal-close';
    closeBtn.setAttribute('aria-label', 'Close modal');

    const closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.textContent = '×';
    closeBtn.appendChild(closeIcon);

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
    });

    header.appendChild(titleH2);
    header.appendChild(closeBtn);

    const contentDiv = document.createElement('div');
    contentDiv.id = contentId;
    contentDiv.className = 'modal-content';
    initialChildren.forEach((child) => contentDiv.appendChild(child));

    wrapper.appendChild(header);
    wrapper.appendChild(contentDiv);
    dialog.appendChild(wrapper);
    this.appendChild(dialog);

    // Watch for late-bound children added by React/DOM parser and place inside contentDiv
    this._observer?.disconnect();
    this._observer = new MutationObserver(() => {
      const extraNodes = Array.from(this.childNodes).filter((n) => n !== dialog);
      if (extraNodes.length > 0) {
        extraNodes.forEach((node) => contentDiv.appendChild(node));
      }
    });
    this._observer.observe(this, { childList: true });

    // Focus trap: trap Tab and Shift+Tab key navigation within modal (WCAG 2.1.2 & 2.4.3)
    dialog.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        this._handleTabKey(e);
      }
    });

    // Backdrop click dismiss
    dialog.addEventListener('click', (e: MouseEvent) => {
      if (!this.closeOnBackdrop) return;
      if (e.target === dialog) {
        this.close();
      }
    });

    // Native cancel event (Escape key)
    dialog.addEventListener('cancel', (e: Event) => {
      e.preventDefault();
      if (this.closeOnEscape) {
        this.close();
      }
    });

    this._dialogElement = dialog;
    this._titleElement = titleH2;
    this._contentElement = contentDiv;
    this._closeButton = closeBtn;
  }

  private _updateState(): void {
    if (!this._dialogElement || !this._titleElement) return;

    this._titleElement.textContent = this.title;
    const isOpen = this.hasAttribute('open');

    this._dialogElement.className = ['modal', `modal--${this.size}`, isOpen ? 'modal--open' : '']
      .filter(Boolean)
      .join(' ');
  }
}

export function registerModal(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('a11y-modal')) {
    customElements.define('a11y-modal', A11yModal);
  }
}

if (typeof customElements !== 'undefined') {
  registerModal();
}
