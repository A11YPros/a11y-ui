import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yFieldset, registerFieldset } from './a11y-fieldset';

expect.extend(toHaveNoViolations);

describe('A11yFieldset (<a11y-fieldset>)', () => {
  beforeEach(() => {
    registerFieldset();
    document.body.innerHTML = '';
  });

  it('renders fieldset and legend with correct class names', () => {
    const fieldset = document.createElement('a11y-fieldset') as A11yFieldset;
    fieldset.setAttribute('legend', 'Personal Details');
    fieldset.innerHTML = '<p>Fields go here</p>';
    document.body.appendChild(fieldset);

    const nativeFieldset = fieldset.querySelector('fieldset') as HTMLFieldSetElement;
    expect(nativeFieldset).not.toBeNull();
    expect(nativeFieldset.classList.contains('form-fieldset')).toBe(true);

    const legend = fieldset.querySelector('legend') as HTMLLegendElement;
    expect(legend).not.toBeNull();
    expect(legend.textContent).toBe('Personal Details');
    expect(legend.classList.contains('form-legend')).toBe(true);
  });

  it('renders required indicator notice when required is present', () => {
    const fieldset = document.createElement('a11y-fieldset') as A11yFieldset;
    fieldset.setAttribute('legend', 'Required Information');
    fieldset.setAttribute('required', '');
    document.body.appendChild(fieldset);

    const req = fieldset.querySelector('.fieldset__required') as HTMLParagraphElement;
    expect(req).not.toBeNull();
    expect(req.textContent).toContain('indicates a required field');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const fieldset = document.createElement('a11y-fieldset') as A11yFieldset;
    fieldset.setAttribute('legend', 'Contact Form');
    fieldset.innerHTML = '<label for="inp">Name</label><input id="inp" type="text" />';
    document.body.appendChild(fieldset);

    const results = await axe(fieldset);
    expect(results).toHaveNoViolations();
  });
});
