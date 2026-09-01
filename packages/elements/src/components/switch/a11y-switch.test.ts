import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11ySwitch, registerSwitch } from './a11y-switch';

expect.extend(toHaveNoViolations);

describe('A11ySwitch (<a11y-switch>)', () => {
  beforeEach(() => {
    registerSwitch();
    document.body.innerHTML = '';
  });

  it('has no accessibility violations in axe audit', async () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.setAttribute('label', 'Enable sound effects');
    el.setAttribute('helper-text', 'Plays audio on button clicks');
    document.body.appendChild(el);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('renders switch with role="switch" and aria-checked="false" by default', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.setAttribute('label', 'Airplane Mode');
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    expect(button).not.toBeNull();
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(el.checked).toBe(false);

    const label = el.querySelector('.a11y-switch-label');
    expect(label?.textContent).toBe('Airplane Mode');
  });

  it('reflects checked attribute and property correctly', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.checked = true;
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.classList.contains('a11y-switch--checked')).toBe(true);

    el.checked = false;
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(button.classList.contains('a11y-switch--checked')).toBe(false);
  });

  it('toggles on click and emits change event', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    let changeEventDetail: any = null;

    el.addEventListener('change', (e: Event) => {
      changeEventDetail = (e as CustomEvent).detail;
    });

    button.click();

    expect(el.checked).toBe(true);
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(changeEventDetail).toEqual({ checked: true });

    button.click();
    expect(el.checked).toBe(false);
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(changeEventDetail).toEqual({ checked: false });
  });

  it('toggles on Space and Enter keyboard keys and maintains focus', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    button.focus();
    expect(document.activeElement).toBe(button);

    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(el.checked).toBe(true);
    expect(document.activeElement).toBe(button);

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(el.checked).toBe(false);
    expect(document.activeElement).toBe(button);
  });

  it('does not toggle when disabled', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.disabled = true;
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');

    button.click();
    expect(el.checked).toBe(false);

    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(el.checked).toBe(false);
  });

  it('associates error text with aria-describedby and aria-invalid', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.setAttribute('error', 'Must accept terms');
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    const error = el.querySelector('.a11y-switch-error') as HTMLSpanElement;

    expect(button.getAttribute('aria-invalid')).toBe('true');
    expect(button.getAttribute('aria-describedby')).toContain(error.id);
    expect(error.textContent).toBe('Must accept terms');
    expect(error.getAttribute('role')).toBe('alert');
  });

  it('associates helper-text with aria-describedby', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.setAttribute('helper-text', 'Receive promotional emails');
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    const helper = el.querySelector('.a11y-switch-helper') as HTMLSpanElement;

    expect(button.getAttribute('aria-describedby')).toContain(helper.id);
    expect(helper.textContent).toBe('Receive promotional emails');
  });

  it('supports size variants sm, md, lg', () => {
    const el = document.createElement('a11y-switch') as A11ySwitch;
    el.setAttribute('size', 'lg');
    document.body.appendChild(el);

    const button = el.querySelector('button[role="switch"]') as HTMLButtonElement;
    expect(button.classList.contains('a11y-switch--lg')).toBe(true);
  });
});
