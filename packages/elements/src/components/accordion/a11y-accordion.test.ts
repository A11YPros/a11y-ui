import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yAccordion, A11yAccordionItem, registerAccordion } from './a11y-accordion';

expect.extend(toHaveNoViolations);

describe('A11yAccordion and A11yAccordionItem', () => {
  beforeEach(() => {
    registerAccordion();
    document.body.innerHTML = '';
  });

  it('renders native HTML5 details and summary structure with exact class names', () => {
    const item = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item.setAttribute('title', 'What is WCAG?');
    item.innerHTML = '<p>Web Content Accessibility Guidelines</p>';
    document.body.appendChild(item);

    const details = item.querySelector('details') as HTMLDetailsElement;
    expect(details).not.toBeNull();
    expect(details.classList.contains('accordion-item')).toBe(true);

    const summary = item.querySelector('summary') as HTMLElement;
    expect(summary).not.toBeNull();
    expect(summary.classList.contains('accordion-item__summary')).toBe(true);

    const title = item.querySelector('.accordion-item__title');
    expect(title?.textContent).toBe('What is WCAG?');

    const icon = item.querySelector('.accordion-item__icon');
    expect(icon).not.toBeNull();

    const content = item.querySelector('.accordion-item__content');
    expect(content?.textContent).toContain('Web Content Accessibility Guidelines');
  });

  it('reflects open property and attribute correctly', () => {
    const item = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item.setAttribute('title', 'Section 1');
    item.open = true;
    document.body.appendChild(item);

    const details = item.querySelector('details') as HTMLDetailsElement;
    expect(details.open).toBe(true);
    expect(item.hasAttribute('open')).toBe(true);

    item.open = false;
    expect(details.open).toBe(false);
    expect(item.hasAttribute('open')).toBe(false);
  });

  it('collapses siblings when allow-multiple is false', () => {
    const accordion = document.createElement('a11y-accordion') as A11yAccordion;
    accordion.setAttribute('allow-multiple', 'false');

    const item1 = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item1.setAttribute('title', 'Section 1');
    item1.open = true;

    const item2 = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item2.setAttribute('title', 'Section 2');

    accordion.appendChild(item1);
    accordion.appendChild(item2);
    document.body.appendChild(accordion);

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(false);

    // Open item2
    item2.open = true;
    item2.querySelector('details')?.dispatchEvent(new Event('toggle'));

    expect(item2.open).toBe(true);
    expect(item1.open).toBe(false);
  });

  it('allows multiple items open when allow-multiple is true', () => {
    const accordion = document.createElement('a11y-accordion') as A11yAccordion;
    accordion.setAttribute('allow-multiple', 'true');

    const item1 = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item1.setAttribute('title', 'Section 1');
    item1.open = true;

    const item2 = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item2.setAttribute('title', 'Section 2');
    item2.open = true;

    accordion.appendChild(item1);
    accordion.appendChild(item2);
    document.body.appendChild(accordion);

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(true);
  });

  it('has no accessibility violations in axe audit', async () => {
    const accordion = document.createElement('a11y-accordion') as A11yAccordion;
    const item = document.createElement('a11y-accordion-item') as A11yAccordionItem;
    item.setAttribute('title', 'Accessible Section');
    item.innerHTML = '<p>Section content</p>';
    accordion.appendChild(item);
    document.body.appendChild(accordion);

    const results = await axe(accordion);
    expect(results).toHaveNoViolations();
  });
});
