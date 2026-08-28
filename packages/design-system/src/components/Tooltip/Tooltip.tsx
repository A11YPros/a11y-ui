'use client';

import React from 'react';
import './Tooltip.css';

export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export interface TooltipProps {
  /**
   * Accessible label for the trigger (required for icon-only triggers)
   */
  label?: string;

  /**
   * Tooltip content text or elements
   */
  content: React.ReactNode;

  /**
   * Optional bold heading above the tooltip text
   */
  contentHeading?: string;

  /**
   * Placement relative to the trigger
   * @default 'right'
   */
  placement?: TooltipPlacement;

  /**
   * Built-in icon anchor when no children are provided
   */
  defaultIcon?: 'help' | 'info';

  /**
   * Custom SVG/icon element
   */
  customIcon?: React.ReactNode;

  /**
   * Compact size with reduced padding
   * @default false
   */
  isSmall?: boolean;

  /**
   * Whether to show a dashed underline when wrapping non-interactive content
   * @default true
   */
  showDashedUnderline?: boolean;

  /**
   * Explicitly set component not to wrap with a button
   */
  shouldNotWrap?: boolean;

  /**
   * Automatically flip placement if overflowing viewport boundary
   * @default false
   */
  autoFlip?: boolean;

  /**
   * Optional manual open state for controlled usage
   */
  open?: boolean;

  /**
   * Callback fired on open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Delay in ms before opening on hover
   * @default 150
   */
  delay?: number;

  /**
   * Children element to wrap as trigger
   */
  children?: React.ReactNode;

  /**
   * Custom CSS class names
   */
  className?: string;
  triggerClassName?: string;
  id?: string;
}

/**
 * Check whether a React child is an interactive or focusable element
 */
function isFocusableElement(child: React.ReactNode, shouldNotWrap?: boolean): boolean {
  if (shouldNotWrap) return true;
  if (!React.isValidElement(child)) return false;

  const type = child.type;
  if (typeof type === 'string') {
    if (['button', 'a', 'input', 'select', 'textarea'].includes(type)) {
      return true;
    }
  }

  const props = child.props as Record<string, unknown> | undefined;
  if (props && (props.tabIndex === 0 || props.tabIndex === '0')) {
    return true;
  }

  return false;
}

/**
 * Accessible Tooltip component
 *
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: aria-describedby connects trigger to tooltip
 * - 1.4.13 Content on Hover or Focus:
 *   - Dismissible: Escape key dismisses without moving focus/pointer
 *   - Hoverable: Moving pointer over tooltip content keeps it visible
 *   - Persistent: Remains visible until unhovered, blurred, or dismissed
 * - 2.1.1 Keyboard: Accessible via Tab focus on interactive or wrapped triggers
 * - 4.1.2 Name, Role, Value: role="tooltip" with unique id
 */
