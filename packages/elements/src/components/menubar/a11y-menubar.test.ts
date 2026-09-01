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
