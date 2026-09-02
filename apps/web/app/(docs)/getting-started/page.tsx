'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../_components/DocExample';

function GettingStartedExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Getting Started">
        <p>Your React accessible component library is ready!</p>
      </Modal>
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span>Getting Started</span>
          </li>
          <li>
            <span aria-current="page">React Components</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="doc-example__preview-badge doc-example__preview-badge--react" aria-hidden="true">
            <span className="doc-example__preview-badge-dot" />
            React Package (@a11ypros/a11y-ui-components)
          </span>
        </div>
        <h1>Getting Started with React</h1>
        <p>
          Install <code>@a11ypros/a11y-ui-components</code>, import styles once, and start composing
          accessible, WCAG 2.1/2.2 compliant React components with full TypeScript support.
        </p>
      </header>

      <div className="doc-notice-card">
        <p>
          <strong>Looking for framework-agnostic HTML5 Web Components instead?</strong> If you are
          building with vanilla HTML, Vue, Svelte, Angular, Astro, or static sites without React,
          check out the{' '}
          <Link href="/web-components">
            <strong>Getting Started with HTML5 Web Components</strong>
          </Link>{' '}
          guide.
        </p>
      </div>

      <section aria-labelledby="install-title" className="doc-section">
        <h2 id="install-title">1. Install</h2>
        <p>Install the React component package using npm, yarn, or pnpm:</p>
        <pre className="code-block">
          <code>npm install @a11ypros/a11y-ui-components</code>
        </pre>
      </section>

      <section aria-labelledby="styles-title" className="doc-section">
        <h2 id="styles-title">2. Load styles</h2>
        <p>Import the design tokens and component styles once in your root layout or entry file:</p>
        <pre className="code-block">
          <code>import '@a11ypros/a11y-ui-components/styles';</code>
        </pre>
      </section>

      <DocExample
        id="example-title"
        title="3. Render your first React components"
        code={`import { useState } from 'react';
import { Button, Modal } from '@a11ypros/a11y-ui-components';

export function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Getting Started">
        <p>Your React accessible component library is ready!</p>
      </Modal>
    </>
  );
}`}
      >
        <GettingStartedExample />
      </DocExample>

      <section aria-labelledby="features-title" className="doc-section">
        <h2 id="features-title">4. React Features &amp; Integrations</h2>
        <ul>
          <li>
            <strong>First-Class TypeScript:</strong> All components, event handlers, and props are fully typed with exported prop interfaces.
          </li>
          <li>
            <strong>Ref Forwarding:</strong> All components forward refs to the underlying DOM elements for smooth integrations with focus managers or animation libraries.
          </li>
          <li>
            <strong>SSR Compatible:</strong> Fully compatible with Next.js (App Router and Pages Router), Remix, and Gatsby.
          </li>
        </ul>
      </section>

      <section aria-labelledby="next-title" className="doc-section">
        <h2 id="next-title">Next steps</h2>
        <ul>
          <li>
            Browse all components in <Link href="/components">Components</Link>.
          </li>
          <li>
            Learn how to customize design tokens in the <Link href="/theming">Theming Guide</Link>.
          </li>
          <li>
            Read our <Link href="/accessibility">Accessibility Standards</Link> guide.
          </li>
        </ul>
      </section>
    </article>
  );
}