export const Tooltip: React.FC<TooltipProps> = ({
  id,
  label,
  content,
  contentHeading,
  placement = 'right',
  defaultIcon,
  customIcon,
  isSmall = false,
  showDashedUnderline = true,
  shouldNotWrap = false,
  autoFlip = false,
  open: controlledOpen,
  onOpenChange,
  delay = 150,
  children,
  className = '',
  triggerClassName = '',
}) => {
  const generatedId = React.useId();
  const tooltipId = id || `tooltip-${generatedId}`;
  const tooltipRef = React.useRef<HTMLSpanElement>(null);

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isVisible = isControlled ? controlledOpen : uncontrolledOpen;

  const [effectivePlacement, setEffectivePlacement] = React.useState<TooltipPlacement>(placement);
  const [shiftX, setShiftX] = React.useState(0);

  React.useEffect(() => {
    setEffectivePlacement(placement);
  }, [placement]);

  // Prevent cutoff at viewport edges (auto-clamp and auto-flip)
  React.useLayoutEffect(() => {
    if (!isVisible || typeof window === 'undefined') {
      setEffectivePlacement(placement);
      setShiftX(0);
      return;
    }

    const checkBounds = () => {
      const el = tooltipRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const padding = 16;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let nextPlacement = placement;

      if (autoFlip) {
        if (placement === 'right' && rect.right > viewportWidth) {
          nextPlacement = 'left';
        } else if (placement === 'left' && rect.left < 0) {
          nextPlacement = 'right';
        } else if (placement === 'top' && rect.top < 0) {
          nextPlacement = 'bottom';
        } else if (placement === 'bottom' && rect.bottom > viewportHeight) {
          nextPlacement = 'top';
        }
      }

      setEffectivePlacement(nextPlacement);

      // Auto-clamp horizontal shift for top and bottom placements
      if (
        nextPlacement === 'top' ||
        nextPlacement === 'bottom' ||
        nextPlacement === 'top-start' ||
        nextPlacement === 'top-end' ||
        nextPlacement === 'bottom-start' ||
        nextPlacement === 'bottom-end'
      ) {
        if (rect.left < padding) {
          setShiftX(padding - rect.left);
        } else if (rect.right > viewportWidth - padding) {
          setShiftX(viewportWidth - padding - rect.right);
        } else {
          setShiftX(0);
        }
      } else {
        setShiftX(0);
      }
    };

    checkBounds();
    window.addEventListener('resize', checkBounds);
    return () => {
      window.removeEventListener('resize', checkBounds);
    };
  }, [isVisible, placement, autoFlip]);

  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const clearTimers = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // Handle Escape key to dismiss (WCAG 1.4.13 Dismissible)
  React.useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        clearTimers();
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isVisible, clearTimers, setOpen]);

  const handleTriggerMouseEnter = () => {
    clearTimers();
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, delay);
  };

  const handleTriggerMouseLeave = () => {
    clearTimers();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  const handleTooltipMouseEnter = () => {
    // Hoverable (WCAG 1.4.13): Keep open when hovering tooltip content
    clearTimers();
  };

  const handleTooltipMouseLeave = () => {
    clearTimers();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  const handleFocus = () => {
    clearTimers();
    setOpen(true);
  };

  const handleBlur = () => {
    clearTimers();
    setOpen(false);
  };

  // Determine trigger type
  const hasChildren = children !== undefined && children !== null;
  const isChildInteractive = hasChildren && isFocusableElement(children, shouldNotWrap);

  let triggerElement: React.ReactNode = null;

  if (hasChildren) {
    if (isChildInteractive && React.isValidElement(children)) {
      // Interactive element: attach attributes and event handlers directly
      const childProps = children.props as Record<string, unknown>;
      const existingDescribedBy = childProps['aria-describedby'] as string | undefined;
      const combinedDescribedBy = [existingDescribedBy, isVisible ? tooltipId : undefined]
        .filter(Boolean)
        .join(' ');

      triggerElement = React.cloneElement(children as React.ReactElement<any>, {
        'aria-describedby': combinedDescribedBy || undefined,
        onMouseEnter: (e: React.MouseEvent) => {
          (childProps.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
          handleTriggerMouseEnter();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          (childProps.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e);
          handleTriggerMouseLeave();
        },
        onFocus: (e: React.FocusEvent) => {
          (childProps.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
          handleFocus();
        },
        onBlur: (e: React.FocusEvent) => {
          (childProps.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
          handleBlur();
        },
      });
    } else {
      // Non-interactive children: wrap in an accessible button with dashed underline
      const triggerClasses = [
        'a11y-tooltip-text-trigger',
        showDashedUnderline && 'a11y-tooltip-text-trigger--underlined',
        triggerClassName,
      ]
        .filter(Boolean)
        .join(' ');

      triggerElement = (
        <button
          type="button"
          className={triggerClasses}
          aria-describedby={isVisible ? tooltipId : undefined}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </button>
      );
    }
  } else {
    // Free-standing Icon trigger
    const iconToRender = customIcon ? (
      customIcon
    ) : defaultIcon === 'help' ? (
      <svg
        className="a11y-tooltip-icon-svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="a11y-tooltip-icon-svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    );

    const iconButtonClasses = ['a11y-tooltip-icon-btn', triggerClassName].filter(Boolean).join(' ');

    triggerElement = (
      <button
        type="button"
        className={iconButtonClasses}
        aria-label={label || (defaultIcon === 'help' ? 'Help' : 'Information')}
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {iconToRender}
      </button>
    );
  }

  const tooltipClasses = [
    'a11y-tooltip',
    `a11y-tooltip--${effectivePlacement}`,
    isSmall && 'a11y-tooltip--small',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipStyle: React.CSSProperties =
    shiftX !== 0 && (effectivePlacement === 'top' || effectivePlacement === 'bottom')
      ? { transform: `translateX(calc(-50% + ${shiftX}px))` }
      : {};

  const arrowStyle: React.CSSProperties =
    shiftX !== 0 && (effectivePlacement === 'top' || effectivePlacement === 'bottom')
      ? { transform: `translateX(${-shiftX}px) rotate(45deg)` }
      : {};

  return (
    <span className="a11y-tooltip-wrapper">
      {triggerElement}
      {isVisible && (
        <span
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={tooltipClasses}
          style={tooltipStyle}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {contentHeading && <span className="a11y-tooltip__heading">{contentHeading}</span>}
          <span className="a11y-tooltip__content">{content}</span>
          <span className="a11y-tooltip__arrow" style={arrowStyle} aria-hidden="true" />
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
