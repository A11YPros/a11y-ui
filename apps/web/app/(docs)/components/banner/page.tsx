'use client';

import Link from 'next/link';
import { Banner } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { bannerApi } from '../api-reference-data';

export default function BannerPage() {
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
            <span aria-current="page">Banner</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Banner</h1>
        <p>Communicate important status information with clear emphasis and optional dismissal.</p>
      </header>

      <DocExample
        id="banner-usage-title"
        title="Usage"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Banner/Banner.tsx"
        code={`import { Banner } from '@a11ypros/a11y-ui-components';

<Banner title="Scheduled maintenance" variant="warning" isDismissible onClose={() => {}}>
  Service may be unavailable between 2:00 and 2:30 AM UTC.
</Banner>`}
      >
        <Banner title="Scheduled maintenance" variant="warning" isDismissible onClose={() => {}}>
          Service may be unavailable between 2:00 and 2:30 AM UTC.
        </Banner>
      </DocExample>

      <DocExample
        id="banner-variants-title"
        title="Variants"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Banner/Banner.tsx"
        code={`<div className="example-column">
  <Banner title="Info" variant="info">New team updates are available.</Banner>
  <Banner title="Success" variant="success">Your preferences were saved.</Banner>
  <Banner title="Warning" variant="warning">Storage is almost full.</Banner>
  <Banner title="Error" variant="error">We could not process your request.</Banner>
</div>`}
      >
        <div className="example-column">
          <Banner title="Info" variant="info">
            New team updates are available.
          </Banner>
          <Banner title="Success" variant="success">
            Your preferences were saved.
          </Banner>
          <Banner title="Warning" variant="warning">
            Storage is almost full.
          </Banner>
          <Banner title="Error" variant="error">
            We could not process your request.
          </Banner>
        </div>
      </DocExample>

      <ApiReference sections={bannerApi} />

      <section aria-labelledby="banner-a11y-title" className="doc-section">
        <h2 id="banner-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1 Info and Relationships: Semantic heading and grouped message content</li>
          <li>WCAG 2.1.1 Keyboard: Dismiss action uses native button semantics</li>
          <li>WCAG 4.1.2 Name, Role, Value: Programmatic live region attributes are exposed</li>
          <li>WCAG 4.1.3 Status Messages: Variant defaults map to appropriate announcement behavior</li>
        </ul>
      </section>

      <section aria-labelledby="banner-playground-title" className="doc-section">
        <h2 id="banner-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-banner--info"
        >
          Open Banner stories
        </a>
      </section>
    </article>
  );
}
