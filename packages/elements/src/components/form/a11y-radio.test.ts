import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yRadio, registerRadio } from './a11y-radio';

expect.extend(toHaveNoViolations);

describe('A11yRadio (<a11y-radio>)', () => {
  beforeEach(() => {
    registerRadio();
    document.body.innerHTML = '';
  });

  it('renders radio input with associated label and correct class names', () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'options');
    radio.setAttribute('value', '1');
    radio.setAttribute('label', 'Option 1');
    document.body.appendChild(radio);

    const nativeInput = radio.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(nativeInput).not.toBeNull();
    expect(nativeInput.classList.contains('form-radio')).toBe(true);
    expect(nativeInput.name).toBe('options');
    expect(nativeInput.value).toBe('1');

    const label = radio.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toBe('Option 1');
    expect(label.htmlFor).toBe(nativeInput.id);
  });

  it('handles checked property and attribute', () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'choice');
    radio.setAttribute('value', 'a');
    radio.checked = true;
    document.body.appendChild(radio);

    const nativeInput = radio.querySelector('input') as HTMLInputElement;
    expect(nativeInput.checked).toBe(true);
  });

  it('handles error message and aria attributes', () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'terms');
    radio.setAttribute('label', 'Option');
    radio.setAttribute('error', 'Selection required');
    document.body.appendChild(radio);

    const nativeInput = radio.querySelector('input') as HTMLInputElement;
    expect(nativeInput.getAttribute('aria-invalid')).toBe('true');
    expect(nativeInput.classList.contains('form-radio--error')).toBe(true);

    const error = radio.querySelector('.form-error-text') as HTMLSpanElement;
    expect(error.textContent).toBe('Selection required');
    expect(error.getAttribute('role')).toBe('alert');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'contact');
    radio.setAttribute('value', 'email');
    radio.setAttribute('label', 'Email Contact');
    document.body.appendChild(radio);

    const results = await axe(radio);
    expect(results).toHaveNoViolations();
  });
});
