'use client';

import { useEffect, useRef } from 'react';
import { getFirstFocusable, getLastFocusable, getFocusableElements } from '../utils/focus';

export interface UseFocusTrapOptions {
  /**
   * Whether to restore focus to the previously active element when disabled or unmounted.
   * @default true
   */
  returnFocus?: boolean;

  /**
   * Optional specific element to return focus to when unmounting.
   */
  returnFocusTo?: HTMLElement | null;
}

/**
 * Hook to trap focus within a container element
 * Implements WCAG 2.1.2 Keyboard (No Keyboard Trap) and WAI-ARIA modal focus containment.
 *
 * @param enabled - Whether the focus trap is active
 * @param containerRef - Ref to the container element
 * @param options - Optional configuration options
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  options?: UseFocusTrapOptions
): void {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    // Save the previously focused element
    if (document.activeElement instanceof HTMLElement) {
      previousActiveElement.current = document.activeElement;
    }

    // Focus the first focusable element if focus is not already inside the container
    if (!container.contains(document.activeElement)) {
      const firstFocusable = getFirstFocusable(container);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        container.focus();
      }
    }

    // Handle Tab key to trap focus within container boundaries
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(container);

      if (focusableElements.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab (backward)
        if (
          document.activeElement === firstElement ||
          document.activeElement === container ||
          !container.contains(document.activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (forward)
        if (
          document.activeElement === lastElement ||
          document.activeElement === container ||
          !container.contains(document.activeElement)
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Guard against focus escaping to outside DOM elements while modal is active
    const handleFocusIn = (event: FocusEvent) => {
      if (!container.contains(event.target as Node)) {
        event.preventDefault();
        const firstFocusable = getFirstFocusable(container);
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          container.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);

      // Restore focus to the previously focused element if enabled
      if (options?.returnFocus !== false) {
        const elementToFocus = options?.returnFocusTo || previousActiveElement.current;
        if (elementToFocus && typeof elementToFocus.focus === 'function') {
          try {
            elementToFocus.focus();
          } catch {
            // Silently fail if element is unmounted or cannot receive focus
          }
        }
      }
    };
  }, [enabled, containerRef, options?.returnFocus, options?.returnFocusTo]);
}

