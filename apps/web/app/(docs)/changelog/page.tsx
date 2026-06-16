import Link from 'next/link';

export default function ChangelogPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-current="page">Changelog</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Changelog</h1>
        <p>Recent improvements to the free package and documentation surface.</p>
      </header>

      <section aria-labelledby="changelog-latest-title" className="doc-section">
        <h2 id="changelog-latest-title">Latest release highlights</h2>
        <ul>
          <li>Introduced a page-based documentation shell with persistent navigation.</li>
          <li>Added Getting Started flow and expanded component documentation pages.</li>
          <li>Added dedicated Accordion docs and Storybook bridge links per component.</li>
          <li>Retained audit route availability while shifting docs to component-first focus.</li>
        </ul>
      </section>

      <section aria-labelledby="changelog-release-title" className="doc-section">
        <h2 id="changelog-release-title">Release workflow</h2>
        <p>
          Package releases continue on npm via{' '}
          <a href="https://www.npmjs.com/package/@a11ypros/a11y-ui-components">
            @a11ypros/a11y-ui-components
          </a>
          .
        </p>
      </section>
    </article>
  );
}
