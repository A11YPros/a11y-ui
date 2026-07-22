import { describe, it, expect, vi } from 'vitest';
import { render, screen, runAxeTest } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders title and children', () => {
    render(
      <Banner title="Important update" variant="info">
        New keyboard shortcuts are now available.
      </Banner>
    );

    expect(screen.getByText('Important update')).toBeInTheDocument();
    expect(screen.getByText('New keyboard shortcuts are now available.')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Banner title="Warning" variant="warning" />);
    const banner = screen.getByText('Warning').closest('.banner');
    expect(banner).toHaveClass('banner--warning');
  });

  it('uses variant-based default aria attributes', () => {
    render(<Banner title="Error" variant="error" />);
    const banner = screen.getByText('Error').closest('.banner');

    expect(banner).toHaveAttribute('aria-live', 'assertive');
    expect(banner).toHaveAttribute('aria-atomic', 'true');
  });

  it('does not render when hidden', () => {
    render(<Banner title="Hidden banner" isExposed={false} />);
    expect(screen.queryByText('Hidden banner')).not.toBeInTheDocument();
  });

  it('calls onClose and hides on close click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Banner title="Dismiss me" isDismissible onClose={onClose}>
        Message
      </Banner>
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Banner title="Accessible banner" variant="success">
        This confirmation message should be announced politely.
      </Banner>
    );

    await runAxeTest(container);
  });
});