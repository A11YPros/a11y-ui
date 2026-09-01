import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yCheckbox, registerCheckbox } from './a11y-checkbox';

expect.extend(toHaveNoViolations);

describe('A11yCheckbox (<a11y-checkbox>)', () => {
  beforeEach(() => {
    registerCheckbox();
    document.body.innerHTML = '';
  });

  it('renders native checkbox input with associated label and wrapper classes', () => {
    const cb = document.createElement('a11y-checkbox') as A11yCheckbox;
    cb.setAttribute('label', 'Subscribe to newsletter');
    document.body.appendChild(cb);

    const nativeInput = cb.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(nativeInput).not.toBeNull();
    expect(nativeInput.classList.contains('form-checkbox')).toBe(true);

    const label = cb.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toBe('Subscribe to newsletter');
    expect(label.htmlFor).toBe(nativeInput.id);
  });

  it('handles checked and indeterminate properties and attributes', () => {
    const cb = document.createElement('a11y-checkbox') as A11yCheckbox;
    cb.setAttribute('label', 'Select all');
    cb.checked = true;
    cb.indeterminate = true;
    document.body.appendChild(cb);

    const nativeInput = cb.querySelector('input') as HTMLInputElement;
    expect(nativeInput.checked).toBe(true);
    expect(nativeInput.indeterminate).toBe(true);
  });

  it('handles error message and aria attributes', () => {
    const cb = document.createElement('a11y-checkbox') as A11yCheckbox;
    cb.setAttribute('label', 'Terms of service');
    cb.setAttribute('error', 'You must agree to continue');
    document.body.appendChild(cb);

    const nativeInput = cb.querySelector('input') as HTMLInputElement;
    expect(nativeInput.getAttribute('aria-invalid')).toBe('true');
    expect(nativeInput.classList.contains('form-checkbox--error')).toBe(true);

    const error = cb.querySelector('.form-error-text') as HTMLSpanElement;
    expect(error.textContent).toBe('You must agree to continue');
    expect(error.getAttribute('role')).toBe('alert');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const cb = document.createElement('a11y-checkbox') as A11yCheckbox;
    cb.setAttribute('label', 'Accessible Checkbox');
    document.body.appendChild(cb);

    const results = await axe(cb);
    expect(results).toHaveNoViolations();
  });
});
