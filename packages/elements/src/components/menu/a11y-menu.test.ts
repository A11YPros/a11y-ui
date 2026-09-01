import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yMenu, registerMenu } from './a11y-menu';

expect.extend(toHaveNoViolations);

describe('A11yMenu (<a11y-menu>)', () => {
  beforeEach(() => {
    registerMenu();
    document.body.innerHTML = '';
  });

  it('renders trigger with aria-haspopup and menu dropdown with role="menu"', () => {
    const menu = document.createElement('a11y-menu') as A11yMenu;
    menu.setAttribute('label', 'Options');
    menu.innerHTML = `
      <a11y-menu-item>Cut</a11y-menu-item>
      <a11y-menu-item>Copy</a11y-menu-item>
      <a11y-menu-divider></a11y-menu-divider>
      <a11y-menu-item danger>Delete</a11y-menu-item>
    `;
    document.body.appendChild(menu);

    const trigger = menu.querySelector('[aria-haspopup="menu"]');
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');

    const dropdown = menu.querySelector('[role="menu"]');
    expect(dropdown).not.toBeNull();

    const items = menu.querySelectorAll('[role="menuitem"]');
    expect(items.length).toBe(3);

    const separator = menu.querySelector('[role="separator"]');
    expect(separator).not.toBeNull();
  });

  it('toggles open state on trigger click', () => {
    const menu = document.createElement('a11y-menu') as A11yMenu;
    menu.innerHTML = '<a11y-menu-item>Profile</a11y-menu-item>';
    document.body.appendChild(menu);

    const trigger = menu.querySelector('button') as HTMLButtonElement;
    expect(menu.open).toBe(false);

    trigger.click();
    expect(menu.open).toBe(true);

    trigger.click();
    expect(menu.open).toBe(false);
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const menu = document.createElement('a11y-menu') as A11yMenu;
    menu.setAttribute('label', 'File Actions');
    menu.innerHTML = `
      <a11y-menu-item>New Tab</a11y-menu-item>
      <a11y-menu-item>New Window</a11y-menu-item>
    `;
    document.body.appendChild(menu);

    const results = await axe(menu);
    expect(results).toHaveNoViolations();
  });
});
