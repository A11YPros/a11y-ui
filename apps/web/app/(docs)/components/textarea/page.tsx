'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Textarea } from '@a11ypros/a11y-ui-components';

export default function TextareaPage() {
  const [value, setValue] = useState('');

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><Link href="/components/form">Form</Link></li>
          <li><span aria-current="page">Textarea</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Textarea</h1>
        <p>Use Textarea for longer content input, comments, and multi-line responses.</p>
      </header>

      <section aria-labelledby="textarea-example-title" className="doc-section">
        <h2 id="textarea-example-title">Example</h2>
        <Textarea
          label="Project notes"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          maxLength={280}
          showCount
          helperText="Share as much context as you need."
        />
      </section>

      <section aria-labelledby="textarea-a11y-title" className="doc-section">
        <h2 id="textarea-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Textarea is labeled and connected to helper content.</li>
          <li>WCAG 3.3.2: Instructions are provided before data entry.</li>
          <li>WCAG 4.1.3: Character count updates are communicated reliably.</li>
        </ul>
      </section>

      <section aria-labelledby="textarea-playground-title" className="doc-section">
        <h2 id="textarea-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-textarea--default">
          Open Textarea stories
        </a>
      </section>
    </article>
  );
}
