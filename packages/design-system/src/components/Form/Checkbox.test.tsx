import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label and connects htmlFor with input id', () => {
    render(<Checkbox id="terms" label="Accept Terms & Conditions" />);

    const checkbox = screen.getByRole('checkbox', { name: /accept terms & conditions/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', 'terms');

    const label = screen.getByText(/accept terms & conditions/i);
    expect(label).toHaveAttribute('for', 'terms');
  });

  it('handles user click and change events', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Subscribe to newsletter" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox', { name: /subscribe to newsletter/i });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles indeterminate state', () => {
    render(<Checkbox id="parent" label="Select All" indeterminate />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('displays required indicator with aria-hidden="true"', () => {
    render(<Checkbox label="Mandatory consent" required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('displays helper text and links via aria-describedby', () => {
    render(
      <Checkbox
        id="notifications"
        label="Email alerts"
        helperText="We will send at most one email per week."
      />
    );

    const checkbox = screen.getByRole('checkbox');
    const helper = screen.getByText('We will send at most one email per week.');

    expect(helper).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-describedby', 'notifications-helper');
  });

  it('displays error message and sets aria-invalid="true"', () => {
    render(
      <Checkbox
        id="agree"
        label="Terms of Service"
        error="You must agree to continue"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    const errorText = screen.getByRole('alert');

    expect(errorText).toHaveTextContent('You must agree to continue');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', 'agree-error');
  });

  it('supports disabled state', () => {
    render(<Checkbox label="Disabled option" disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Referenced checkbox" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for unchecked checkbox', async () => {
      const { container } = render(
        <Checkbox id="terms-1" label="I agree to the privacy policy" />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations for checked and indeterminate states', async () => {
      const { container } = render(
        <div>
          <Checkbox id="chk-1" label="Checked option" defaultChecked />
          <Checkbox id="chk-2" label="Indeterminate option" indeterminate />
        </div>
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations with helper text and error state', async () => {
      const { container } = render(
        <div>
          <Checkbox
            id="chk-3"
            label="Email updates"
            helperText="Monthly digest only."
          />
          <Checkbox
            id="chk-4"
            label="Required agreement"
            error="This field is required."
          />
        </div>
      );

      await runAxeTest(container);
    });
  });
});
