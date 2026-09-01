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

    const trigger = menu.querySelector('button') as HTMLButtonElement;
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.classList.contains('btn')).toBe(true);
    expect(trigger.classList.contains('btn--secondary')).toBe(true);
    expect(trigger.classList.contains('btn--md')).toBe(true);

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

  it('fires click and select events when a11y-menu-item is clicked', () => {
    const menu = document.createElement('a11y-menu') as A11yMenu;
    menu.innerHTML = '<a11y-menu-item id="item-edit">Edit</a11y-menu-item>';
    document.body.appendChild(menu);

    const item = menu.querySelector('#item-edit') as HTMLElement;
    let clicked = false;
    let selected = false;

    item.addEventListener('click', () => {
      clicked = true;
    });
    item.addEventListener('select', () => {
      selected = true;
    });

    const innerBtn = item.querySelector('button') as HTMLButtonElement;
    innerBtn.click();

    expect(clicked).toBe(true);
    expect(selected).toBe(true);
    expect(menu.open).toBe(false);
  });

  it('correctly populates label when child text node is attached after element connection', async () => {
    const item = document.createElement('a11y-menu-item');
    item.setAttribute('shortcut', '⌘N');
    document.body.appendChild(item);

    item.appendChild(document.createTextNode('New File'));

    await new Promise((resolve) => setTimeout(resolve, 20));

    const labelSpan = item.querySelector('.a11y-menu-item__label');
    expect(labelSpan?.textContent).toBe('New File');

    const shortcut = item.querySelector('.a11y-menu-item__shortcut');
    expect(shortcut?.textContent).toBe('⌘N');
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
