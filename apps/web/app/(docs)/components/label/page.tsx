import Link from 'next/link';
import { Label, Input } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { labelApi } from '../api-reference-data';

export default function LabelPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/components">Components</Link></li>
          <li><span aria-current="page">Label</span></li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Label</h1>
        <p>Use Label to provide a visible and programmatic name for form controls.</p>
      </header>

      <DocExample
        id="label-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Label.tsx"
        code={`<div className="example-column">
  <Label htmlFor="full-name" required>
    Full name
  </Label>
  <Input id="full-name" name="fullName" placeholder="Taylor Morgan" required />
</div>`}
      >
        <div className="example-column">
          <Label htmlFor="full-name" required>
            Full name
          </Label>
          <Input id="full-name" name="fullName" placeholder="Taylor Morgan" required />
        </div>
      </DocExample>

      <ApiReference sections={labelApi} />

      <section aria-labelledby="label-a11y-title" className="doc-section">
        <h2 id="label-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1: Label and control association is explicit via htmlFor and id.</li>
          <li>WCAG 2.5.3: Visible label text aligns with accessible name.</li>
          <li>WCAG 3.3.2: Required indicator provides clear data entry expectations.</li>
        </ul>
      </section>

      <section aria-labelledby="label-playground-title" className="doc-section">
        <h2 id="label-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-form-input--default">
          Open Form stories
        </a>
      </section>
    </article>
  );
}
