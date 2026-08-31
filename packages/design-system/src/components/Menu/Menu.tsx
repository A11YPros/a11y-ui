'use client';

import React from 'react';
import { useMenubarContext } from '../Menubar/MenubarContext';
import './Menu.css';

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface MenuProps {
  /**
   * The trigger element (e.g. <Button>Actions</Button> or icon button).
   * Automatically wired with aria-haspopup, aria-expanded, and keyboard handlers.
   */
  trigger: React.ReactNode;

  /**
   * Menu content (MenuItem, MenuDivider, MenuGroup).
   */
  children: React.ReactNode;

  /**
   * Accessible label for the menu if trigger does not contain readable text.
   */
  label?: string;

  /**
   * Controlled open state.
   */
  isOpen?: boolean;

  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Dropdown alignment relative to trigger.
   * @default 'bottom-start'
   */
  placement?: MenuPlacement;

  /**
   * Whether selecting an item automatically closes the menu.
   * @default true
   */
  closeOnSelect?: boolean;

  className?: string;
  menuClassName?: string;
  id?: string;

  /**
   * Internal index when rendered inside Menubar.
   * @internal
   */
  menubarIndex?: number;
}

export interface MenuItemProps {
  /**
   * Item label or elements.
   */
  children: React.ReactNode;

  /**
   * Action handler called when item is activated via click, Enter, or Space.
   */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;

  /**
   * Optional URL to render item as an accessible link (<a role="menuitem">).
   */
  href?: string;
  target?: string;
  rel?: string;

  /**
   * Optional leading icon or SVG.
   */
  icon?: React.ReactNode;

  /**
   * Optional trailing keyboard shortcut badge (e.g. '⌘C', 'Ctrl+S').
   */
  shortcut?: string;

  /**
   * Disables the menu item and skips it during keyboard arrow navigation.
   */
  disabled?: boolean;

  /**
   * Highlights item in red for dangerous/destructive actions (e.g. Delete, Revoke).
   */
  danger?: boolean;

  className?: string;
  id?: string;
}

export interface MenuDividerProps {
  className?: string;
}

export interface MenuGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

interface MenuContextValue {
  closeMenu: (restoreFocus?: boolean) => void;
  closeOnSelect: boolean;
  registerItem: (id: string, element: HTMLElement | null, disabled: boolean) => void;
  unregisterItem: (id: string) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

function useMenuContext(): MenuContextValue {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('MenuItem, MenuDivider, and MenuGroup must be used within a Menu');
  }
  return context;
}

/**
 * Dropdown / Action Menu Component
 *
 * Implements the WAI-ARIA Menu Button Pattern:
 * - Trigger: aria-haspopup="menu", aria-expanded
 * - Menu: role="menu", aria-labelledby
 * - Items: role="menuitem", roving tabIndex
 * - Arrow navigation with loop-around and disabled-item skipping
 * - Escape key dismissal with focus return to trigger
 * - Click outside detection
 */
