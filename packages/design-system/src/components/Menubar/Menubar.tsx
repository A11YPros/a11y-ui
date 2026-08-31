'use client';

import React from 'react';
import { MenubarContext, MenubarContextValue } from './MenubarContext';
import './Menubar.css';

export interface MenubarProps {
  /**
   * Accessible label for the menubar (e.g. "Application menu").
   */
  label?: string;

  /**
   * The Menus to render inside the menubar.
   */
  children: React.ReactNode;

  /**
   * Orientation of the menubar.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Controlled ID of the currently open menu.
   */
  openMenuId?: string | null;

  /**
   * Callback fired when the active/open menu changes.
   */
  onOpenMenuChange?: (menuId: string | null) => void;

  className?: string;
  id?: string;
}

/**
 * Menubar Component
 *
 * Implements the WAI-ARIA Menubar Pattern (desktop-style application menu bar):
 * - Container: role="menubar", aria-orientation
 * - Triggers: role="menuitem", roving tabIndex
 * - Arrow navigation: Left/Right to cycle triggers; Down/Up to open
 * - Open menu switching: ArrowRight/ArrowLeft inside an open menu smoothly
 *   opens the adjacent menu and focuses its first item
 * - Hover switching: When any menu is open, moving pointer to another trigger opens it
 * - Single tab stop for the entire menubar
 * - Zero third-party dependencies
 */
