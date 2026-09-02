import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11ySelect, registerSelect } from './a11y-select';

expect.extend(toHaveNoViolations);

describe('A11ySelect (<a11y-select>)', () => {
  beforeEach(() => {
    registerSelect();
    document.body.innerHTML = '';
  });

  it('renders select with options and associated label', () => {
    const select = document.createElement('a11y-select') as A11ySelect;
    select.setAttribute('label', 'Department');
    select.innerHTML = `
      <option value="eng">Engineering</option>
      <option value="design">Design</option>
    `;
    document.body.appendChild(select);

    const nativeSelect = select.querySelector('select') as HTMLSelectElement;
    expect(nativeSelect).not.toBeNull();
    expect(nativeSelect.classList.contains('form-select')).toBe(true);
    expect(nativeSelect.options.length).toBe(2);

    const label = select.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toBe('Department');
    expect(label.htmlFor).toBe(nativeSelect.id);
  });

  it('handles error states and accessibility attributes', () => {
    const select = document.createElement('a11y-select') as A11ySelect;
    select.setAttribute('label', 'Country');
    select.setAttribute('error', 'Please select a country');
    select.innerHTML = '<option value="us">United States</option>';
    document.body.appendChild(select);

    const nativeSelect = select.querySelector('select') as HTMLSelectElement;
    expect(nativeSelect.getAttribute('aria-invalid')).toBe('true');
    expect(nativeSelect.classList.contains('form-select--error')).toBe(true);

    const error = select.querySelector('.form-error-text') as HTMLSpanElement;
    expect(error.textContent).toBe('Please select a country');
    expect(error.getAttribute('role')).toBe('alert');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const select = document.createElement('a11y-select') as A11ySelect;
    select.setAttribute('label', 'Language');
    select.innerHTML = `
      <option value="en">English</option>
      <option value="es">Spanish</option>
    `;
    document.body.appendChild(select);

    const results = await axe(select);
    expect(results).toHaveNoViolations();
  });

  it('moves the host id onto the native select so label and describedby resolve', () => {
    document.body.innerHTML = `
      <a11y-select id="country" label="Country">
        <option value="us">United States</option>
      </a11y-select>
    `;
    const el = document.querySelector('a11y-select') as A11ySelect;
    const select = el.querySelector('select') as HTMLSelectElement;
    const label = el.querySelector('label') as HTMLLabelElement;

    expect(el.hasAttribute('id')).toBe(false);
    expect(el.getAttribute('data-select-id')).toBe('country');
    expect(document.getElementById('country')).toBe(select);
    expect(label.control).toBe(select);

    el.setAttribute('error', 'Pick a country');
    const describedBy = select.getAttribute('aria-describedby') as string;
    expect(document.getElementById(describedBy)?.textContent).toBe('Pick a country');
  });
});
