import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yInput, registerInput } from './a11y-input';

expect.extend(toHaveNoViolations);

describe('A11yInput (<a11y-input>)', () => {
  beforeEach(() => {
    registerInput();
    document.body.innerHTML = '';
  });

  it('renders input with associated label and correct class names', () => {
    const input = document.createElement('a11y-input') as A11yInput;
    input.setAttribute('label', 'Full Name');
    input.setAttribute('placeholder', 'Jane Doe');
    document.body.appendChild(input);

    const nativeInput = input.querySelector('input') as HTMLInputElement;
    expect(nativeInput).not.toBeNull();
    expect(nativeInput.classList.contains('form-input')).toBe(true);

    const label = input.querySelector('label') as HTMLLabelElement;
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Full Name');
    expect(label.htmlFor).toBe(nativeInput.id);
  });

  it('renders required asterisk and attribute when required', () => {
    const input = document.createElement('a11y-input') as A11yInput;
    input.setAttribute('label', 'Email');
    input.setAttribute('required', '');
    document.body.appendChild(input);

    const nativeInput = input.querySelector('input') as HTMLInputElement;
    expect(nativeInput.required).toBe(true);

    const reqSpan = input.querySelector('.form-label__required');
    expect(reqSpan).not.toBeNull();
    expect(reqSpan?.textContent).toBe(' *');
  });

  it('handles error message, aria-invalid, and aria-describedby', () => {
    const input = document.createElement('a11y-input') as A11yInput;
    input.setAttribute('label', 'Password');
    input.setAttribute('error', 'Password is too short');
    document.body.appendChild(input);

    const nativeInput = input.querySelector('input') as HTMLInputElement;
    expect(nativeInput.getAttribute('aria-invalid')).toBe('true');
    expect(nativeInput.classList.contains('form-input--error')).toBe(true);

    const errorSpan = input.querySelector('.form-error-text') as HTMLSpanElement;
    expect(errorSpan.textContent).toBe('Password is too short');
    expect(errorSpan.getAttribute('role')).toBe('alert');
    expect(nativeInput.getAttribute('aria-describedby')).toBe(errorSpan.id);
  });

  it('handles helper text when there is no error', () => {
    const input = document.createElement('a11y-input') as A11yInput;
    input.setAttribute('label', 'Username');
    input.setAttribute('helper-text', 'Must be unique');
    document.body.appendChild(input);

    const nativeInput = input.querySelector('input') as HTMLInputElement;
    const helperSpan = input.querySelector('.form-helper-text') as HTMLSpanElement;
    expect(helperSpan.textContent).toBe('Must be unique');
    expect(nativeInput.getAttribute('aria-describedby')).toBe(helperSpan.id);
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const input = document.createElement('a11y-input') as A11yInput;
    input.setAttribute('label', 'Accessible Name');
    input.setAttribute('helper-text', 'Enter your name');
    document.body.appendChild(input);

    const results = await axe(input);
    expect(results).toHaveNoViolations();
  });

  it('preserves typed input when an unrelated attribute such as error changes', () => {
    const el = document.createElement('a11y-input') as A11yInput;
    el.setAttribute('label', 'Email');
    document.body.appendChild(el);

    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'user@example.com';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    el.setAttribute('error', 'Invalid email');
    el.setAttribute('helper-text', 'Helper');
    el.setAttribute('disabled', '');

    expect(input.value).toBe('user@example.com');
    expect(el.value).toBe('user@example.com');

    // The value attribute itself still drives the control
    el.setAttribute('value', 'reset@example.com');
    expect(input.value).toBe('reset@example.com');
  });
});
