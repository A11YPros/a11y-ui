import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, runAxeTest, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    // Mock dialog.showModal and dialog.close
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
  });

  describe('rendering', () => {
    it('renders modal when open', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render modal content when closed', () => {
      render(
        <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      const content = screen.queryByText('Modal content');
      expect(content).not.toBeVisible();
    });

    it('renders close button', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      );
      expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test" className="custom-class">
          Content
        </Modal>
      );
      const dialog = container.querySelector('dialog');
      expect(dialog).toHaveClass('custom-class');
    });
  });

  describe('interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      await user.click(screen.getByRole('button', { name: 'Close modal' }));
      expect(handleClose).toHaveBeenCalled();
    });

    it('calls onClose on Escape key when closeOnEscape is true', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal" closeOnEscape={true}>
          Content
        </Modal>
      );

      const dialog = container.querySelector('dialog');
      expect(dialog).toBeTruthy();

      // Trigger the cancel event directly (which is what ESC does on dialog)
      const cancelEvent = new Event('cancel', { bubbles: true, cancelable: true });
      dialog?.dispatchEvent(cancelEvent);

      expect(handleClose).toHaveBeenCalled();
    });

    it('does not close on Escape when closeOnEscape is false', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal" closeOnEscape={false}>
          Content
        </Modal>
      );

      const dialog = container.querySelector('dialog');

      // Trigger the cancel event
      const cancelEvent = new Event('cancel', { bubbles: true, cancelable: true });
      dialog?.dispatchEvent(cancelEvent);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('sizes', () => {
    it('renders small modal', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Small" size="sm">
          Content
        </Modal>
      );
      expect(container.querySelector('.modal--sm')).toBeInTheDocument();
    });

    it('renders medium modal by default', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Medium">
          Content
        </Modal>
      );
      expect(container.querySelector('.modal--md')).toBeInTheDocument();
    });

    it('renders large modal', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Large" size="lg">
          Content
        </Modal>
      );
      expect(container.querySelector('.modal--lg')).toBeInTheDocument();
    });
  });

  describe('aria attributes', () => {
    it('has aria-labelledby pointing to title', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      );
      const dialog = container.querySelector('dialog');
      const labelledBy = dialog?.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
    });

    it('has aria-describedby pointing to content', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      );
      const dialog = container.querySelector('dialog');
      const describedBy = dialog?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Accessible Modal">
          <p>Modal content with proper structure</p>
        </Modal>
      );
      await runAxeTest(container);
    });
  });

  describe('focus trap and keyboard containment', () => {
    it('wraps focus to first element when Tab is pressed on last element', async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Focus Trap Modal">
          <p>Content</p>
          <button type="button">First Action</button>
          <button type="button">Last Action</button>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      const lastButton = screen.getByRole('button', { name: 'Last Action' });

      // Focus the last focusable element
      lastButton.focus();
      expect(document.activeElement).toBe(lastButton);

      // Press Tab on the last element
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      lastButton.dispatchEvent(tabEvent);

      // Focus should cycle back to the first element (close button)
      expect(tabEvent.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(closeButton);
    });

    it('wraps focus to last element when Shift+Tab is pressed on first element', async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Focus Trap Modal">
          <p>Content</p>
          <button type="button">First Action</button>
          <button type="button">Last Action</button>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      const lastButton = screen.getByRole('button', { name: 'Last Action' });

      // Focus the first focusable element (close button)
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);

      // Press Shift+Tab on the first element
      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });
      closeButton.dispatchEvent(shiftTabEvent);

      // Focus should cycle backwards to the last element
      expect(shiftTabEvent.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(lastButton);
    });

    it('keeps focus contained when only one focusable element exists', async () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Single Focusable Modal">
          <p>Read-only text without any interactive elements</p>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: 'Close modal' });
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);

      // Tab on only element
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      closeButton.dispatchEvent(tabEvent);
      expect(tabEvent.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(closeButton);

      // Shift+Tab on only element
      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });
      closeButton.dispatchEvent(shiftTabEvent);
      expect(shiftTabEvent.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(closeButton);
    });
  });
});

