import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yButton, registerButton } from './a11y-button';

expect.extend(toHaveNoViolations);

describe('A11yButton (<a11y-button>)', () => {
  beforeEach(() => {
    registerButton();
    document.body.innerHTML = '';
  });

  it('has no accessibility violations in axe audit', async () => {
    const el = document.createElement('a11y-button') as A11yButton;
    el.textContent = 'Save Changes';
    document.body.appendChild(el);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('renders native button with default variant primary and size md', () => {
    const el = document.createElement('a11y-button') as A11yButton;
    el.textContent = 'Submit';
    document.body.appendChild(el);

    const button = el.querySelector('button') as HTMLButtonElement;
    expect(button).not.toBeNull();

    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn--primary')).toBe(true);
    expect(button.classList.contains('btn--md')).toBe(true);
    expect(button.textContent).toContain('Submit');
  });

  it('supports variants secondary, ghost, danger', () => {
    const el = document.createElement('a11y-button') as A11yButton;
    el.setAttribute('variant', 'danger');
    el.textContent = 'Delete';
    document.body.appendChild(el);

    const button = el.querySelector('button') as HTMLButtonElement;
    expect(button.classList.contains('btn--danger')).toBe(true);
  });

  it('disables button when disabled attribute is present', () => {
    const el = document.createElement('a11y-button') as A11yButton;
    el.disabled = true;
    el.textContent = 'Disabled';
    document.body.appendChild(el);

    const button = el.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('handles loading state with aria-busy and status text', () => {
    const el = document.createElement('a11y-button') as A11yButton;
    el.loading = true;
    el.textContent = 'Save';
    document.body.appendChild(el);

    const button = el.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.disabled).toBe(true);
    expect(button.classList.contains('btn--loading')).toBe(true);

    const status = el.querySelector('.btn__sr-status');
    expect(status?.textContent).toBe('Loading...');

    const spinner = el.querySelector('.btn__spinner');
    expect(spinner).not.toBeNull();
    const spinnerIcon = spinner?.querySelector('svg.btn__spinner-icon');
    expect(spinnerIcon).not.toBeNull();
  });

  it('allows programmatic focus and blur', () => {
    const el = document.createElement('a11y-button') as A11yButton;
    el.textContent = 'Focus Me';
    document.body.appendChild(el);

    const button = el.querySelector('button') as HTMLButtonElement;
    el.focus();
    expect(document.activeElement).toBe(button);

    el.blur();
    expect(document.activeElement).not.toBe(button);
  });
});
