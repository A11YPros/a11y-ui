'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { inputApi } from '../api-reference-data';

export default function InputPage() {
  const [value, setValue] = useState('');

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><span aria-current="page">Input</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Input</h1>
        <p>Use Input for single-line text entry with built-in labeling and validation states.</p>
      </header>

      <DocExample
        id="input-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Input.tsx"
        code={`const [value, setValue] = useState('');

<Input
  label="Email address"
  type="email"
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="you@example.com"
  helperText="We use this email for account notifications."
  required
/>`}
      >
        <Input
          label="Email address"
          type="email"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="you@example.com"
          helperText="We use this email for account notifications."
          required
        />
      </DocExample>

      <ApiReference sections={inputApi} />

      <section aria-labelledby="input-a11y-title" className="doc-section">
        <h2 id="input-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Programmatic label and field association.</li>
          <li>WCAG 2.5.3: Label text and accessible name alignment.</li>
          <li>WCAG 4.1.2: Error and helper text relationships are announced.</li>
        </ul>
      </section>

      <section aria-labelledby="input-playground-title" className="doc-section">
        <h2 id="input-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-input--default">
          Open Input stories
        </a>
      </section>
    </article>
  );
}
