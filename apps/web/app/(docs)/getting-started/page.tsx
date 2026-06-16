import Link from 'next/link';

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

      <section aria-labelledby="example-title" className="doc-section">
        <h2 id="example-title">3. Render your first components</h2>
        <pre className="code-block">
          <code>{`import { Button, Input, Modal } from '@a11ypros/a11y-ui-components';

export function Example() {
  return (
    <>
      <Button variant="primary">Continue</Button>
      <Input label="Email" type="email" required />
      <Modal isOpen={false} onClose={() => {}} title="Example modal">
        <p>Modal content</p>
      </Modal>
    </>
  );
}`}</code>
        </pre>
      </section>

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