export const Menu: React.FC<MenuProps> = ({
  trigger,
  children,
  label,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  closeOnSelect = true,
  className = '',
  menuClassName = '',
  id,
  menubarIndex,
}) => {
  const menubarContext = useMenubarContext();
  const isMenubarItem = menubarContext !== null;

  const generatedId = React.useId();
  const menuId = id || `menu-${generatedId}`;
  const triggerId = `menu-trigger-${generatedId}`;

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = React.useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled
    ? controlledIsOpen
    : isMenubarItem
      ? menubarContext.openMenuId === menuId
      : uncontrolledIsOpen;

  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [initialFocus, setInitialFocus] = React.useState<'first' | 'last' | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Register with menubar if composed inside Menubar
  React.useEffect(() => {
    if (isMenubarItem) {
      menubarContext.registerMenu(menuId, triggerRef.current);
      return () => {
        menubarContext.unregisterMenu(menuId);
      };
    }
  }, [isMenubarItem, menubarContext, menuId]);

  // Listen for menubar-requested initial focus direction
  React.useEffect(() => {
    if (isOpen && isMenubarItem) {
      const requestedFocus = menubarContext.getInitialFocusForMenu(menuId);
      if (requestedFocus) {
        setInitialFocus(requestedFocus);
        menubarContext.clearInitialFocusForMenu(menuId);
      }
    }
  }, [isOpen, isMenubarItem, menubarContext, menuId]);

  // Store registered menu item DOM elements and disabled statuses
  const itemsRef = React.useRef<
    Array<{ id: string; element: HTMLElement | null; disabled: boolean }>
  >([]);

  const setOpen = React.useCallback(
    (nextOpen: boolean, focusDirection: 'first' | 'last' | null = 'first') => {
      if (isMenubarItem) {
        menubarContext.setOpenMenuId(nextOpen ? menuId : null, focusDirection);
      } else if (!isControlled) {
        setUncontrolledIsOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isMenubarItem, menubarContext, menuId, isControlled, onOpenChange]
  );

  const closeMenu = React.useCallback(
    (restoreFocus = true) => {
      setOpen(false, null);
      setFocusedIndex(-1);
      setInitialFocus(null);
      if (restoreFocus) {
        // Return focus to trigger button (WCAG 2.4.3 Focus Order / WAI-ARIA Menu Button)
        triggerRef.current?.focus();
      }
    },
    [setOpen]
  );

  const registerItem = React.useCallback(
    (itemId: string, element: HTMLElement | null, disabled: boolean) => {
      const existingIdx = itemsRef.current.findIndex((item) => item.id === itemId);
      if (existingIdx !== -1) {
        itemsRef.current[existingIdx] = { id: itemId, element, disabled };
      } else {
        itemsRef.current.push({ id: itemId, element, disabled });
      }
    },
    []
  );

  const unregisterItem = React.useCallback((itemId: string) => {
    itemsRef.current = itemsRef.current.filter((item) => item.id !== itemId);
  }, []);

  // Helper to find next enabled item index
  const getNextEnabledIndex = React.useCallback(
    (startIndex: number, direction: 'next' | 'prev'): number => {
      const items = itemsRef.current;
      const count = items.length;
      if (count === 0) return -1;

      let nextIndex = startIndex;
      for (let i = 0; i < count; i++) {
        if (direction === 'next') {
          nextIndex = (nextIndex + 1) % count;
        } else {
          nextIndex = (nextIndex - 1 + count) % count;
        }

        if (!items[nextIndex].disabled && items[nextIndex].element) {
          return nextIndex;
        }
      }
      return -1;
    },
    []
  );

  const focusItemAtIndex = React.useCallback((index: number) => {
    const items = itemsRef.current;
    if (index >= 0 && index < items.length) {
      const item = items[index];
      if (!item.disabled && item.element) {
        setFocusedIndex(index);
        item.element.focus();
      }
    }
  }, []);

  // Set initial focus after menu opens and items mount
  React.useEffect(() => {
    if (isOpen && initialFocus) {
      const idx =
        initialFocus === 'first'
          ? getNextEnabledIndex(-1, 'next')
          : getNextEnabledIndex(itemsRef.current.length, 'prev');
      if (idx !== -1) {
        focusItemAtIndex(idx);
      }
      setInitialFocus(null);
    }
  }, [isOpen, initialFocus, getNextEnabledIndex, focusItemAtIndex]);

  // Click outside to close
  React.useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, closeMenu]);

  // Handle keyboard on trigger
  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setInitialFocus('first');
      setOpen(true, 'first');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setInitialFocus('last');
      setOpen(true, 'last');
    }
  };

  const handleTriggerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isOpen) {
      closeMenu(false);
    } else {
      setInitialFocus('first');
      setOpen(true, 'first');
    }
  };

  // Keyboard navigation within the menu
  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIdx = getNextEnabledIndex(focusedIndex, 'next');
        if (nextIdx !== -1) {
          focusItemAtIndex(nextIdx);
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIdx = getNextEnabledIndex(focusedIndex, 'prev');
        if (prevIdx !== -1) {
          focusItemAtIndex(prevIdx);
        }
        break;
      }
      case 'ArrowRight': {
        if (isMenubarItem) {
          event.preventDefault();
          menubarContext.switchMenu(menuId, 'next');
          return;
        }
        break;
      }
      case 'ArrowLeft': {
        if (isMenubarItem) {
          event.preventDefault();
          menubarContext.switchMenu(menuId, 'prev');
          return;
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        const firstIdx = getNextEnabledIndex(-1, 'next');
        if (firstIdx !== -1) {
          focusItemAtIndex(firstIdx);
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        const items = itemsRef.current;
        const lastIdx = getNextEnabledIndex(items.length, 'prev');
        if (lastIdx !== -1) {
          focusItemAtIndex(lastIdx);
        }
        break;
      }
      case 'Escape': {
        event.preventDefault();
        event.stopPropagation();
        closeMenu(true);
        break;
      }
      case 'Tab': {
        // Tab closes menu and moves focus away naturally
        closeMenu(false);
        break;
      }
    }
  };

  // Clone or render trigger with accessible attributes
  let triggerElement: React.ReactNode = trigger;
  if (React.isValidElement(trigger)) {
    const existingProps = trigger.props as Record<string, unknown>;
    triggerElement = React.cloneElement(trigger as React.ReactElement<any>, {
      id: triggerId,
      role: isMenubarItem ? 'menuitem' : (existingProps.role as string | undefined),
      tabIndex: isMenubarItem
        ? menubarIndex !== undefined
          ? menubarIndex === menubarContext.focusedMenuIndex
            ? 0
            : -1
          : menubarContext.openMenuId === menuId
            ? 0
            : -1
        : (existingProps.tabIndex as number | undefined),
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
        const childRef = (trigger as any).ref;
        if (typeof childRef === 'function') {
          childRef(node);
        } else if (childRef && typeof childRef === 'object') {
          childRef.current = node;
        }
      },
      'aria-haspopup': 'menu',
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? menuId : undefined,
      onClick: (e: React.MouseEvent) => {
        (existingProps.onClick as ((e: React.MouseEvent) => void) | undefined)?.(e);
        handleTriggerClick(e);
      },
      onMouseEnter: (e: React.MouseEvent) => {
        (existingProps.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
        if (isMenubarItem) {
          menubarContext.onTriggerMouseEnter(menuId);
        }
      },
      onFocus: (e: React.FocusEvent) => {
        (existingProps.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
        if (isMenubarItem) {
          menubarContext.setFocusedMenuId(menuId);
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        (existingProps.onKeyDown as ((e: React.KeyboardEvent) => void) | undefined)?.(e);
        handleTriggerKeyDown(e);
      },
    });
  }

  const contextValue = React.useMemo<MenuContextValue>(
    () => ({
      closeMenu,
      closeOnSelect,
      registerItem,
      unregisterItem,
      focusedIndex,
      setFocusedIndex,
    }),
    [closeMenu, closeOnSelect, registerItem, unregisterItem, focusedIndex]
  );

  const containerClasses = ['a11y-menu-wrapper', className].filter(Boolean).join(' ');

  const menuClasses = ['a11y-menu', `a11y-menu--${placement}`, menuClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <MenuContext.Provider value={contextValue}>
      <div ref={containerRef} className={containerClasses}>
        {triggerElement}
        {isOpen && (
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            aria-label={label}
            className={menuClasses}
            onKeyDown={handleMenuKeyDown}
            tabIndex={-1}
          >
            {children}
          </div>
        )}
      </div>
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';

/**
 * MenuItem Component
 */
export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  icon,
  shortcut,
  disabled = false,
  danger = false,
  className = '',
  id,
}) => {
  const generatedId = React.useId();
  const itemId = id || `menu-item-${generatedId}`;
  const elementRef = React.useRef<HTMLElement | null>(null);

  const { closeMenu, closeOnSelect, registerItem, unregisterItem, focusedIndex, setFocusedIndex } =
    useMenuContext();

  React.useEffect(() => {
    registerItem(itemId, elementRef.current, disabled);
    return () => {
      unregisterItem(itemId);
    };
  }, [itemId, disabled, registerItem, unregisterItem]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
    if (closeOnSelect && !event.defaultPrevented) {
      closeMenu(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event);
      if (closeOnSelect && !event.defaultPrevented) {
        closeMenu(true);
      }
    }
  };

  const itemClasses = [
    'a11y-menu-item',
    danger && 'a11y-menu-item--danger',
    disabled && 'a11y-menu-item--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && (
        <span className="a11y-menu-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="a11y-menu-item__label">{children}</span>
      {shortcut && <kbd className="a11y-menu-item__shortcut">{shortcut}</kbd>}
    </>
  );

  if (href) {
    return (
      <a
        ref={(el) => {
          elementRef.current = el;
        }}
        id={itemId}
        role="menuitem"
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        className={itemClasses}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={(el) => {
        elementRef.current = el;
      }}
      id={itemId}
      type="button"
      role="menuitem"
      disabled={disabled}
      className={itemClasses}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {content}
    </button>
  );
};

MenuItem.displayName = 'MenuItem';

/**
 * MenuDivider Component
 */
export const MenuDivider: React.FC<MenuDividerProps> = ({ className = '' }) => {
  return (
    <hr role="separator" className={['a11y-menu-divider', className].filter(Boolean).join(' ')} />
  );
};

MenuDivider.displayName = 'MenuDivider';

/**
 * MenuGroup Component
 */
export const MenuGroup: React.FC<MenuGroupProps> = ({ label, children, className = '' }) => {
  const generatedId = React.useId();
  const labelId = label ? `menu-group-label-${generatedId}` : undefined;

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className={['a11y-menu-group', className].filter(Boolean).join(' ')}
    >
      {label && (
        <div id={labelId} className="a11y-menu-group__label">
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

MenuGroup.displayName = 'MenuGroup';
