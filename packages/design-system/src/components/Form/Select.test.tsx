import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { Select, SelectOption } from './Select';

const mockOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom', disabled: true },
];

describe('Select', () => {
  it('renders select with label and options', () => {
    render(<Select id="country" label="Country" options={mockOptions} />);

    const select = screen.getByRole('combobox', { name: 'Country' });
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('id', 'country');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('United States');
    expect(options[1]).toHaveTextContent('Canada');
    expect(options[2]).toHaveTextContent('United Kingdom');
  });

  it('renders placeholder option when provided', () => {
    render(
      <Select
        id="country"
        label="Country"
        placeholder="Choose a country"
        options={mockOptions}
        defaultValue=""
      />
    );

    const placeholder = screen.getByRole('option', { name: 'Choose a country' });
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toBeDisabled();
  });

  it('handles value change events', () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="country"
        label="Country"
        options={mockOptions}
        onChange={handleChange}
        defaultValue="us"
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ca' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('ca');
  });

  it('disables option when disabled=true on option', () => {
    render(<Select id="country" label="Country" options={mockOptions} />);

    const disabledOption = screen.getByRole('option', { name: 'United Kingdom' });
    expect(disabledOption).toBeDisabled();
  });

  it('disables select when disabled prop is true', () => {
    render(<Select id="country" label="Country" options={mockOptions} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass('form-select--disabled');
  });

  it('renders required indicator with aria-hidden="true"', () => {
    render(<Select id="country" label="Country" options={mockOptions} required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('displays helper text linked via aria-describedby', () => {
    render(
      <Select
        id="country"
        label="Country"
        options={mockOptions}
        helperText="Select your primary residence."
      />
    );

    const select = screen.getByRole('combobox');
    expect(screen.getByText('Select your primary residence.')).toBeInTheDocument();
    expect(select).toHaveAttribute('aria-describedby', 'country-helper');
  });

  it('displays error message and sets aria-invalid="true"', () => {
    render(
      <Select
        id="country"
        label="Country"
        options={mockOptions}
        error="Country selection is required."
      />
    );

    const select = screen.getByRole('combobox');
    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent('Country selection is required.');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', 'country-error');
  });

  it('forwards ref to select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref} id="country" label="Country" options={mockOptions} />);

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for standard select', async () => {
      const { container } = render(
        <Select
          id="country-select"
          label="Country"
          options={mockOptions}
          defaultValue="us"
        />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations with placeholder and helper text', async () => {
      const { container } = render(
        <Select
          id="role-select"
          label="Job Role"
          placeholder="Select your role"
          options={[
            { value: 'dev', label: 'Developer' },
            { value: 'des', label: 'Designer' },
          ]}
          helperText="Used for workspace personalization."
          defaultValue=""
        />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations in error state', async () => {
      const { container } = render(
        <Select
          id="dept-select"
          label="Department"
          options={[
            { value: 'eng', label: 'Engineering' },
            { value: 'mkt', label: 'Marketing' },
          ]}
          error="Please choose a department."
        />
      );

      await runAxeTest(container);
    });
  });
});
