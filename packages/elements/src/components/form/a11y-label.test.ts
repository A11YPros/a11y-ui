import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yLabel, registerLabel } from './a11y-label';

expect.extend(toHaveNoViolations);

describe('A11yLabel (<a11y-label>)', () => {
  beforeEach(() => {
    registerLabel();
    document.body.innerHTML = '';
  });

  it('renders native label with for attribute and classes', () => {
    const label = document.createElement('a11y-label') as A11yLabel;
    label.setAttribute('for', 'username');
    label.textContent = 'Username';
    document.body.appendChild(label);

    const nativeLabel = label.querySelector('label') as HTMLLabelElement;
    expect(nativeLabel).not.toBeNull();
    expect(nativeLabel.htmlFor).toBe('username');
    expect(nativeLabel.classList.contains('form-label')).toBe(true);
    expect(nativeLabel.textContent).toContain('Username');
  });

  it('renders required indicator when required attribute is present', () => {
    const label = document.createElement('a11y-label') as A11yLabel;
    label.setAttribute('for', 'email');
    label.setAttribute('required', '');
    label.textContent = 'Email';
    document.body.appendChild(label);

    const req = label.querySelector('.form-label__required') as HTMLSpanElement;
    expect(req).not.toBeNull();
    expect(req.textContent).toBe(' *');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <a11y-label for="first-name">First Name</a11y-label>
      <input id="first-name" type="text" />
    `;
    document.body.appendChild(wrapper);

    const results = await axe(wrapper);
    expect(results).toHaveNoViolations();
  });
});
