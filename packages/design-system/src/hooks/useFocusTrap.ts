'use client';

import { useEffect, useRef } from 'react';
import { getFirstFocusable, getFocusableElements } from '../utils/focus';

/**
 * Traps Tab and Shift+Tab key navigation within a node (Mantine scope-tab pattern)
 */
export function scopeTab(node: HTMLElement, event: KeyboardEvent): void {
  const tabbable = getFocusableElements(node);
  if (!tabbable.length) {
    event.preventDefault();
    return;
  }

  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  const leavingFinalTabbable =
    finalTabbable === document.activeElement || node === document.activeElement;

  if (!leavingFinalTabbable) {
    return;
  }

  event.preventDefault();

  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  if (target) {
    target.focus();
  }
}

/**
 * Hook to trap focus within a container element
 * Implements WCAG 2.1.2 Keyboard (No Keyboard Trap)
 *
 * @param enabled - Whether the focus trap is active
 * @param containerRef - Ref to the container element
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement | null>
): void {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    // Save the previously focused element
    if (document.activeElement instanceof HTMLElement) {
      previousActiveElement.current = document.activeElement;
    }

    // Focus first focusable element or container
    const firstFocusable = getFirstFocusable(container);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      container.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        scopeTab(container, event);
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, containerRef]);
}