export const Menubar: React.FC<MenubarProps> = ({
  label,
  children,
  orientation = 'horizontal',
  openMenuId: controlledOpenMenuId,
  onOpenMenuChange,
  className = '',
  id,
}) => {
  const generatedId = React.useId();
  const menubarId = id || `menubar-${generatedId}`;

  const [uncontrolledOpenMenuId, setUncontrolledOpenMenuId] = React.useState<string | null>(null);
  const isControlled = controlledOpenMenuId !== undefined;
  const openMenuId = isControlled ? controlledOpenMenuId : uncontrolledOpenMenuId;

  // Track initial focus direction ('first' | 'last') requested for a menu
  const [initialFocusMap, setInitialFocusMap] = React.useState<
    Record<string, 'first' | 'last' | null>
  >({});

  const [focusedMenuIndex, setFocusedMenuIndex] = React.useState(0);

  // List of registered menu items: { id, triggerEl }
  const menusRef = React.useRef<Array<{ id: string; triggerEl: HTMLElement | null }>>([]);

  const isMenubarActive = openMenuId !== null;

  const setOpenMenuId = React.useCallback(
    (nextId: string | null, initialFocus: 'first' | 'last' | null = 'first') => {
      if (nextId) {
        setInitialFocusMap((prev) => ({ ...prev, [nextId]: initialFocus }));
      }
      if (!isControlled) {
        setUncontrolledOpenMenuId(nextId);
      }
      onOpenMenuChange?.(nextId);
    },
    [isControlled, onOpenMenuChange]
  );

  const getInitialFocusForMenu = React.useCallback(
    (menuId: string) => {
      return initialFocusMap[menuId] ?? null;
    },
    [initialFocusMap]
  );

  const clearInitialFocusForMenu = React.useCallback((menuId: string) => {
    setInitialFocusMap((prev) => {
      if (!(menuId in prev)) return prev;
      const next = { ...prev };
      delete next[menuId];
      return next;
    });
  }, []);

  const registerMenu = React.useCallback((menuId: string, triggerEl: HTMLElement | null) => {
    const existing = menusRef.current.findIndex((m) => m.id === menuId);
    if (existing !== -1) {
      menusRef.current[existing] = { id: menuId, triggerEl };
    } else {
      menusRef.current.push({ id: menuId, triggerEl });
    }
  }, []);

  const unregisterMenu = React.useCallback((menuId: string) => {
    menusRef.current = menusRef.current.filter((m) => m.id !== menuId);
  }, []);

  const focusTriggerAtIndex = React.useCallback((index: number) => {
    const menus = menusRef.current;
    if (index >= 0 && index < menus.length) {
      setFocusedMenuIndex(index);
      menus[index].triggerEl?.focus();
    }
  }, []);

  const setFocusedMenuId = React.useCallback((id: string) => {
    const idx = menusRef.current.findIndex((m) => m.id === id);
    if (idx !== -1) {
      setFocusedMenuIndex(idx);
    }
  }, []);

  // Switch between adjacent menus via ArrowRight / ArrowLeft
  const switchMenu = React.useCallback(
    (currentId: string, direction: 'next' | 'prev') => {
      const menus = menusRef.current;
      const count = menus.length;
      if (count <= 1) return;

      const currentIdx = menus.findIndex((m) => m.id === currentId);
      const nextIdx =
        direction === 'next' ? (currentIdx + 1) % count : (currentIdx - 1 + count) % count;

      const targetMenu = menus[nextIdx];
      if (targetMenu) {
        setFocusedMenuIndex(nextIdx);
        setOpenMenuId(targetMenu.id, 'first');
      }
    },
    [setOpenMenuId]
  );

  // Mouse hover transfer when menubar is active
  const onTriggerMouseEnter = React.useCallback(
    (menuId: string) => {
      if (isMenubarActive && openMenuId !== menuId) {
        const idx = menusRef.current.findIndex((m) => m.id === menuId);
        if (idx !== -1) {
          setFocusedMenuIndex(idx);
        }
        setOpenMenuId(menuId, null);
      }
    },
    [isMenubarActive, openMenuId, setOpenMenuId]
  );

  const contextValue = React.useMemo<MenubarContextValue>(
    () => ({
      openMenuId,
      setOpenMenuId,
      isMenubarActive,
      registerMenu,
      unregisterMenu,
      focusedMenuIndex,
      setFocusedMenuIndex,
      setFocusedMenuId,
      switchMenu,
      onTriggerMouseEnter,
      getInitialFocusForMenu,
      clearInitialFocusForMenu,
    }),
    [
      openMenuId,
      setOpenMenuId,
      isMenubarActive,
      registerMenu,
      unregisterMenu,
      focusedMenuIndex,
      setFocusedMenuId,
      switchMenu,
      onTriggerMouseEnter,
      getInitialFocusForMenu,
      clearInitialFocusForMenu,
    ]
  );

  // Handle keyboard navigation across menubar triggers when dropdowns are closed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const menus = menusRef.current;
    const count = menus.length;
    if (count === 0) return;

    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

    if (event.key === nextKey) {
      // Move to next trigger if focused on a menubar trigger
      const activeEl = document.activeElement;
      const currentIdx = menus.findIndex((m) => m.triggerEl === activeEl);
      if (currentIdx !== -1) {
        event.preventDefault();
        const nextIdx = (currentIdx + 1) % count;
        focusTriggerAtIndex(nextIdx);
      }
    } else if (event.key === prevKey) {
      // Move to previous trigger if focused on a menubar trigger
      const activeEl = document.activeElement;
      const currentIdx = menus.findIndex((m) => m.triggerEl === activeEl);
      if (currentIdx !== -1) {
        event.preventDefault();
        const prevIdx = (currentIdx - 1 + count) % count;
        focusTriggerAtIndex(prevIdx);
      }
    } else if (event.key === 'Home') {
      const activeEl = document.activeElement;
      const currentIdx = menus.findIndex((m) => m.triggerEl === activeEl);
      if (currentIdx !== -1) {
        event.preventDefault();
        focusTriggerAtIndex(0);
      }
    } else if (event.key === 'End') {
      const activeEl = document.activeElement;
      const currentIdx = menus.findIndex((m) => m.triggerEl === activeEl);
      if (currentIdx !== -1) {
        event.preventDefault();
        focusTriggerAtIndex(count - 1);
      }
    }
  };

  const menubarClasses = ['a11y-menubar', `a11y-menubar--${orientation}`, className]
    .filter(Boolean)
    .join(' ');

  let itemCounter = 0;
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const idx = itemCounter++;
      return React.cloneElement(child, {
        menubarIndex: idx,
      } as any);
    }
    return child;
  });

  return (
    <MenubarContext.Provider value={contextValue}>
      <div
        id={menubarId}
        role="menubar"
        aria-label={label}
        aria-orientation={orientation}
        className={menubarClasses}
        onKeyDown={handleKeyDown}
      >
        {clonedChildren}
      </div>
    </MenubarContext.Provider>
  );
};

Menubar.displayName = 'Menubar';
