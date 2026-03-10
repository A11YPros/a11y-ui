'use client';

import Link from 'next/link';
import { Button, Link as DesignSystemLink } from '@a11ypros/a11y-ui-components';

export default function ComponentsPage() {
  return (
    <main>
      <h1>Design System Components</h1>
      <p>Browse and test all accessible components in the design system.</p>

      <nav>
        <h2>Components</h2>
        <ul>
          <li>
            <Link href="/components/button">Button</Link>
          </li>
          <li>
            <Link href="/components/link">Link</Link>
          </li>
          <li>
            <Link href="/components/modal">Modal</Link>
          </li>
          <li>
            <Link href="/components/form">Form Components</Link>
          </li>
          <li>
            <Link href="/components/table">Data Table</Link>
          </li>
          <li>
            <Link href="/components/tabs">Tabs</Link>
          </li>
        </ul>
      </nav>

      <section>
        <h2>Quick Examples</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <DesignSystemLink href="/audit">Go to Audit Tool</DesignSystemLink>
        </div>
      </section>
    </main>
  );
}
