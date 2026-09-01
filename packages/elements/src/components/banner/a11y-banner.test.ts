import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yBanner, registerBanner } from './a11y-banner';

expect.extend(toHaveNoViolations);

describe('A11yBanner (<a11y-banner>)', () => {
  beforeEach(() => {
    registerBanner();
    document.body.innerHTML = '';
  });

  it('renders banner with title, icon, and correct aria-live attributes', () => {
    const banner = document.createElement('a11y-banner') as A11yBanner;
    banner.setAttribute('variant', 'success');
    banner.setAttribute('title', 'Success!');
    banner.innerHTML = '<p>Operation completed successfully.</p>';
    document.body.appendChild(banner);

    const container = banner.querySelector('.banner') as HTMLDivElement;
    expect(container).not.toBeNull();
    expect(container.classList.contains('banner--success')).toBe(true);
    expect(container.getAttribute('aria-live')).toBe('polite');

    const title = banner.querySelector('.banner__title');
    expect(title?.textContent).toBe('Success!');

    const icon = banner.querySelector('.banner__variant-icon');
    expect(icon).not.toBeNull();
  });

  it('sets assertive aria-live for error and warning variants', () => {
    const banner = document.createElement('a11y-banner') as A11yBanner;
    banner.setAttribute('variant', 'error');
    banner.setAttribute('title', 'Error occurred');
    document.body.appendChild(banner);

    const container = banner.querySelector('.banner') as HTMLDivElement;
    expect(container.getAttribute('aria-live')).toBe('assertive');
    expect(container.getAttribute('aria-atomic')).toBe('true');
  });

  it('handles dismissal when dismissible is true', () => {
    const banner = document.createElement('a11y-banner') as A11yBanner;
    banner.setAttribute('title', 'Dismissible Notice');
    banner.setAttribute('dismissible', '');
    document.body.appendChild(banner);

    const closeBtn = banner.querySelector('.banner__close') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    expect(closeBtn.style.display).not.toBe('none');

    closeBtn.click();
    expect(banner.exposed).toBe(false);
    expect(banner.style.display).toBe('none');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const banner = document.createElement('a11y-banner') as A11yBanner;
    banner.setAttribute('variant', 'info');
    banner.setAttribute('title', 'Important Information');
    banner.innerHTML = '<p>System maintenance tonight at 11 PM.</p>';
    document.body.appendChild(banner);

    const results = await axe(banner);
    expect(results).toHaveNoViolations();
  });
});
