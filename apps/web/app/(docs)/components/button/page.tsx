'use client';

import Link from 'next/link';
import { Button } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { buttonApi } from '../api-reference-data';

export default function ButtonPage() {
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
            <span aria-current="page">Button</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Button</h1>
        <p>Use button variants for primary actions, secondary actions, and lower-emphasis actions.</p>
      </header>

      <DocExample
        id="button-usage-title"
        title="Usage"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Button/Button.tsx"
        code={`import { Button } from '@a11ypros/a11y-ui-components';

<div className="example-row">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Danger</Button>
</div>`}
      >
        <div className="example-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </DocExample>

      <DocExample
        id="button-size-title"
        title="Sizes and states"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Button/Button.tsx"
        code={`<div className="example-row">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button loading>Loading</Button>
  <Button disabled>Disabled</Button>
</div>`}
      >
        <div className="example-row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </DocExample>

      <ApiReference sections={buttonApi} />

      <section aria-labelledby="button-a11y-title" className="doc-section">
        <h2 id="button-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: Full keyboard support (Enter/Space)</li>
          <li>WCAG 2.4.7 Focus Visible: Clear focus indicators</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
        </ul>
      </section>

      <section aria-labelledby="button-playground-title" className="doc-section">
        <h2 id="button-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-button--primary"
        >
          Open Button stories
        </a>
      </section>
    </article>
  );
}
