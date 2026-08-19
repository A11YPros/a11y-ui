'use client';

import React from 'react';
import './Accordion.css';

export interface AccordionItemProps {
  /**
   * Unique identifier for the accordion item
   */
  id: string;

  /**
   * Title/header of the accordion item
   */
  title: string;

  /**
   * Content of the accordion item
   */
  children: React.ReactNode;

  /**
   * Whether the item is initially open
   */
  defaultOpen?: boolean;

  /**
   * Custom class name for the item
   */
  className?: string;
}

/**
 * Accessible Accordion Item component using native HTML5 details/summary
 *
 * WCAG Compliance:
 * - 2.1.1 Keyboard: Full keyboard support (Enter/Space)
 * - 2.4.7 Focus Visible: Clear focus indicators
 * - 4.1.2 Name, Role, Value: Semantic HTML elements
 *
 * @example
 * ```tsx
 * <AccordionItem id="item-1" title="Section 1">
 *   <p>Content for section 1</p>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ id, title, children, defaultOpen = false, className = '', ...props }, ref) => {
    const classes = ['accordion-item', className].filter(Boolean).join(' ');

    return (
      <details ref={ref} id={id} className={classes} open={defaultOpen} {...props}>
        <summary className="accordion-item__summary">
          <span className="accordion-item__title">{title}</span>
          <svg
            className="accordion-item__icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <div className="accordion-item__content">{children}</div>
      </details>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export interface AccordionProps {
  /**
   * Accordion items (AccordionItem components)
   */
  children: React.ReactNode;

  /**
   * Whether to allow multiple items to be open at once
   */
  allowMultiple?: boolean;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Accessible Accordion container component
 *
 * WCAG Compliance:
 * - 2.1.1 Keyboard: Full keyboard navigation support
 * - 2.4.7 Focus Visible: Clear focus indicators on all interactive elements
 * - 4.1.2 Name, Role, Value: Semantic HTML with proper structure
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem id="item-1" title="First Item">
 *     <p>Content 1</p>
 *   </AccordionItem>
 *   <AccordionItem id="item-2" title="Second Item">
 *     <p>Content 2</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, allowMultiple = false, className = '', ...props }, ref) => {
    const detailsRefs = React.useRef<(HTMLDetailsElement | null)[]>([]);

    const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      if (!allowMultiple) {
        const targetDetails = event.currentTarget;

        // Only close others if the current item is being opened
        if (targetDetails.open) {
          detailsRefs.current.forEach((details) => {
            if (details && details !== targetDetails && details.open) {
              details.open = false;
            }
          });
        }
      }
    };

    const classes = ['accordion', className].filter(Boolean).join(' ');

    // Clone children to add toggle handler and refs
    const enhancedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === AccordionItem) {
        return React.cloneElement(child as React.ReactElement<any>, {
          ref: (el: HTMLDetailsElement) => {
            detailsRefs.current[index] = el;
            // Forward ref if child has one (supports callback refs, object refs, and React 19 props.ref)
            const childRef = (child.props as any)?.ref ?? (child as any).ref;
            if (typeof childRef === 'function') {
              childRef(el);
            } else if (childRef && typeof childRef === 'object' && 'current' in childRef) {
              (childRef as any).current = el;
            }
          },
          onToggle: handleToggle,
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={classes} {...props}>
        {enhancedChildren}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
