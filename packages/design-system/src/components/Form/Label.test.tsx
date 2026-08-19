import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, runAxeTest } from '../../test-utils';
import { Label } from './Label';

describe('Label', () => {
  it('renders label with htmlFor attribute', () => {
    render(<Label htmlFor="username">Username</Label>);

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'username');
  });

  it('renders required indicator with aria-hidden="true"', () => {
    render(
      <Label htmlFor="email" required>
        Email Address
      </Label>
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');

    const label = screen.getByText(/email address/i);
    expect(label).toHaveClass('form-label--required');
  });

  it('forwards ref to HTMLLabelElement', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(
      <Label ref={ref} htmlFor="input-1">
        Full Name
      </Label>
    );

    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('applies custom className', () => {
    render(
      <Label htmlFor="input-2" className="custom-label">
        Custom Label
      </Label>
    );

    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations when paired with input', async () => {
      const { container } = render(
        <div>
          <Label htmlFor="test-input">Full Name</Label>
          <input id="test-input" type="text" />
        </div>
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations with required label', async () => {
      const { container } = render(
        <div>
          <Label htmlFor="test-req-input" required>
            Email Address
          </Label>
          <input id="test-req-input" type="email" required />
        </div>
      );

      await runAxeTest(container);
    });
  });
});
