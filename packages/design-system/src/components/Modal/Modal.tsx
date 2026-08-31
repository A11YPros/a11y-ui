'use client';

import React, { useEffect, useRef } from 'react';
import { useFocusReturn } from '../../hooks/useFocusReturn';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Button } from '../Button/Button';
import './Modal.css';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Title of the modal (required for accessibility)
   */
  title: string;

  /**
   * Content of the modal
   */
  children: React.ReactNode;

  /**
   * Whether to close on backdrop click
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether to close on ESC key press
   */
  closeOnEscape?: boolean;

  /**
   * Size of the modal
   */
  size?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * Element to return focus to when modal closes
   */
  returnFocusTo?: HTMLElement | null;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Accessible Modal component using HTML5 dialog element
 *
 * Uses the native `<dialog>` element which provides:
 * - Built-in focus management and focus trapping
 * - Automatic body scroll prevention
 * - Native backdrop overlay
 * - ESC key handling (configurable)
 *
 * WCAG Compliance:
 * - 2.1.1 Keyboard: ESC key support, built-in focus trap
 * - 2.1.2 No Keyboard Trap: Focus returns to trigger
 * - 2.4.3 Focus Order: Focus trapped within modal (native behavior)
 * - 4.1.2 Name, Role, Value: ARIA modal pattern
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure?</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = 'md',
  returnFocusTo,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const contentId = React.useId();

  // Trap focus within the dialog when open (WCAG 2.1.2 & 2.4.3)
  useFocusTrap(isOpen, dialogRef, { returnFocus: false });

  // Return focus on close
  useFocusReturn(isOpen, returnFocusTo);

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Show modal dialog
      dialog.showModal();
    } else {
      // Close dialog
      dialog.close();
    }

    return () => {
      // Cleanup: ensure dialog is closed when component unmounts
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [isOpen]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdropClick) return;

    // If click target is the dialog itself (backdrop), not content inside it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Handle cancel event (fires when ESC key is pressed)
  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    // Prevent default close behavior
    event.preventDefault();
    // Only close if closeOnEscape is enabled
    if (closeOnEscape) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal--${size} ${isOpen ? 'modal--open' : ''} ${className}`.trim()}
      aria-labelledby={titleId}
      aria-describedby={contentId}
      onCancel={handleCancel}
      onClick={handleDialogClick}
    >
      <div className="modal-content-wrapper">
        <div className="modal-header">
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close"
          >
            <span aria-hidden="true">×</span>
          </Button>
        </div>
        <div id={contentId} className="modal-content">{children}</div>
      </div>
    </dialog>
  );
};

Modal.displayName = 'Modal';
