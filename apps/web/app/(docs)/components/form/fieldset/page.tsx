import Link from 'next/link';
import { Fieldset, Input } from '@a11ypros/a11y-ui-components';

export default function FieldsetPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><Link href="/components/form">Form</Link></li>
          <li><span aria-current="page">Fieldset</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Fieldset</h1>
        <p>Use Fieldset and legend to group related controls under a shared context.</p>
      </header>

      <section aria-labelledby="fieldset-example-title" className="doc-section">
        <h2 id="fieldset-example-title">Example</h2>
        <Fieldset legend="Shipping address" required>
          <Input label="Street" name="street" placeholder="123 Main St" required />
          <Input label="City" name="city" placeholder="San Diego" required />
        </Fieldset>
      </section>

      <section aria-labelledby="fieldset-a11y-title" className="doc-section">
        <h2 id="fieldset-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Related controls are grouped semantically with legend context.</li>
          <li>WCAG 3.3.2: Group-level required guidance communicates expectations.</li>
          <li>WCAG 4.1.2: Native fieldset and legend semantics are preserved.</li>
        </ul>
      </section>

      <section aria-labelledby="fieldset-playground-title" className="doc-section">
        <h2 id="fieldset-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-fieldset--default">
          Open Fieldset stories
        </a>
      </section>
    </article>
  );
}
