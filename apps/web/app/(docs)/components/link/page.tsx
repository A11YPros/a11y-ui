'use client';

import NextLink from 'next/link';
import { Link } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { linkApi } from '../api-reference-data';

export default function LinkPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <NextLink href="/">Home</NextLink>
          </li>
          <li>
            <NextLink href="/components">Components</NextLink>
          </li>
          <li>
            <span aria-current="page">Link</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Link</h1>
        <p>Use semantic links for navigation actions and add utility styles where needed.</p>
      </header>

      <DocExample
        id="link-usage-title"
        title="Usage"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Link/Link.tsx"
        code={`import { Link } from '@a11ypros/a11y-ui-components';

<div className="example-column">
  <Link href="/components">Internal Link</Link>
  <Link href="https://example.com" external>
    External Link
  </Link>
  <Link href="#main-content" skip>
    Skip Link
  </Link>
</div>`}
      >
        <div className="example-column">
          <Link href="/components">Internal Link</Link>
          <Link href="https://example.com" external>
            External Link
          </Link>
          <Link href="#main-content" skip>
            Skip Link
          </Link>
        </div>
      </DocExample>

      <ApiReference sections={linkApi} />

      <section aria-labelledby="link-a11y-title" className="doc-section">
        <h2 id="link-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 2.4.4 Link Purpose: Clear link text or aria-label</li>
          <li>WCAG 2.4.7 Focus Visible: Clear focus indicators</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper semantic HTML</li>
        </ul>
      </section>

      <section aria-labelledby="link-playground-title" className="doc-section">
        <h2 id="link-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-link--default"
        >
          Open Link stories
        </a>
      </section>
    </article>
  );
}
