import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, runAxeTest } from '../../test-utils';
import { Fieldset } from './Fieldset';
import { Input } from './Input';

describe('Fieldset', () => {
  it('renders fieldset with legend', () => {
    render(
      <Fieldset legend="Shipping Address">
        <Input id="street" label="Street" />
        <Input id="city" label="City" />
      </Fieldset>
    );

    const fieldset = screen.getByRole('group', { name: 'Shipping Address' });
    expect(fieldset).toBeInTheDocument();
    expect(screen.getByText('Shipping Address')).toBeInTheDocument();
  });

  it('hides legend visually when legendHidden=true', () => {
    render(
      <Fieldset legend="Payment Information" legendHidden>
        <Input id="card" label="Card Number" />
      </Fieldset>
    );

    const legend = screen.getByText('Payment Information');
    expect(legend).toHaveClass('form-legend--hidden');
  });

  it('renders required field notice when required=true', () => {
    render(
      <Fieldset legend="Contact Information" required>
        <Input id="email" label="Email" required />
      </Fieldset>
    );

    expect(screen.getByText(/indicates a required field/i)).toBeInTheDocument();
  });

  it('supports disabled prop', () => {
    render(
      <Fieldset legend="Disabled Form Section" disabled>
        <Input id="disabled-input" label="Disabled Input" />
      </Fieldset>
    );

    const fieldset = screen.getByRole('group', { name: 'Disabled Form Section' });
    expect(fieldset).toBeDisabled();
  });

  it('forwards ref to HTMLFieldSetElement', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    render(
      <Fieldset ref={ref} legend="Referenced Fieldset">
        <p>Fieldset Content</p>
      </Fieldset>
    );

    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('applies custom className', () => {
    render(
      <Fieldset legend="Custom Section" className="custom-fieldset">
        <p>Custom Content</p>
      </Fieldset>
    );

    const fieldset = screen.getByRole('group');
    expect(fieldset).toHaveClass('custom-fieldset');
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations with form inputs', async () => {
      const { container } = render(
        <form>
          <Fieldset legend="Billing Details" required>
            <Input id="fname" label="First Name" required />
            <Input id="lname" label="Last Name" required />
          </Fieldset>
        </form>
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations with visually hidden legend', async () => {
      const { container } = render(
        <form>
          <Fieldset legend="Preferences" legendHidden>
            <Input id="pref-lang" label="Preferred Language" />
          </Fieldset>
        </form>
      );

      await runAxeTest(container);
    });
  });
});
