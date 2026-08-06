import Link from 'next/link';
import { ThemeToggle } from './_components/ThemeToggle';
import { UiLogo } from './_components/UiLogo';
import { DocsHeaderNav } from './(docs)/_components/DocsNav';
import { JsonLd, createHomeJsonLd } from './_components/JsonLd';
import { ProWaitlistSection } from './_components/ProWaitlistSection';
import { CustomComponentCTA } from './_components/CustomComponentCTA';

export default function Home() {
  const jsonLdData = createHomeJsonLd();

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main id="main-content" className="home-main">
        <header className="home-hero">
          <div className="home-hero__top">
            <Link href="/" className="docs-brand">
              <UiLogo className="docs-brand__logo" />
              <span className="visually-hidden">A11y UI</span>
            </Link>
            <DocsHeaderNav />
          </div>
          <h1>Accessibility-first React components built for production teams.</h1>
          <p className="home-hero__lead">
            Build inclusive interfaces faster with WCAG compliant components, robust keyboard and screen reader support, and clear implementation guidance.
          </p>
          <nav aria-label="Primary" className="home-hero__actions">
            <Link href="/getting-started" className="button-like button-like--primary">
              Get Started
            </Link>
            <Link href="/components" className="button-like button-like--ghost">
              Browse Components
            </Link>
            <Link href="/pro" className="button-like button-like--accent">
              Pro Components <span className="badge-inline">NEW</span>
            </Link>
          </nav>
        </header>

        <section aria-labelledby="home-what-title" className="home-section">
          <h2 id="home-what-title">What’s Included</h2>
          <ul className="feature-grid">
            <li>
              <h3>Production-ready components</h3>
              <p>Button, Link, Modal, Form controls, DataTable, Tabs, and Accordion components.</p>
            </li>
            <li>
              <h3>Accessibility patterns first</h3>
              <p>Examples include keyboard support, focus behavior, semantic structure, and ARIA usage.</p>
            </li>
            <li>
              <h3>Page-based docs</h3>
              <p>Find implementation guidance quickly with focused pages and practical examples.</p>
            </li>
            <li>
              <h3>Interactive playground</h3>
              <p>Use Storybook controls to test component states before integrating into your app.</p>
            </li>
          </ul>
        </section>

        <ProWaitlistSection />

        <CustomComponentCTA />

        <section aria-labelledby="home-next-title" className="home-section">
          <h2 id="home-next-title">Start here</h2>
          <ol className="home-steps">
            <li>
              Read the <Link href="/getting-started">Getting Started guide</Link>.
            </li>
            <li>
              Explore component docs in <Link href="/components">Components</Link>.
            </li>
            <li>
              Preview <Link href="/pro">Pro Tier Components & Waitlist</Link>.
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
