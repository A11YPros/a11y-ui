'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Select } from '@a11ypros/a11y-ui-components';

export default function SelectPage() {
  const [value, setValue] = useState('');

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><Link href="/components/form">Form</Link></li>
          <li><span aria-current="page">Select</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Select</h1>
        <p>Use Select for predefined option lists where users choose a single value.</p>
      </header>

      <section aria-labelledby="select-example-title" className="doc-section">
        <h2 id="select-example-title">Example</h2>
        <Select
          label="Country"
          placeholder="Choose a country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
          ]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </section>

      <section aria-labelledby="select-a11y-title" className="doc-section">
        <h2 id="select-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Label and select are programmatically associated.</li>
          <li>WCAG 2.1.1: Native keyboard interaction is preserved.</li>
          <li>WCAG 3.3.2: Placeholder and helper text provide clear instructions.</li>
        </ul>
      </section>

      <section aria-labelledby="select-playground-title" className="doc-section">
        <h2 id="select-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-select--default">
          Open Select stories
        </a>
      </section>
    </article>
  );
}
