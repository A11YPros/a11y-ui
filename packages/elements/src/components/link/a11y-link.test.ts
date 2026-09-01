import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yLink, registerLink } from './a11y-link';

expect.extend(toHaveNoViolations);

describe('A11yLink (<a11y-link>)', () => {
  beforeEach(() => {
    registerLink();
    document.body.innerHTML = '';
  });

  it('renders native anchor with correct class names and href', () => {
    const link = document.createElement('a11y-link') as A11yLink;
    link.setAttribute('href', '/dashboard');
    link.textContent = 'Go to Dashboard';
    document.body.appendChild(link);

    const a = link.querySelector('a') as HTMLAnchorElement;
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/dashboard');
    expect(a.classList.contains('link')).toBe(true);
  });

  it('automatically adds noopener noreferrer and external icon for external links', () => {
    const link = document.createElement('a11y-link') as A11yLink;
    link.setAttribute('href', 'https://example.com');
    link.textContent = 'External Site';
    document.body.appendChild(link);

    const a = link.querySelector('a') as HTMLAnchorElement;
    expect(a.target).toBe('_blank');
    expect(a.rel).toContain('noopener');
    expect(a.rel).toContain('noreferrer');

    const icon = link.querySelector('.link__external-icon');
    expect(icon).not.toBeNull();
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const link = document.createElement('a11y-link') as A11yLink;
    link.setAttribute('href', 'https://a11ypros.com');
    link.textContent = 'A11yPros Home';
    document.body.appendChild(link);

    const results = await axe(link);
    expect(results).toHaveNoViolations();
  });
});
