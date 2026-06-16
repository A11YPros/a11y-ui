'use client';

import Link from 'next/link';
import { Tabs } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { tabsApi } from '../api-reference-data';

export default function TabsPage() {
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
            <span aria-current="page">Tabs</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Tabs</h1>
        <p>Organize related views with directional keyboard support and clear panel ownership.</p>
      </header>

      <DocExample
        id="tabs-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Tabs/Tabs.tsx"
        code={`<Tabs
  aria-label="Settings tabs"
  items={[
    { id: 'general', label: 'General', content: <p>Configure general settings.</p> },
    { id: 'account', label: 'Account', content: <p>Manage account preferences.</p> },
    { id: 'privacy', label: 'Privacy', content: <p>Control privacy settings.</p> },
  ]}
/>`}
      >
        <Tabs
          aria-label="Settings tabs"
          items={[
            {
              id: 'general',
              label: 'General',
              content: (
                <div>
                  <h3>General Settings</h3>
                  <p>Configure general application settings here.</p>
                </div>
              ),
            },
            {
              id: 'account',
              label: 'Account',
              content: (
                <div>
                  <h3>Account Settings</h3>
                  <p>Manage your account preferences.</p>
                </div>
              ),
            },
            {
              id: 'privacy',
              label: 'Privacy',
              content: (
                <div>
                  <h3>Privacy Settings</h3>
                  <p>Control your privacy and data settings.</p>
                </div>
              ),
            },
          ]}
        />
      </DocExample>

      <ApiReference sections={tabsApi} />

      <section aria-labelledby="tabs-a11y-title" className="doc-section">
        <h2 id="tabs-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: Arrow key navigation, Home/End support</li>
          <li>WCAG 4.1.2 Name, Role, Value: ARIA tabs pattern</li>
          <li>WCAG 2.4.3 Focus Order: Proper focus management</li>
        </ul>
      </section>

      <section aria-labelledby="tabs-playground-title" className="doc-section">
        <h2 id="tabs-playground-title">Playground</h2>
        <a className="playground-link" href="/storybook-static/index.html?path=/story/components-tabs--default">
          Open Tabs stories
        </a>
      </section>
    </article>
  );
}
