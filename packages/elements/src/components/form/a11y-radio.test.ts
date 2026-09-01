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

  it('renders radiogroup with label and options array matching React Radio', () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'contact-method');
    radio.setAttribute('label', 'Preferred Contact Method');
    radio.options = [
      { value: 'email', label: 'Email Notification' },
      { value: 'sms', label: 'SMS Notification' },
      { value: 'push', label: 'Push Notification', disabled: true },
    ];
    radio.value = 'sms';
    document.body.appendChild(radio);

    const group = radio.querySelector('[role="radiogroup"]');
    expect(group).not.toBeNull();

    const label = radio.querySelector('.form-label');
    expect(label?.textContent).toBe('Preferred Contact Method');

    const inputs = radio.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    expect(inputs.length).toBe(3);

    expect(inputs[0].value).toBe('email');
    expect(inputs[0].checked).toBe(false);

    expect(inputs[1].value).toBe('sms');
    expect(inputs[1].checked).toBe(true);

    expect(inputs[2].value).toBe('push');
    expect(inputs[2].disabled).toBe(true);
  });

  it('selects option on change and dispatches custom change event', () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'contact-method');
    radio.setAttribute('label', 'Contact Method');
    radio.options = [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
    ];
    document.body.appendChild(radio);

    let selectedValue = '';
    radio.addEventListener('change', (e: any) => {
      selectedValue = e.detail?.value || radio.value;
    });

    const emailInput = radio.querySelector('input[value="email"]') as HTMLInputElement;
    emailInput.checked = true;
    emailInput.dispatchEvent(new Event('change', { bubbles: true }));

    expect(radio.value).toBe('email');
    expect(selectedValue).toBe('email');
  });

  it('passes axe accessibility audit with zero violations in group mode', async () => {
    const radio = document.createElement('a11y-radio') as A11yRadio;
    radio.setAttribute('name', 'plan');
    radio.setAttribute('label', 'Subscription Plan');
    radio.options = [
      { value: 'free', label: 'Free Plan' },
      { value: 'pro', label: 'Pro Plan' },
    ];
    radio.value = 'pro';
    document.body.appendChild(radio);

    const results = await axe(radio);
    expect(results).toHaveNoViolations();
  });
});
