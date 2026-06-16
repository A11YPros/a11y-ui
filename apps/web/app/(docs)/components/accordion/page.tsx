'use client';

import Link from 'next/link';
import { Accordion, AccordionItem } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { accordionApi } from '../api-reference-data';

export default function AccordionPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/components">Components</Link>
          </li>
          <li>
            <span aria-current="page">Accordion</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Accordion</h1>
        <p>Reveal and collapse related content using native details and summary semantics.</p>
      </header>

      <section aria-labelledby="accordion-overview-title" className="doc-section">
        <h2 id="accordion-overview-title">Overview</h2>
        <p>
          The accordion component is useful for FAQs and dense content where users need to expand
          one section at a time.
        </p>
      </section>

      <DocExample
        id="accordion-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Accordion/Accordion.tsx"
        code={`<Accordion>
  <AccordionItem id="acc-shipping" title="Shipping policy">
    <p>Orders are processed within two business days and include tracking information.</p>
  </AccordionItem>
  <AccordionItem id="acc-returns" title="Returns policy">
    <p>Returns are accepted within 30 days of delivery for unused products.</p>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion>
          <AccordionItem id="acc-shipping" title="Shipping policy">
            <p>Orders are processed within two business days and include tracking information.</p>
          </AccordionItem>
          <AccordionItem id="acc-returns" title="Returns policy">
            <p>Returns are accepted within 30 days of delivery for unused products.</p>
          </AccordionItem>
          <AccordionItem id="acc-support" title="Support hours">
            <p>Live support is available Monday to Friday, 9am to 5pm Eastern Time.</p>
          </AccordionItem>
        </Accordion>
      </DocExample>

      <ApiReference sections={accordionApi} />

      <section aria-labelledby="accordion-a11y-title" className="doc-section">
        <h2 id="accordion-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: Disclosure triggers are keyboard operable.</li>
          <li>WCAG 2.4.7 Focus Visible: Summary element receives visible focus treatment.</li>
          <li>WCAG 4.1.2 Name, Role, Value: Native details and summary semantics are preserved.</li>
        </ul>
      </section>

      <section aria-labelledby="accordion-playground-title" className="doc-section">
        <h2 id="accordion-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-accordion--single-open"
        >
          Open Accordion stories
        </a>
      </section>
    </article>
  );
}
