import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, runAxeTest } from '../../test-utils';
import { Accordion, AccordionItem } from './Accordion';

describe('Accordion', () => {
  it('renders accordion items correctly', () => {
    render(
      <Accordion>
        <AccordionItem id="item-1" title="First Section">
          <p>First Content</p>
        </AccordionItem>
        <AccordionItem id="item-2" title="Second Section">
          <p>Second Content</p>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('First Section')).toBeInTheDocument();
    expect(screen.getByText('Second Section')).toBeInTheDocument();
    expect(screen.getByText('First Content')).toBeInTheDocument();
    expect(screen.getByText('Second Content')).toBeInTheDocument();
  });

  it('respects defaultOpen prop on items', () => {
    render(
      <Accordion>
        <AccordionItem id="item-1" title="Closed Section">
          <p>Closed Content</p>
        </AccordionItem>
        <AccordionItem id="item-2" title="Open Section" defaultOpen>
          <p>Open Content</p>
        </AccordionItem>
      </Accordion>
    );

    const item1 = document.getElementById('item-1') as HTMLDetailsElement;
    const item2 = document.getElementById('item-2') as HTMLDetailsElement;

    expect(item1.open).toBe(false);
    expect(item2.open).toBe(true);
  });

  it('closes other items when an item opens in single-expand mode (allowMultiple=false)', () => {
    render(
      <Accordion allowMultiple={false}>
        <AccordionItem id="item-1" title="Section 1" defaultOpen>
          <p>Content 1</p>
        </AccordionItem>
        <AccordionItem id="item-2" title="Section 2">
          <p>Content 2</p>
        </AccordionItem>
      </Accordion>
    );

    const item1 = document.getElementById('item-1') as HTMLDetailsElement;
    const item2 = document.getElementById('item-2') as HTMLDetailsElement;

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(false);

    // Simulate opening item 2
    item2.open = true;
    fireEvent(item2, new Event('toggle'));

    expect(item1.open).toBe(false);
    expect(item2.open).toBe(true);
  });

  it('allows multiple items open when allowMultiple=true', () => {
    render(
      <Accordion allowMultiple={true}>
        <AccordionItem id="item-1" title="Section 1" defaultOpen>
          <p>Content 1</p>
        </AccordionItem>
        <AccordionItem id="item-2" title="Section 2">
          <p>Content 2</p>
        </AccordionItem>
      </Accordion>
    );

    const item1 = document.getElementById('item-1') as HTMLDetailsElement;
    const item2 = document.getElementById('item-2') as HTMLDetailsElement;

    expect(item1.open).toBe(true);

    item2.open = true;
    fireEvent(item2, new Event('toggle'));

    expect(item1.open).toBe(true);
    expect(item2.open).toBe(true);
  });

  it('forwards refs correctly', () => {
    const accordionRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDetailsElement>();

    render(
      <Accordion ref={accordionRef}>
        <AccordionItem ref={itemRef} id="item-1" title="Section 1">
          <p>Content 1</p>
        </AccordionItem>
      </Accordion>
    );

    expect(accordionRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDetailsElement);
  });

  it('applies custom classNames', () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem id="item-1" title="Section 1" className="custom-item">
          <p>Content 1</p>
        </AccordionItem>
      </Accordion>
    );

    const accordion = document.querySelector('.accordion');
    const item = document.querySelector('.accordion-item');

    expect(accordion).toHaveClass('custom-accordion');
    expect(item).toHaveClass('custom-item');
  });

  it('renders decorative icon with aria-hidden="true"', () => {
    render(
      <Accordion>
        <AccordionItem id="item-1" title="Section 1">
          <p>Content 1</p>
        </AccordionItem>
      </Accordion>
    );

    const icon = document.querySelector('.accordion-item__icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  describe('Accessibility (axe)', () => {
    it('has no accessibility violations when closed', async () => {
      const { container } = render(
        <Accordion>
          <AccordionItem id="acc-1" title="Getting Started">
            <p>Installation and setup instructions.</p>
          </AccordionItem>
          <AccordionItem id="acc-2" title="Components">
            <p>Overview of all accessible UI components.</p>
          </AccordionItem>
        </Accordion>
      );

      await runAxeTest(container);
    });

    it('has no accessibility violations when open', async () => {
      const { container } = render(
        <Accordion allowMultiple>
          <AccordionItem id="acc-1" title="Getting Started" defaultOpen>
            <p>Installation and setup instructions.</p>
          </AccordionItem>
          <AccordionItem id="acc-2" title="Components" defaultOpen>
            <p>Overview of all accessible UI components.</p>
          </AccordionItem>
        </Accordion>
      );

      await runAxeTest(container);
    });
  });
});
