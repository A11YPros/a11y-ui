'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Radio } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { radioApi } from '../api-reference-data';

export default function RadioPage() {
  const [value, setValue] = useState('');

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><span aria-current="page">Radio</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Radio</h1>
        <p>Use Radio for mutually exclusive options where exactly one value is selected.</p>
      </header>

      <DocExample
        id="radio-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Radio.tsx"
        code={`const [value, setValue] = useState('');

<Radio
  name="contact-method"
  label="Preferred contact method"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
  ]}
  value={value}
  onChange={(event) => setValue(event.target.value)}
/>`}
      >
        <Radio
          name="contact-method"
          label="Preferred contact method"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'sms', label: 'SMS' },
          ]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </DocExample>

      <ApiReference sections={radioApi} />

      <section aria-labelledby="radio-a11y-title" className="doc-section">
        <h2 id="radio-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Radio controls are grouped with contextual labeling.</li>
          <li>WCAG 2.1.1: Arrow keys and tab order support group navigation.</li>
          <li>WCAG 4.1.2: Selected state is conveyed through semantic inputs.</li>
        </ul>
      </section>

      <section aria-labelledby="radio-playground-title" className="doc-section">
        <h2 id="radio-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-radio--default">
          Open Radio stories
        </a>
      </section>
    </article>
  );
}
