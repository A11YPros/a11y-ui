import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders textarea with label linked via htmlFor', () => {
    render(<Textarea id="feedback" label="Feedback" />);

    const textarea = screen.getByRole('textbox', { name: 'Feedback' });
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'feedback');

    const label = screen.getByText('Feedback');
    expect(label).toHaveAttribute('for', 'feedback');
  });

  it('handles user input and change events', () => {
    const handleChange = vi.fn();
    render(<Textarea id="comments" label="Comments" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Great accessible components!' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays character counter when showCount and maxLength are set', () => {
    render(
      <Textarea
        id="bio"
        label="Bio"
        value="Hello world"
        maxLength={100}
        showCount
        onChange={() => {}}
      />
    );

    const counter = screen.getByText('11 / 100');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute('aria-live', 'polite');
  });

  it('renders required indicator with aria-hidden="true"', () => {
    render(<Textarea id="msg" label="Message" required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('displays helper text linked via aria-describedby', () => {
    render(
      <Textarea
        id="notes"
        label="Notes"
        helperText="Enter any special instructions."
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(screen.getByText('Enter any special instructions.')).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-describedby', 'notes-helper');
  });

  it('displays error text, role="alert", and aria-invalid="true"', () => {
    render(
      <Textarea
        id="desc"
        label="Description"
        error="Description is required."
      />
    );

    const textarea = screen.getByRole('textbox');
    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent('Description is required.');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'desc-error');
  });

  it('supports disabled state', () => {
    render(<Textarea id="disabled-ta" label="Disabled Textarea" disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('form-textarea--disabled');
  });

  it('forwards ref to HTMLTextAreaElement', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} id="ref-ta" label="Referenced Textarea" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for standard textarea', async () => {
      const { container } = render(
        <Textarea id="feedback-ta" label="Product Feedback" />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations with character count and helper text', async () => {
      const { container } = render(
        <Textarea
          id="summary-ta"
          label="Executive Summary"
          helperText="Summarize key points in 200 characters or fewer."
          maxLength={200}
          showCount
          value="Initial summary."
          onChange={() => {}}
        />
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations in error state', async () => {
      const { container } = render(
        <Textarea
          id="err-ta"
          label="Bug Description"
          error="Please provide reproduction steps."
        />
      );

      await runAxeTest(container);
    });
  });
});
