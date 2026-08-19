'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DocsSidebarNav, headerLinks, HeaderLinkIcon, NPM_VERSION, NavLink } from './DocsNav';
import { UiLogo } from '../../_components/UiLogo';
import { ThemeToggle } from '../../_components/ThemeToggle';

export function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close on route change
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  // Handle body scroll locking and focus management
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first interactive element in drawer
      requestAnimationFrame(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        }
      });

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      // When drawer is closed, return focus to trigger button if it had focus inside
      if (triggerRef.current && document.activeElement && drawerRef.current?.contains(document.activeElement)) {
        triggerRef.current.focus();
      }
    }
  }, [isOpen]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
        triggerRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDrawer]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="docs-mobile-menu-btn"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="docs-mobile-drawer"
        onClick={toggleDrawer}
      >
        <span className="docs-mobile-menu-btn__icon" aria-hidden="true">
          {isOpen ? (
            <svg viewBox="0 0 24 24" width="22" height="22" focusable="false">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" focusable="false">
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"
              />
            </svg>
          )}
        </span>
        <span className="docs-mobile-menu-btn__text">Menu</span>
      </button>

      {/* Backdrop */}
      <div
        className={`docs-drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Dialog */}
      <div
        id="docs-mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Documentation Navigation"
        className={`docs-drawer-sheet ${isOpen ? 'is-open' : ''}`}
        tabIndex={-1}
      >
        <div className="docs-drawer-header">
          <Link href="/" className="docs-brand" onClick={closeDrawer}>
            <UiLogo className="docs-brand__logo" />
            <span className="visually-hidden">A11y UI</span>
          </Link>
          <div className="docs-drawer-header__actions">
            <ThemeToggle className="docs-theme-toggle" />
            <button
              ref={closeBtnRef}
              type="button"
              className="docs-drawer-close"
              aria-label="Close navigation menu"
              onClick={closeDrawer}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" focusable="false" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="docs-drawer-body">
          <DocsSidebarNav onItemClick={closeDrawer} />

          <div className="docs-drawer-links">
            <p className="docs-sidebar__heading">External</p>
            <ul className="docs-drawer-links__list">
              {headerLinks
                .filter((l: NavLink) => l.external)
                .map((link: NavLink) => (
                  <li key={link.href}>
                    {link.icon === 'npm' ? (
                      <a
                        className="HeaderLink"
                        href={link.href}
                        rel="noopener"
                        aria-label={`npm version ${NPM_VERSION}`}
                        onClick={closeDrawer}
                      >
                        <svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                          <rect width="16" height="16" fill="black"></rect>
                          <rect x="3" y="3" width="10" height="10" fill="white"></rect>
                          <path d="M8 5H11V13H8V5Z" fill="black"></path>
                        </svg>
                        NPM v{NPM_VERSION}
                      </a>
                    ) : (
                      <a
                        className="HeaderLink"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeDrawer}
                      >
                        <HeaderLinkIcon icon={link.icon} /> {link.label}
                      </a>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
