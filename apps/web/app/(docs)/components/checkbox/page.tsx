'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Checkbox } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { checkboxApi } from '../api-reference-data';

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><span aria-current="page">Checkbox</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Checkbox</h1>
        <p>Use Checkbox for independent yes or no choices and consent actions.</p>
      </header>

      <DocExample
        id="checkbox-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Checkbox.tsx"
        code={`const [checked, setChecked] = useState(false);

<Checkbox
  id="terms"
  label="I agree to the terms and conditions"
  checked={checked}
  onChange={(event) => setChecked(event.target.checked)}
/>`}
      >
        <Checkbox
          id="terms"
          label="I agree to the terms and conditions"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      </DocExample>

      <ApiReference sections={checkboxApi} />

      <section aria-labelledby="checkbox-a11y-title" className="doc-section">
        <h2 id="checkbox-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Label and checkbox are correctly associated.</li>
          <li>WCAG 2.1.1: Space key toggles state through keyboard interaction.</li>
          <li>WCAG 4.1.2: Checked and unchecked states are announced.</li>
        </ul>
      </section>

      <section aria-labelledby="checkbox-playground-title" className="doc-section">
        <h2 id="checkbox-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-checkbox--default">
          Open Checkbox stories
        </a>
      </section>
    </article>
  );
}
