'use client';

import Link from 'next/link';
import { Button, Link as DesignSystemLink } from '@a11ypros/a11y-ui-components';
import { componentDocs } from './component-docs';

export default function ComponentsPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-current="page">Components</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Components</h1>
        <p>
          Explore implementation details, accessibility notes, and practical examples for each
          component.
        </p>
      </header>

      <section aria-labelledby="components-list-title" className="doc-section">
        <h2 id="components-list-title">Available components</h2>
        <ul className="component-list">
          {componentDocs.map((item) => (
            <li key={item.slug}>
              <Link href={`/components/${item.slug}`}>
                <strong>{item.title}</strong>
                <span>{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="components-examples-title" className="doc-section">
        <h2 id="components-examples-title">Quick examples</h2>
        <div className="example-row">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <DesignSystemLink href="/getting-started">Read installation guide</DesignSystemLink>
        </div>
      </section>

      <section aria-labelledby="components-playground-title" className="doc-section">
        <h2 id="components-playground-title">Playground</h2>
        <p>
          Use the interactive Storybook surface to test props and visual states in isolation.
        </p>
        <p>
          <a className="playground-link" href="/storybook-static/index.html">
            Open Storybook Playground
          </a>
        </p>
      </section>
    </article>
  );
}
