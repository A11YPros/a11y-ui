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
        snippets={[
          {
            label: 'React',
            language: 'tsx',
            code: `import { Banner } from '@a11ypros/a11y-ui-components';

<Banner title="Scheduled maintenance" variant="warning" isDismissible onClose={() => {}}>
  Service may be unavailable between 2:00 and 2:30 AM UTC.
</Banner>`,
            preview: (
              <Banner
                title="Scheduled maintenance"
                variant="warning"
                isDismissible
                onClose={() => {}}
              >
                Service may be unavailable between 2:00 and 2:30 AM UTC.
              </Banner>
            ),
          },
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `// Import once in your app or component
import '@a11ypros/a11y-ui-elements/banner';

<a11y-banner title="Scheduled maintenance" variant="warning" dismissible>
  Service may be unavailable between 2:00 and 2:30 AM UTC.
</a11y-banner>`,
            preview: (
              <a11y-banner title="Scheduled maintenance" variant="warning" dismissible>
                Service may be unavailable between 2:00 and 2:30 AM UTC.
              </a11y-banner>
            ),
          },
        ]}
      />

      <DocExample
        id="banner-variants-title"
        title="Variants"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Banner/Banner.tsx"
        snippets={[
          {
            label: 'React',
            language: 'tsx',
            code: `<div className="example-column">
  <Banner title="Info" variant="info">New team updates are available.</Banner>
  <Banner title="Success" variant="success">Your preferences were saved.</Banner>
  <Banner title="Warning" variant="warning">Storage is almost full.</Banner>
  <Banner title="Error" variant="error">We could not process your request.</Banner>
</div>`,
            preview: (
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
            ),
          },
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `<div class="example-column">
  <a11y-banner title="Info" variant="info">New team updates are available.</a11y-banner>
  <a11y-banner title="Success" variant="success">Your preferences were saved.</a11y-banner>
  <a11y-banner title="Warning" variant="warning">Storage is almost full.</a11y-banner>
  <a11y-banner title="Error" variant="error">We could not process your request.</a11y-banner>
</div>`,
            preview: (
              <div className="example-column">
                <a11y-banner title="Info" variant="info">
                  New team updates are available.
                </a11y-banner>
                <a11y-banner title="Success" variant="success">
                  Your preferences were saved.
                </a11y-banner>
                <a11y-banner title="Warning" variant="warning">
                  Storage is almost full.
                </a11y-banner>
                <a11y-banner title="Error" variant="error">
                  We could not process your request.
                </a11y-banner>
              </div>
            ),
          },
        ]}
      />

      <ApiReference sections={bannerApi} />

      <section aria-labelledby="banner-a11y-title" className="doc-section">
        <h2 id="banner-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1 Info and Relationships: Semantic heading and grouped message content</li>
          <li>WCAG 2.1.1 Keyboard: Dismiss action uses native button semantics</li>
          <li>WCAG 4.1.2 Name, Role, Value: Programmatic live region attributes are exposed</li>
          <li>
            WCAG 4.1.3 Status Messages: Variant defaults map to appropriate announcement behavior
          </li>
        </ul>
      </section>

      <section aria-labelledby="banner-playground-title" className="doc-section">
        <h2 id="banner-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/docs/components-banner--docs"
        >
          Open Banner stories
        </a>
      </section>
    </article>
  );
}
