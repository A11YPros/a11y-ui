'use client';

import React from 'react';

export interface MenubarContextValue {
  /**
   * Currently open menu ID (or null if all menus are closed).
   */
  openMenuId: string | null;

  /**
   * Opens or closes a menu in the menubar.
   */
  setOpenMenuId: (id: string | null, initialFocus?: 'first' | 'last' | null) => void;

  /**
   * Whether any menu in the menubar is currently open.
   */
  isMenubarActive: boolean;

  /**
   * Register a menu's trigger button in the menubar.
   */
  registerMenu: (id: string, triggerEl: HTMLElement | null) => void;

  /**
   * Unregister a menu from the menubar.
   */
  unregisterMenu: (id: string) => void;

  /**
   * Currently focused trigger index in the menubar (for roving tabindex).
   */
  focusedMenuIndex: number;
  setFocusedMenuIndex: (index: number) => void;
  setFocusedMenuId: (id: string) => void;

  /**
   * Switch between adjacent menus via ArrowRight / ArrowLeft.
   */
  switchMenu: (currentId: string, direction: 'next' | 'prev') => void;

  /**
   * Handle hover when another menu is already open.
   */
  onTriggerMouseEnter: (id: string) => void;

  /**
   * Get initial focus direction requested for a newly opened menu ('first' | 'last' | null).
   */
  getInitialFocusForMenu: (id: string) => 'first' | 'last' | null;
  clearInitialFocusForMenu: (id: string) => void;
}

export const MenubarContext = React.createContext<MenubarContextValue | null>(null);

export function useMenubarContext(): MenubarContextValue | null {
  return React.useContext(MenubarContext);
}
