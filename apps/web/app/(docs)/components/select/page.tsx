'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Select } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { selectApi } from '../api-reference-data';

export default function SelectPage() {
  const [value, setValue] = useState('');

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
            <span aria-current="page">Select</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Select</h1>
        <p>Use Select for predefined option lists where users choose a single value.</p>
      </header>

      <DocExample
        id="select-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Select.tsx"
        snippets={[
          {
            label: 'React',
            language: 'tsx',
            code: `const [value, setValue] = useState('');

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
/>`,
            preview: (
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
            ),
          },
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `// Import once in your app or component
import '@a11ypros/a11y-ui-elements/select';

<a11y-select label="Country">
  <option value="">Choose a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</a11y-select>`,
            preview: (
              <a11y-select label="Country" value={value}>
                <option value="">Choose a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </a11y-select>
            ),
          },
        ]}
      />

      <ApiReference sections={selectApi} />

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
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/docs/components-form-select--docs"
        >
          Open Select stories
        </a>
      </section>
    </article>
  );
}
