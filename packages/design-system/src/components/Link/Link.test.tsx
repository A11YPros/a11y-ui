import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, runAxeTest } from '../../test-utils';
import { Link } from './Link';

describe('Link', () => {
  it('renders standard internal link', () => {
    render(<Link href="/dashboard">Dashboard</Link>);

    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).not.toHaveAttribute('target');
  });

  it('handles external links automatically based on href', () => {
    render(<Link href="https://example.com">External Resource</Link>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAccessibleName('External Resource (opens in new tab)');
  });

  it('handles external links via explicit external prop', () => {
    render(<Link href="/docs" external>Documentation</Link>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAccessibleName('Documentation (opens in new tab)');
  });

  it('renders external icon with aria-hidden="true"', () => {
    render(<Link href="https://example.com">External Link</Link>);

    const icon = document.querySelector('.link__external-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders skip link with skip class', () => {
    render(<Link href="#main-content" skip>Skip to main content</Link>);

    const link = screen.getByRole('link', { name: 'Skip to main content' });
    expect(link).toHaveClass('link--skip');
  });

  it('renders button when skip link has no href', () => {
    render(<Link skip aria-label="Skip to main content">Skip to content</Link>);

    const button = screen.getByRole('button', { name: 'Skip to main content' });
    expect(button).toHaveClass('link--skip');
  });

  it('forwards ref to anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<Link ref={ref} href="/about">About Us</Link>);

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('applies custom className', () => {
    render(<Link href="/contact" className="custom-link-class">Contact</Link>);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-link-class');
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations for internal links', async () => {
      const { container } = render(
        <nav aria-label="Main Navigation">
          <Link href="/home">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations for external links', async () => {
      const { container } = render(
        <Link href="https://a11ypros.com">Visit A11Y Pros</Link>
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations for skip links', async () => {
      const { container } = render(
        <Link href="#main-content" skip>Skip to main content</Link>
      );

      await runAxeTest(container);
    });
  });
});
