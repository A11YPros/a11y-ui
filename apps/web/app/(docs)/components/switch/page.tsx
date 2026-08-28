'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Switch } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { switchApi } from '../api-reference-data';

export default function SwitchPage() {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

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
            <span aria-current="page">Switch</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Switch</h1>
        <p>Use Switch for binary on/off settings and immediate state changes.</p>
      </header>

      <DocExample
        id="switch-example-title"
        title="Interactive Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Switch/Switch.tsx"
        code={`const [airplaneMode, setAirplaneMode] = useState(false);

<Switch
  id="airplane-mode"
  label="Airplane Mode"
  checked={airplaneMode}
  onChange={(checked) => setAirplaneMode(checked)}
/>`}
      >
        <Switch
          id="airplane-mode"
          label="Airplane Mode"
          checked={airplaneMode}
          onChange={(checked) => setAirplaneMode(checked)}
        />
      </DocExample>

      <DocExample
        id="switch-helper-title"
        title="With Helper Text and Sizes"
        code={`<Switch
  id="notifications"
  size="md"
  label="Push notifications"
  helperText="Receive real-time alerts on your device"
  checked={notifications}
  onChange={(checked) => setNotifications(checked)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch
            id="notifications"
            size="md"
            label="Push notifications"
            helperText="Receive real-time alerts on your device"
            checked={notifications}
            onChange={(checked) => setNotifications(checked)}
          />
        </div>
      </DocExample>

      <ApiReference sections={switchApi} />

      <section aria-labelledby="switch-a11y-title" className="doc-section">
        <h2 id="switch-a11y-title">Accessibility</h2>
        <ul>
          <li>
            WCAG 1.3.1: Label and switch are properly associated via <code>htmlFor</code> and{' '}
            <code>id</code>.
          </li>
          <li>
            WCAG 1.4.1: Switch state does not rely on color alone; thumb physical translation
            provides clear visual distinction.
          </li>
          <li>
            WCAG 1.4.3 &amp; 1.4.11: Exceeds 3:1 minimum contrast for user interface boundaries and
            track states.
          </li>
          <li>
            WCAG 2.1.1: Full keyboard navigation supporting both <kbd>Space</kbd> and{' '}
            <kbd>Enter</kbd> toggles.
          </li>
          <li>
            WCAG 2.4.7: High-visibility focus indicator with contrast fallback for dark and
            high-contrast modes.
          </li>
          <li>
            WCAG 2.5.8: Minimum target size complies with mobile pointer requirements via hit-target
            expansion.
          </li>
          <li>
            WCAG 4.1.2: Uses <code>role="switch"</code> and dynamic <code>aria-checked</code> state
            announcements.
          </li>
        </ul>
      </section>

      <section aria-labelledby="switch-playground-title" className="doc-section">
        <h2 id="switch-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/docs/components-switch--docs"
        >
          Open Switch stories
        </a>
      </section>
    </article>
  );
}
