import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yMenubar, registerMenubar } from './a11y-menubar';
import { registerMenu } from '../menu/a11y-menu';

expect.extend(toHaveNoViolations);

describe('A11yMenubar (<a11y-menubar>)', () => {
  beforeEach(() => {
    registerMenu();
    registerMenubar();
    document.body.innerHTML = '';
  });

  it('renders menubar container with role="menubar" and accessible label', () => {
    const menubar = document.createElement('a11y-menubar') as A11yMenubar;
    menubar.setAttribute('label', 'App Menubar');
    menubar.innerHTML = `
      <a11y-menu label="File"><a11y-menu-item>New</a11y-menu-item></a11y-menu>
      <a11y-menu label="Edit"><a11y-menu-item>Undo</a11y-menu-item></a11y-menu>
    `;
    document.body.appendChild(menubar);

    const bar = menubar.querySelector('[role="menubar"]');
    expect(bar).not.toBeNull();
    expect(bar?.getAttribute('aria-label')).toBe('App Menubar');
    expect(bar?.classList.contains('a11y-menubar')).toBe(true);
  });

  it('ensures only one menu is open at a time and trigger has no btn classes', () => {
    const menubar = document.createElement('a11y-menubar') as A11yMenubar;
    menubar.innerHTML = `
      <a11y-menu id="menu-file" label="File">
        <a11y-menu-item shortcut="⌘N">New</a11y-menu-item>
      </a11y-menu>
      <a11y-menu id="menu-edit" label="Edit">
        <a11y-menu-item shortcut="⌘Z">Undo</a11y-menu-item>
      </a11y-menu>
    `;
    document.body.appendChild(menubar);

    const fileMenu = menubar.querySelector('#menu-file') as any;
    const editMenu = menubar.querySelector('#menu-edit') as any;

    const fileTrigger = fileMenu.querySelector('button') as HTMLButtonElement;
    expect(fileTrigger.classList.contains('btn')).toBe(false);

    // Open file menu
    fileMenu.open = true;
    expect(fileMenu.open).toBe(true);
    expect(editMenu.open).toBe(false);

    // Open edit menu -> file menu should close automatically
    editMenu.open = true;
    expect(fileMenu.open).toBe(false);
    expect(editMenu.open).toBe(true);

    // Verify label text in Undo item is not duplicated with shortcut
    const undoLabel = editMenu.querySelector('.a11y-menu-item__label')?.textContent;
    expect(undoLabel).toBe('Undo');
  });

  it('navigates between parent menu items with arrow keys and shows adjacent submenu when open', () => {
    const menubar = document.createElement('a11y-menubar') as A11yMenubar;
    menubar.innerHTML = `
      <a11y-menu id="menu-file" label="File">
        <a11y-menu-item>New</a11y-menu-item>
      </a11y-menu>
      <a11y-menu id="menu-edit" label="Edit">
        <a11y-menu-item>Undo</a11y-menu-item>
      </a11y-menu>
      <a11y-menu id="menu-view" label="View">
        <a11y-menu-item>Zoom</a11y-menu-item>
      </a11y-menu>
    `;
    document.body.appendChild(menubar);

    const fileMenu = menubar.querySelector('#menu-file') as any;
    const editMenu = menubar.querySelector('#menu-edit') as any;
    const viewMenu = menubar.querySelector('#menu-view') as any;

    const fileTrigger = fileMenu.querySelector('button') as HTMLButtonElement;
    const editTrigger = editMenu.querySelector('button') as HTMLButtonElement;

    // File menu trigger is focused and its submenu is open
    fileTrigger.focus();
    fileMenu.open = true;
    expect(fileMenu.open).toBe(true);
    expect(editMenu.open).toBe(false);

    // Press ArrowRight on menubar: moves to Edit, opens Edit submenu, closes File submenu
    const bar = menubar.querySelector('.a11y-menubar') as HTMLElement;
    bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(fileMenu.open).toBe(false);
    expect(editMenu.open).toBe(true);
    expect(document.activeElement).toBe(editTrigger);

    // Press ArrowLeft: moves back to File, opens File submenu, closes Edit submenu
    bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

    expect(fileMenu.open).toBe(true);
    expect(editMenu.open).toBe(false);
    expect(document.activeElement).toBe(fileTrigger);
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const menubar = document.createElement('a11y-menubar') as A11yMenubar;
    menubar.setAttribute('label', 'Top Navigation');
    menubar.innerHTML = `
      <a11y-menu label="File"><a11y-menu-item>Save</a11y-menu-item></a11y-menu>
    `;
    document.body.appendChild(menubar);

    const results = await axe(menubar);
    expect(results).toHaveNoViolations();
  });
});
