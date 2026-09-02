import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yTabs, registerTabs } from './a11y-tabs';

expect.extend(toHaveNoViolations);

describe('A11yTabs (<a11y-tabs>)', () => {
  beforeEach(() => {
    registerTabs();
    document.body.innerHTML = '';
  });

  it('renders tablist and tab panels with correct ARIA roles and attributes', () => {
    const tabs = document.createElement('a11y-tabs') as A11yTabs;
    tabs.setAttribute('aria-label', 'Feature tabs');
    tabs.innerHTML = `
      <a11y-tab-panel label="Tab 1"><p>Panel 1 content</p></a11y-tab-panel>
      <a11y-tab-panel label="Tab 2"><p>Panel 2 content</p></a11y-tab-panel>
    `;
    document.body.appendChild(tabs);

    const tablist = tabs.querySelector('[role="tablist"]');
    expect(tablist).not.toBeNull();
    expect(tablist?.getAttribute('aria-label')).toBe('Feature tabs');

    const tabButtons = tabs.querySelectorAll('[role="tab"]');
    expect(tabButtons.length).toBe(2);
    expect(tabButtons[0].getAttribute('aria-selected')).toBe('true');
    expect(tabButtons[0].getAttribute('tabindex')).toBe('0');
    expect(tabButtons[1].getAttribute('aria-selected')).toBe('false');
    expect(tabButtons[1].getAttribute('tabindex')).toBe('-1');

    const panels = tabs.querySelectorAll('[role="tabpanel"]');
    expect(panels.length).toBe(2);
    expect((panels[0] as HTMLElement).style.display).not.toBe('none');
    expect((panels[1] as HTMLElement).style.display).toBe('none');
  });

  it('switches tab on click and updates selection', () => {
    const tabs = document.createElement('a11y-tabs') as A11yTabs;
    tabs.innerHTML = `
      <a11y-tab-panel label="First">Content 1</a11y-tab-panel>
      <a11y-tab-panel label="Second">Content 2</a11y-tab-panel>
    `;
    document.body.appendChild(tabs);

    const tabButtons = tabs.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabButtons[1].click();

    expect(tabButtons[0].getAttribute('aria-selected')).toBe('false');
    expect(tabButtons[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs.selectedIndex).toBe(1);
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const tabs = document.createElement('a11y-tabs') as A11yTabs;
    tabs.setAttribute('aria-label', 'Accessible Tabs');
    tabs.innerHTML = `
      <a11y-tab-panel label="Overview"><p>Overview text</p></a11y-tab-panel>
      <a11y-tab-panel label="Details"><p>Details text</p></a11y-tab-panel>
    `;
    document.body.appendChild(tabs);

    const results = await axe(tabs);
    expect(results).toHaveNoViolations();
  });

  it('dispatches change exactly once per selection and honors an initial selected-index', () => {
    const tabs = document.createElement('a11y-tabs') as A11yTabs;
    tabs.setAttribute('aria-label', 'Settings');
    tabs.setAttribute('selected-index', '1');
    tabs.innerHTML = `
      <a11y-tab-panel label="General">General</a11y-tab-panel>
      <a11y-tab-panel label="Security">Security</a11y-tab-panel>
      <a11y-tab-panel label="Billing">Billing</a11y-tab-panel>
    `;
    document.body.appendChild(tabs);

    const buttons = Array.from(tabs.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs.selectedIndex).toBe(1);

    let changes = 0;
    tabs.addEventListener('change', () => changes++);

    buttons[2].click();
    expect(changes).toBe(1);
    expect(tabs.getAttribute('selected-index')).toBe('2');

    tabs.selectedIndex = 0;
    expect(changes).toBe(2);

    tabs.setAttribute('selected-index', '1');
    expect(changes).toBe(3);
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
  });
});
