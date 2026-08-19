import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { Radio, RadioOption } from './Radio';

const mockOptions: RadioOption[] = [
  { value: 'email', label: 'Email Notification' },
  { value: 'sms', label: 'SMS Notification' },
  { value: 'push', label: 'Push Notification', disabled: true },
];

describe('Radio', () => {
  it('renders radiogroup with label and options', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
      />
    );

    const group = screen.getByRole('radiogroup', { name: 'Preferred Contact Method' });
    expect(group).toBeInTheDocument();

    expect(screen.getByRole('radio', { name: 'Email Notification' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'SMS Notification' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Push Notification' })).toBeInTheDocument();
  });

  it('selects radio option on click and calls onChange', () => {
    const handleChange = vi.fn();
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
        onChange={handleChange}
      />
    );

    const emailRadio = screen.getByRole('radio', { name: 'Email Notification' });
    fireEvent.click(emailRadio);

    expect(handleChange).toHaveBeenCalled();
  });

  it('respects controlled value prop', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
        value="sms"
        onChange={() => {}}
      />
    );

    expect(screen.getByRole('radio', { name: 'SMS Notification' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Email Notification' })).not.toBeChecked();
  });

  it('disables specific option when option.disabled is true', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
      />
    );

    expect(screen.getByRole('radio', { name: 'Push Notification' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Email Notification' })).not.toBeDisabled();
  });

  it('disables all options when disabled prop is true on group', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
        disabled
      />
    );

    expect(screen.getByRole('radio', { name: 'Email Notification' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'SMS Notification' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Push Notification' })).toBeDisabled();
  });

  it('renders required indicator with aria-hidden="true"', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
        required
      />
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('displays helper text connected via aria-describedby', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
        helperText="Choose how we should reach you."
      />
    );

    const group = screen.getByRole('radiogroup');
    expect(screen.getByText('Choose how we should reach you.')).toBeInTheDocument();
    expect(group).toHaveAttribute('aria-describedby');
  });

  it('displays error text and sets aria-invalid="true"', () => {
    render(
      <Radio
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
        error="Selection is required."
      />
    );

    const group = screen.getByRole('radiogroup');
    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent('Selection is required.');
    expect(group).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to the first radio input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <Radio
        ref={ref}
        name="contact-method"
        label="Preferred Contact Method"
        options={mockOptions}
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.value).toBe('email');
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for radio group with label', async () => {
      const { container } = render(
        <Radio
          name="plan"
          label="Subscription Plan"
          options={[
            { value: 'free', label: 'Free Plan' },
            { value: 'pro', label: 'Pro Plan' },
            { value: 'enterprise', label: 'Enterprise Plan' },
          ]}
          value="pro"
          onChange={() => {}}
        />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations with helper and error states', async () => {
      const { container } = render(
        <div>
          <Radio
            name="delivery"
            label="Delivery Speed"
            options={[
              { value: 'standard', label: 'Standard (3-5 days)' },
              { value: 'express', label: 'Express (1-2 days)' },
            ]}
            helperText="Express shipping includes tracking."
          />
          <Radio
            name="payment"
            label="Payment Type"
            options={[
              { value: 'card', label: 'Credit Card' },
              { value: 'paypal', label: 'PayPal' },
            ]}
            error="Please select a payment method."
          />
        </div>
      );

      await runAxeTest(container);
    });
  });
});
