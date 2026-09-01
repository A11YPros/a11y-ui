'use client';

import Link from 'next/link';
import { Tooltip, Button } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { tooltipApi } from '../api-reference-data';

export default function TooltipPage() {
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
            <span aria-current="page">Tooltip</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Tooltip</h1>
        <p>
          Accessible informational popups triggered by keyboard focus or hover, complying with WCAG
          1.4.13 Content on Hover or Focus.
        </p>
      </header>

      <DocExample
        id="tooltip-interactive-example"
        title="Wrapping Interactive Elements"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Tooltip/Tooltip.tsx"
        snippets={[
          {
            label: 'React',
            language: 'tsx',
            code: `<Tooltip content="Print current report as PDF" placement="top">
  <Button variant="secondary">Print Report</Button>
</Tooltip>`,
            preview: (
              <div style={{ padding: '2.5rem 1rem' }}>
                <Tooltip content="Print current report as PDF" placement="top">
                  <Button variant="secondary">Print Report</Button>
                </Tooltip>
              </div>
            ),
          },
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `// Import once in your app or component
import '@a11ypros/a11y-ui-elements/tooltip';
import '@a11ypros/a11y-ui-elements/button';

<a11y-tooltip content="Print current report as PDF" placement="top">
  <a11y-button variant="secondary">Print Report</a11y-button>
</a11y-tooltip>`,
            preview: (
              <div style={{ padding: '2.5rem 1rem' }}>
                <a11y-tooltip content="Print current report as PDF" placement="top">
                  <a11y-button variant="secondary">Print Report</a11y-button>
                </a11y-tooltip>
              </div>
            ),
          },
        ]}
      />

      <DocExample
        id="tooltip-icon-example"
        title="Free-standing Help & Info Icons"
        code={`<div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
  <Tooltip
    defaultIcon="help"
    label="Help: CVV code"
    content="The 3-digit security code on the back of your card"
    placement="top"
  />
  <Tooltip
    defaultIcon="info"
    label="Info: Encryption"
    contentHeading="Security Guarantee"
    content="All data is encrypted in transit and at rest."
    placement="right"
  />
</div>`}
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem 1rem' }}>
          <Tooltip
            defaultIcon="help"
            label="Help: CVV code"
            content="The 3-digit security code on the back of your card"
            placement="top"
          />
          <Tooltip
            defaultIcon="info"
            label="Info: Encryption"
            contentHeading="Security Guarantee"
            content="All data is encrypted in transit and at rest."
            placement="right"
          />
        </div>
      </DocExample>

      <DocExample
        id="tooltip-text-example"
        title="Wrapping Non-Interactive Text"
        code={`<p>
  Total Due:{' '}
  <Tooltip content="Includes applicable state sales tax and courier delivery surcharge." placement="top">
    <span>$142.50*</span>
  </Tooltip>
</p>`}
      >
        <div style={{ padding: '2rem 1rem' }}>
          <p style={{ margin: 0, fontSize: '1rem', color: 'inherit' }}>
            Total Due:{' '}
            <Tooltip
              content="Includes applicable state sales tax and courier delivery surcharge."
              placement="top"
            >
              <span>$142.50*</span>
            </Tooltip>
          </p>
        </div>
      </DocExample>

      <ApiReference sections={tooltipApi} />

      <section aria-labelledby="tooltip-a11y-title" className="doc-section">
        <h2 id="tooltip-a11y-title">Accessibility (WCAG 1.4.13 Compliance)</h2>
        <ul>
          <li>
            <strong>Dismissible</strong>: Pressing <kbd>Escape</kbd> immediately dismisses the
            tooltip without moving pointer focus.
          </li>
          <li>
            <strong>Hoverable</strong>: Users can safely move their mouse cursor over the tooltip
            body without it disappearing, allowing them to read, inspect, or select text.
          </li>
          <li>
            <strong>Persistent</strong>: The tooltip remains visible until the user moves the
            pointer away, removes focus, or presses <kbd>Escape</kbd>.
          </li>
          <li>
            <strong>Semantic Association</strong>: Uses <code>role="tooltip"</code> with a unique ID
            linked via <code>aria-describedby</code> on the trigger.
          </li>
          <li>
            <strong>Keyboard Accessible</strong>: Free-standing icons and wrapped non-interactive
            text render as keyboard-focusable buttons (with optional dotted underlines) so
            keyboard-only users can navigate to and discover the tooltip.
          </li>
          <li>
            <strong>Zero 3rd-Party Dependencies</strong>: Implemented entirely with native React
            state and modern CSS positioning.
          </li>
        </ul>
      </section>

      <section aria-labelledby="tooltip-playground-title" className="doc-section">
        <h2 id="tooltip-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/docs/components-tooltip--docs"
        >
          Open Tooltip stories
        </a>
      </section>
    </article>
  );
}
