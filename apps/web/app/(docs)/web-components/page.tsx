'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Switch } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../_components/DocExample';

export default function WebComponentsGuidePage() {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span>Getting Started</span>
          </li>
          <li>
            <span aria-current="page">HTML5 Web Components</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="doc-example__preview-badge doc-example__preview-badge--wc" aria-hidden="true">
            <span className="doc-example__preview-badge-dot" />
            Web Components Package (@a11ypros/a11y-ui-elements)
          </span>
        </div>
        <h1>Getting Started with HTML5 Web Components</h1>
        <p>
          Standard, framework-agnostic Custom Elements built for WCAG 2.1/2.2 AA &amp; AAA
          compliance. Usable in plain HTML, Vue, Svelte, Angular, Astro, WordPress, Rails, and
          React.
        </p>
      </header>

      <div className="doc-notice-card">
        <p>
          <strong>Building a dedicated React application?</strong> Check out the{' '}
          <Link href="/getting-started">
            <strong>Getting Started with React</strong>
          </Link>{' '}
          guide for idiomatic React props, forwardRefs, and hooks.
        </p>
      </div>

      {/* Why Web Components */}
      <section aria-labelledby="why-title" className="doc-section">
        <h2 id="why-title">Why Standard Web Components?</h2>
        <p>
          Accessibility shouldn't be locked to a single UI framework. By providing standard HTML
          Custom Elements via <code>@a11ypros/a11y-ui-elements</code>, developers can drop
          accessible components into any stack:
        </p>
        <ul>
          <li>
            <strong>100% Light DOM Accessibility:</strong> Unlike typical web components that hide
            markup inside a Shadow Root (breaking cross-boundary ARIA associations like{' '}
            <code>aria-labelledby</code>, <code>aria-describedby</code>, and{' '}
            <code>&lt;label for=&quot;...&quot;&gt;</code>), our components render directly in the
            Light DOM. Screen readers navigate standard semantic HTML without barriers.
          </li>
          <li>
            <strong>Zero External Runtime:</strong> Zero third-party dependencies. Ultra-lightweight
            footprint.
          </li>
          <li>
            <strong>Universal Styling:</strong> Reuses your existing design tokens and CSS custom
            properties without needing complex <code>::part()</code> selectors.
          </li>
        </ul>
      </section>

      {/* Installation */}
      <section aria-labelledby="install-title" className="doc-section">
        <h2 id="install-title">1. Installation</h2>
        <p>Install via npm for module bundlers (Vite, Webpack, Next.js, Nuxt, SvelteKit):</p>
        <pre className="code-block">
          <code>npm install @a11ypros/a11y-ui-elements @a11ypros/a11y-ui-components</code>
        </pre>

        <h3 style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>Import into your app (recommended)</h3>
        <p>
          Just like CrowdStrike Glide Core, import the element once in your app or component entry point.
          The custom element is registered automatically:
        </p>
        <pre className="code-block">
          <code>{`import '@a11ypros/a11y-ui-elements/switch';
import '@a11ypros/a11y-ui-elements/button';

// Or import all elements:
import '@a11ypros/a11y-ui-elements';`}</code>
        </pre>
        <p style={{ marginTop: '0.75rem' }}>Then use the tag directly in your markup without any script tags:</p>
        <pre className="code-block">
          <code>{`<a11y-switch label="Notifications" checked></a11y-switch>
<a11y-button variant="primary">Submit</a11y-button>`}</code>
        </pre>

        <h3 style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>Without a bundler (Static HTML / CMS)</h3>
        <p>
          For static sites, WordPress, or Rails without an npm pipeline, load the standalone bundle:
        </p>
        <pre className="code-block">
          <code>{`<!-- Stylesheet with tokens & component styles -->
<link rel="stylesheet" href="path/to/@a11ypros/a11y-ui-components/styles/global.css">
<link rel="stylesheet" href="path/to/@a11ypros/a11y-ui-components/styles/components.css">

<!-- Self-contained Web Components bundle -->
<script src="path/to/@a11ypros/a11y-ui-elements/dist/bundle.js"></script>`}</code>
        </pre>
      </section>

      {/* Interactive Switch Example */}
      <DocExample
        id="wc-switch-example"
        title="Interactive Switch Example"
        description="Toggle between React and Web Component / HTML syntax to see how the component behaves identically."
        snippets={[
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `<!-- Standard HTML custom element -->
<a11y-switch id="flight-mode" label="Airplane Mode" checked></a11y-switch>

<script>
  const el = document.getElementById('flight-mode');
  el.addEventListener('change', (event) => {
    console.log('Switch state:', event.detail.checked);
  });
</script>`,
          },
          {
            label: 'React',
            language: 'tsx',
            code: `import { Switch } from '@a11ypros/a11y-ui-components';

export function Settings() {
  const [active, setActive] = useState(true);
  return (
    <Switch
      id="flight-mode"
      label="Airplane Mode"
      checked={active}
      onChange={setActive}
    />
  );
}`,
          },
        ]}
      >
        <Switch
          id="demo-flight-mode"
          label="Airplane Mode"
          checked={airplaneMode}
          onChange={setAirplaneMode}
        />
      </DocExample>

      {/* Interactive Button Example */}
      <DocExample
        id="wc-button-example"
        title="Interactive Button Example"
        description="Custom elements support all variants, keyboard navigation, and loading states."
        snippets={[
          {
            label: 'Web Component (HTML)',
            language: 'html',
            code: `<!-- Primary and secondary buttons -->
<a11y-button variant="primary">Save Changes</a11y-button>
<a11y-button variant="secondary">Cancel</a11y-button>

<!-- Accessible loading button -->
<a11y-button variant="primary" loading>Saving...</a11y-button>`,
          },
          {
            label: 'React',
            language: 'tsx',
            code: `import { Button } from '@a11ypros/a11y-ui-components';

<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="primary" loading={isLoading}>Saving...</Button>`,
          },
        ]}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" loading={loading} onClick={handleAction}>
            {loading ? 'Saving...' : 'Click to Load'}
          </Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </DocExample>

      {/* Framework Integration Section */}
      <section aria-labelledby="frameworks-title" className="doc-section">
        <h2 id="frameworks-title">Using with Your Favorite Framework</h2>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Vue 3</h3>
        <p>
          Tell Vite/Vue to recognize <code>&lt;a11y-*&gt;</code> tags as custom elements in your{' '}
          <code>vite.config.ts</code>:
        </p>
        <pre className="code-block">
          <code>{`import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('a11y-'),
        },
      },
    }),
  ],
};`}</code>
        </pre>
        <p style={{ marginTop: '0.75rem' }}>Then use it directly in any Vue template:</p>
        <pre className="code-block">
          <code>{`<template>
  <a11y-switch :checked="isEnabled" @change="onToggle" label="Dark Mode" />
  <a11y-button variant="primary" :loading="isSubmitting">Submit</a11y-button>
</template>`}</code>
        </pre>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Svelte</h3>
        <p>Svelte supports custom elements natively. Import the package once and use the tags:</p>
        <pre className="code-block">
          <code>{`<script>
  import '@a11ypros/a11y-ui-elements';
  let checked = false;
</script>

<a11y-switch label="Notifications" {checked} on:change={(e) => checked = e.detail.checked} />`}</code>
        </pre>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>React 19</h3>
        <p>
          React 19 includes native custom element support, automatically passing properties,
          attributes, and listening to custom events:
        </p>
        <pre className="code-block">
          <code>{`import '@a11ypros/a11y-ui-elements';

export function Settings() {
  return (
    <a11y-switch
      label="Sound Effects"
      checked={true}
      onChange={(e) => console.log(e.detail.checked)}
    />
  );
}`}</code>
        </pre>
      </section>
    </article>
  );
}
