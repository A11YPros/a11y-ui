import { describe, it, expect, vi } from 'vitest';
import { render, screen, runAxeTest } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders with role switch and unchecked by default', () => {
      render(<Switch label="Airplane Mode" />);
      const switchEl = screen.getByRole('switch', { name: 'Airplane Mode' });
      expect(switchEl).toBeInTheDocument();
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      expect(switchEl).not.toHaveClass('a11y-switch--checked');
    });

    it('renders checked when defaultChecked is true', () => {
      render(<Switch label="Dark Mode" defaultChecked />);
      const switchEl = screen.getByRole('switch', { name: 'Dark Mode' });
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      expect(switchEl).toHaveClass('a11y-switch--checked');
    });

    it('renders checked in controlled mode', () => {
      const { rerender } = render(<Switch label="Bluetooth" checked={true} />);
      const switchEl = screen.getByRole('switch', { name: 'Bluetooth' });
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      expect(switchEl).toHaveClass('a11y-switch--checked');

      rerender(<Switch label="Bluetooth" checked={false} />);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      expect(switchEl).not.toHaveClass('a11y-switch--checked');
    });

    it('renders all sizes', () => {
      const { rerender } = render(<Switch label="Size test" size="sm" />);
      expect(screen.getByRole('switch')).toHaveClass('a11y-switch--sm');

      rerender(<Switch label="Size test" size="md" />);
      expect(screen.getByRole('switch')).toHaveClass('a11y-switch--md');

      rerender(<Switch label="Size test" size="lg" />);
      expect(screen.getByRole('switch')).toHaveClass('a11y-switch--lg');
    });

    it('renders with labelPosition start and end', () => {
      const { container, rerender } = render(
        <Switch label="Position test" labelPosition="start" />
      );
      expect(container.querySelector('.a11y-switch-container--label-start')).toBeInTheDocument();

      rerender(<Switch label="Position test" labelPosition="end" />);
      expect(container.querySelector('.a11y-switch-container--label-end')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Switch label="Custom" className="my-custom-switch" />);
      expect(screen.getByRole('switch')).toHaveClass('my-custom-switch');
    });

    it('renders required indicator when aria-required is true', () => {
      render(<Switch label="Terms" aria-required={true} />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('toggles uncontrolled switch on click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Notifications" onChange={handleChange} />);
      const switchEl = screen.getByRole('switch', { name: 'Notifications' });

      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));

      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });

    it('toggles when clicking the label', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Click Label" onChange={handleChange} />);

      await user.click(screen.getByText('Click Label'));
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('calls controlled onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Sync" checked={false} onChange={handleChange} />);
      const switchEl = screen.getByRole('switch', { name: 'Sync' });

      await user.click(switchEl);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('calls onClick prop if provided', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Switch label="Click test" onClick={handleClick} />);

      await user.click(screen.getByRole('switch'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('toggles with Space key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Space test" onChange={handleChange} />);
      const switchEl = screen.getByRole('switch');

      switchEl.focus();
      await user.keyboard(' ');
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('toggles with Enter key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Enter test" onChange={handleChange} />);
      const switchEl = screen.getByRole('switch');

      switchEl.focus();
      await user.keyboard('{Enter}');
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('calls onKeyDown prop if provided', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      render(<Switch label="Key test" onKeyDown={handleKeyDown} />);
      const switchEl = screen.getByRole('switch');

      switchEl.focus();
      await user.keyboard('a');
      expect(handleKeyDown).toHaveBeenCalled();
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Disabled switch" disabled onChange={handleChange} />);
      const switchEl = screen.getByRole('switch');

      expect(switchEl).toBeDisabled();
      await user.click(switchEl);
      expect(handleChange).not.toHaveBeenCalled();

      switchEl.focus();
      await user.keyboard(' ');
      expect(handleChange).not.toHaveBeenCalled();
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('form integration', () => {
    it('renders hidden input when name is provided', () => {
      const { container } = render(
        <Switch label="Subscribe" name="subscribe" value="yes" defaultChecked />
      );
      const hiddenInput = container.querySelector(
        'input[type="checkbox"][name="subscribe"]'
      ) as HTMLInputElement;

      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput.value).toBe('yes');
      expect(hiddenInput.checked).toBe(true);
    });

    it('updates hidden input checked state when toggled', async () => {
      const user = userEvent.setup();
      const { container } = render(<Switch label="Subscribe" name="subscribe" />);
      const hiddenInput = container.querySelector(
        'input[type="checkbox"][name="subscribe"]'
      ) as HTMLInputElement;

      expect(hiddenInput.checked).toBe(false);
      await user.click(screen.getByRole('switch'));
      expect(hiddenInput.checked).toBe(true);
    });
  });

  describe('accessibility and aria attributes', () => {
    it('uses aria-label when provided without visible label', () => {
      render(<Switch aria-label="Standalone switch" />);
      expect(screen.getByRole('switch', { name: 'Standalone switch' })).toBeInTheDocument();
    });

    it('uses aria-labelledby when provided', () => {
      render(
        <div>
          <span id="external-label">External Label</span>
          <Switch aria-labelledby="external-label" />
        </div>
      );
      expect(screen.getByRole('switch', { name: 'External Label' })).toBeInTheDocument();
    });

    it('links helperText via aria-describedby', () => {
      render(<Switch label="Telemetry" helperText="Send anonymous diagnostic data" />);
      const switchEl = screen.getByRole('switch');
      const helperEl = screen.getByText('Send anonymous diagnostic data');

      expect(helperEl).toBeInTheDocument();
      expect(switchEl).toHaveAttribute('aria-describedby', helperEl.id);
    });

    it('renders error message with alert role and aria-invalid', () => {
      render(<Switch label="Consent" error="Consent is required" />);
      const switchEl = screen.getByRole('switch');
      const errorEl = screen.getByRole('alert');

      expect(errorEl).toHaveTextContent('Consent is required');
      expect(switchEl).toHaveAttribute('aria-invalid', 'true');
      expect(switchEl).toHaveAttribute('aria-describedby', errorEl.id);
      expect(switchEl).toHaveClass('a11y-switch--error');
    });

    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switch label="Ref test" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('has no axe violations in default state', async () => {
      const { container } = render(<Switch label="Accessible Switch" />);
      await runAxeTest(container);
    });

    it('has no axe violations in checked state', async () => {
      const { container } = render(<Switch label="Accessible Switch Checked" defaultChecked />);
      await runAxeTest(container);
    });

    it('has no axe violations in disabled state', async () => {
      const { container } = render(<Switch label="Accessible Switch Disabled" disabled />);
      await runAxeTest(container);
    });

    it('has no axe violations with error and helper text', async () => {
      const { container } = render(
        <Switch
          label="Accessible Switch Error"
          error="Please confirm your selection"
          helperText="Helper description"
        />
      );
      await runAxeTest(container);
    });
  });
});
