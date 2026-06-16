import Link from 'next/link';

export default function AccessibilityPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-current="page">Accessibility</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Accessibility principles</h1>
        <p>
          A11y UI components are designed to prioritize semantic HTML, keyboard support, and
          screen-reader clarity by default.
        </p>
        <p>
          All components are developed and tested by certified <Link target='_blank' href="https://www.accessibilityassociation.org/">IAAP</Link> Web Accessibility Specialists
          and U.S. Department of Homeland Security Trusted Testers for web.
        </p>
      </header>

      <section aria-labelledby="a11y-core-title" className="doc-section">
        <h2 id="a11y-core-title">Core implementation principles</h2>
        <ul>
          <li>Semantic HTML first and ARIA only when native semantics are not sufficient.</li>
          <li>Keyboard-operable interactions for all interactive components.</li>
          <li>Visible focus indicators and stable focus order.</li>
          <li>Clear labels, descriptions, and error messaging for form controls.</li>
          <li>Announcements for dynamic status updates when content changes in-place.</li>
        </ul>
      </section>

      <section aria-labelledby="a11y-testing-title" className="doc-section">
        <h2 id="a11y-testing-title">Testing checklist</h2>
        <ol>
          <li>Navigate each component with keyboard only.</li>
          <li>Validate form fields and confirm error messaging is announced.</li>
          <li>Inspect screen-reader output for control names and state changes.</li>
          <li>Confirm color contrast and focus visibility in your theme.</li>
        </ol>
      </section>

      <section aria-labelledby="a11y-resources-title" className="doc-section">
        <h2 id="a11y-resources-title">Resources</h2>
        <p>
          Review practical component usage in <Link href="/components">Components</Link> and test
          interaction states in <a href="/storybook-static/index.html">Storybook Playground</a>.
        </p>
      </section>
    </article>
  );
}
