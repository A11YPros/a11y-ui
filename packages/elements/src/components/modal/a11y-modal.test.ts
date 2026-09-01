import { describe, it, expect, beforeEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yModal, registerModal } from './a11y-modal';

expect.extend(toHaveNoViolations);

describe('A11yModal (<a11y-modal>)', () => {
  beforeEach(() => {
    registerModal();
    document.body.innerHTML = '';

    // Mock HTMLDialogElement methods in jsdom if needed
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function () {
        this.open = false;
      };
    }
  });

  it('renders native HTML5 dialog structure with exact class names and ARIA IDs', () => {
    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('title', 'Delete Confirmation');
    modal.innerHTML = '<p>Are you sure you want to delete this item?</p>';
    document.body.appendChild(modal);

    const dialog = modal.querySelector('dialog') as HTMLDialogElement;
    expect(dialog).not.toBeNull();
    expect(dialog.classList.contains('modal')).toBe(true);
    expect(dialog.classList.contains('modal--md')).toBe(true);

    const titleH2 = modal.querySelector('.modal-title') as HTMLHeadingElement;
    expect(titleH2).not.toBeNull();
    expect(titleH2.textContent).toBe('Delete Confirmation');
    expect(dialog.getAttribute('aria-labelledby')).toBe(titleH2.id);

    const closeBtn = modal.querySelector('.modal-close') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    expect(closeBtn.getAttribute('aria-label')).toBe('Close modal');

    const content = modal.querySelector('.modal-content') as HTMLDivElement;
    expect(content).not.toBeNull();
    expect(dialog.getAttribute('aria-describedby')).toBe(content.id);
  });

  it('opens and closes via showModal() and close() methods', () => {
    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('title', 'Settings');
    document.body.appendChild(modal);

    const dialog = modal.querySelector('dialog') as HTMLDialogElement;
    expect(modal.open).toBe(false);

    modal.showModal();
    expect(modal.open).toBe(true);
    expect(dialog.open).toBe(true);
    expect(dialog.classList.contains('modal--open')).toBe(true);

    modal.close();
    expect(modal.open).toBe(false);
    expect(dialog.open).toBe(false);
  });

  it('closes when the close button is clicked', () => {
    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('title', 'Notice');
    document.body.appendChild(modal);

    modal.showModal();
    expect(modal.open).toBe(true);

    const closeBtn = modal.querySelector('.modal-close') as HTMLButtonElement;
    closeBtn.click();

    expect(modal.open).toBe(false);
  });

  it('returns focus to trigger element on close (WCAG 2.1.2)', () => {
    const triggerBtn = document.createElement('button');
    triggerBtn.textContent = 'Open Dialog';
    document.body.appendChild(triggerBtn);
    triggerBtn.focus();
    expect(document.activeElement).toBe(triggerBtn);

    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('title', 'Notice');
    document.body.appendChild(modal);

    modal.showModal();
    expect(modal.open).toBe(true);

    modal.close();
    expect(document.activeElement).toBe(triggerBtn);
  });

  it('supports sizes sm, md, lg, full', () => {
    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('size', 'lg');
    document.body.appendChild(modal);

    const dialog = modal.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.classList.contains('modal--lg')).toBe(true);
  });

  it('traps Tab key navigation inside modal', () => {
    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('title', 'Focus Trap Test');
    modal.innerHTML = `
      <button id="modal-btn-1">Button 1</button>
      <button id="modal-btn-2">Button 2</button>
    `;
    document.body.appendChild(modal);

    modal.showModal();

    const closeBtn = modal.querySelector('.modal-close') as HTMLButtonElement;
    const btn1 = modal.querySelector('#modal-btn-1') as HTMLButtonElement;
    const btn2 = modal.querySelector('#modal-btn-2') as HTMLButtonElement;

    // Focus last item (btn2) and press Tab -> should wrap to first item (closeBtn)
    btn2.focus();
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    const dialog = modal.querySelector('dialog') as HTMLDialogElement;
    dialog.dispatchEvent(tabEvent);

    expect(tabEvent.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(closeBtn);

    // Focus first item (closeBtn) and press Shift+Tab -> should wrap to last item (btn2)
    closeBtn.focus();
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    dialog.dispatchEvent(shiftTabEvent);

    expect(shiftTabEvent.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(btn2);
  });

  it('has no accessibility violations in axe audit', async () => {
    const modal = document.createElement('a11y-modal') as A11yModal;
    modal.setAttribute('title', 'Accessible Modal Dialog');
    modal.innerHTML = '<p>Accessible content inside dialog</p>';
    document.body.appendChild(modal);

    const results = await axe(modal);
    expect(results).toHaveNoViolations();
  });
});
