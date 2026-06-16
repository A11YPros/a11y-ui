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
        Notifications
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Notifications">
        <p>You have new notifications.</p>
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
            <span aria-current="page">Getting Started</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Getting Started</h1>
        <p>
          Install the free package, import styles once, and start composing accessible components in
          your app.
        </p>
      </header>

      <section aria-labelledby="install-title" className="doc-section">
        <h2 id="install-title">1. Install</h2>
        <pre className="code-block">
          <code>npm install @a11ypros/a11y-ui-components</code>
        </pre>
      </section>

      <section aria-labelledby="styles-title" className="doc-section">
        <h2 id="styles-title">2. Load styles</h2>
        <pre className="code-block">
          <code>import '@a11ypros/a11y-ui-components/styles';</code>
        </pre>
      </section>

      <DocExample
        id="example-title"
        title="3. Render your first components"
        code={`import { useState } from 'react';
import { Button, Modal } from '@a11ypros/a11y-ui-components';

export function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Notifications
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Notifications">
        <p>You have new notifications.</p>
      </Modal>
    </>
  );
}`}
      >
        <GettingStartedExample />
      </DocExample>

      <section aria-labelledby="next-title" className="doc-section">
        <h2 id="next-title">Next steps</h2>
        <ul>
          <li>
            Browse all examples in <Link href="/components">Components</Link>.
          </li>
          <li>
            Test interactive states in <a href="/storybook-static/index.html">Storybook</a>.
          </li>
        </ul>
      </section>
    </article>
  );
}
