import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, runAxeTest, act, fireEvent } from '../../test-utils';
import React from 'react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders free-standing help icon button by default', () => {
      render(<Tooltip defaultIcon="help" content="Helpful information" label="Help" delay={0} />);
      const trigger = screen.getByRole('button', { name: 'Help' });
      expect(trigger).toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders free-standing info icon button', () => {
      render(<Tooltip defaultIcon="info" content="System details" label="Info" delay={0} />);
      const trigger = screen.getByRole('button', { name: 'Info' });
      expect(trigger).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(
        <Tooltip
          customIcon={<span data-testid="custom-svg">★</span>}
          content="Favorite item"
          label="Favorite"
          delay={0}
        />
      );
      expect(screen.getByTestId('custom-svg')).toBeInTheDocument();
    });

    it('renders wrapped non-interactive text with a dashed underline button', () => {
      render(
        <Tooltip content="Sales tax info" delay={0}>
          Estimated Tax
        </Tooltip>
      );
      const trigger = screen.getByRole('button', { name: 'Estimated Tax' });
      expect(trigger).toHaveClass('a11y-tooltip-text-trigger--underlined');
    });

    it('wraps focusable child without nesting extra buttons', () => {
      render(
        <Tooltip content="Save your work" delay={0}>
          <button type="button">Save File</button>
        </Tooltip>
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toHaveTextContent('Save File');
    });
  });

  describe('interactions', () => {
    it('opens on focus and closes on blur', () => {
      render(<Tooltip defaultIcon="info" label="Info" content="Focus content" delay={0} />);
      const trigger = screen.getByRole('button', { name: 'Info' });

      act(() => {
        trigger.focus();
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Focus content');
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);

      act(() => {
        trigger.blur();
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('opens on mouseEnter and closes on mouseLeave', () => {
      render(<Tooltip defaultIcon="help" label="Help" content="Hover description" delay={50} />);
      const trigger = screen.getByRole('button', { name: 'Help' });

      act(() => {
        fireEvent.mouseEnter(trigger);
        vi.advanceTimersByTime(60);
      });

      expect(screen.getByRole('tooltip')).toHaveTextContent('Hover description');

      act(() => {
        fireEvent.mouseLeave(trigger);
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('dismisses immediately on Escape key (WCAG 1.4.13 Dismissible)', () => {
      render(<Tooltip defaultIcon="info" label="Info" content="Dismissible info" delay={0} />);
      const trigger = screen.getByRole('button', { name: 'Info' });

      act(() => {
        trigger.focus();
      });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('remains visible when hovered over tooltip content (WCAG 1.4.13 Hoverable)', () => {
      render(<Tooltip defaultIcon="info" label="Info" content="Hoverable copy" delay={0} />);
      const trigger = screen.getByRole('button', { name: 'Info' });

      act(() => {
        fireEvent.mouseEnter(trigger);
        vi.advanceTimersByTime(10);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();

      // Leave trigger, enter tooltip body before close timeout
      act(() => {
        fireEvent.mouseLeave(trigger);
        fireEvent.mouseEnter(tooltip);
        vi.advanceTimersByTime(200);
      });

      // Still visible because mouse is inside tooltip!
      expect(screen.getByRole('tooltip')).toBeInTheDocument();

      // Now leave tooltip body
      act(() => {
        fireEvent.mouseLeave(tooltip);
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('features and placements', () => {
    it('renders content heading when provided', () => {
      render(
        <Tooltip contentHeading="Heading Note" content="Body text description" open={true}>
          <span>Target</span>
        </Tooltip>
      );
      expect(screen.getByText('Heading Note')).toBeInTheDocument();
      expect(screen.getByText('Body text description')).toBeInTheDocument();
    });

    it('applies placement class', () => {
      const { rerender } = render(
        <Tooltip content="Tooltip text" placement="bottom" open={true}>
          <span>Bottom Target</span>
        </Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveClass('a11y-tooltip--bottom');

      rerender(
        <Tooltip content="Tooltip text" placement="left" open={true}>
          <span>Left Target</span>
        </Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveClass('a11y-tooltip--left');
    });

    it('applies small size class', () => {
      render(
        <Tooltip content="Small text" isSmall open={true}>
          <span>Small Target</span>
        </Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveClass('a11y-tooltip--small');
    });

    it('calls onOpenChange callback when state changes', () => {
      const handleOpenChange = vi.fn();
      render(
        <Tooltip
          defaultIcon="info"
          label="Info"
          content="Controlled test"
          delay={0}
          onOpenChange={handleOpenChange}
        />
      );
      const trigger = screen.getByRole('button', { name: 'Info' });

      act(() => {
        trigger.focus();
      });
      expect(handleOpenChange).toHaveBeenCalledWith(true);

      act(() => {
        trigger.blur();
      });
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('shifts horizontally when placement="top" overflows left viewport boundary', () => {
      const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = function () {
        if (this.getAttribute('role') === 'tooltip') {
          return {
            left: -50,
            right: 150,
            top: 20,
            bottom: 60,
            width: 200,
            height: 40,
            x: -50,
            y: 20,
            toJSON: () => {},
          };
        }
        return originalGetBoundingClientRect.call(this);
      };

      try {
        render(
          <Tooltip
            defaultIcon="help"
            label="Help"
            content="Clamped text"
            placement="top"
            open={true}
          />
        );
        const tooltip = screen.getByRole('tooltip');
        // padding (16) - (-50) = 66px
        expect(tooltip.style.transform).toContain('66px');
      } finally {
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
      }
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      vi.useRealTimers();
      const { container } = render(
        <Tooltip defaultIcon="help" label="Help" content="Accessible description" />
      );
      await runAxeTest(container);
    });

    it('has no axe violations when open', async () => {
      vi.useRealTimers();
      const { container } = render(
        <Tooltip
          defaultIcon="info"
          label="Information"
          contentHeading="More Information"
          content="Accessible description"
          open={true}
        />
      );
      await runAxeTest(container);
    });

    it('has no axe violations with wrapped button', async () => {
      vi.useRealTimers();
      const { container } = render(
        <Tooltip content="Saves changes to cloud" open={true}>
          <button type="button">Save</button>
        </Tooltip>
      );
      await runAxeTest(container);
    });
  });
});
