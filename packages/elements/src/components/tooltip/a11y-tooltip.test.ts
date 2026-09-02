import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yTooltip, registerTooltip } from './a11y-tooltip';

expect.extend(toHaveNoViolations);

describe('A11yTooltip (<a11y-tooltip>)', () => {
  beforeEach(() => {
    registerTooltip();
    document.body.innerHTML = '';
  });

  it('renders trigger element and tooltip with role="tooltip"', () => {
    const tip = document.createElement('a11y-tooltip') as A11yTooltip;
    tip.setAttribute('content', 'Helpful context');
    tip.innerHTML = '<button type="button">Action</button>';
    document.body.appendChild(tip);

    const tooltip = tip.querySelector('[role="tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.textContent).toContain('Helpful context');

    const triggerWrap = tip.querySelector('.a11y-tooltip-trigger-wrap');
    expect(triggerWrap?.getAttribute('aria-describedby')).toBe(tooltip?.id);
  });

  it('shows on show() and hides on hide()', () => {
    const tip = document.createElement('a11y-tooltip') as A11yTooltip;
    tip.setAttribute('content', 'Tooltip text');
    tip.innerHTML = '<button type="button">Hover me</button>';
    document.body.appendChild(tip);

    expect(tip.open).toBe(false);
    tip.show();
    expect(tip.open).toBe(true);

    tip.hide();
    expect(tip.open).toBe(false);
  });

  it('supports text and position attribute aliases and heading', () => {
    const tip = document.createElement('a11y-tooltip') as A11yTooltip;
    tip.setAttribute('text', 'Shortcut details');
    tip.setAttribute('position', 'bottom');
    tip.setAttribute('heading', 'Shortcut');
    tip.setAttribute('open', '');
    tip.innerHTML = '<button type="button">Trigger</button>';
    document.body.appendChild(tip);

    expect(tip.content).toBe('Shortcut details');
    expect(tip.placement).toBe('bottom');

    const heading = tip.querySelector('.a11y-tooltip__heading');
    expect(heading?.textContent).toBe('Shortcut');

    const content = tip.querySelector('.a11y-tooltip__content');
    expect(content?.textContent).toBe('Shortcut details');

    const arrow = tip.querySelector('.a11y-tooltip__arrow');
    expect(arrow).not.toBeNull();
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const tip = document.createElement('a11y-tooltip') as A11yTooltip;
    tip.setAttribute('content', 'Accessible description');
    tip.innerHTML = '<button type="button">Accessible Trigger</button>';
    document.body.appendChild(tip);

    const results = await axe(tip);
    expect(results).toHaveNoViolations();
  });
});
