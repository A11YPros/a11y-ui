'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  Button,
  Input,
  Banner,
  Accordion,
  AccordionItem,
  Tabs,
} from '@a11ypros/a11y-ui-components';

interface ThemePreset {
  name: string;
  primary: string;
  primaryHover: string;
  radius: string;
  font: string;
}

const PRESETS: Record<string, ThemePreset> = {
  default: {
    name: 'A11Y Sky (Default)',
    primary: '#0369a1',
    primaryHover: '#075985',
    radius: '0.375rem',
    font: 'inherit',
  },
  indigo: {
    name: 'Royal Indigo',
    primary: '#4338ca',
    primaryHover: '#3730a3',
    radius: '0.5rem',
    font: 'inherit',
  },
  emerald: {
    name: 'Emerald Forest',
    primary: '#047857',
    primaryHover: '#065f46',
    radius: '0.75rem',
    font: 'inherit',
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#c2410c',
    primaryHover: '#9a3412',
    radius: '0.5rem',
    font: 'inherit',
  },
  sharp: {
    name: 'Sharp Brutalist',
    primary: '#1d4ed8',
    primaryHover: '#1e40af',
    radius: '0px',
    font: 'monospace',
  },
};

function getOptimalTextColor(hex: string): string {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return '#ffffff';
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const lum = a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  const contrastWithWhite = 1.05 / (lum + 0.05);
  const contrastWithDark = (lum + 0.05) / 0.068;
  return contrastWithWhite >= contrastWithDark ? '#ffffff' : '#171717';
}

export default function ThemingGuidePage() {
  const [primaryColor, setPrimaryColor] = useState('#0369a1');
  const [primaryHoverColor, setPrimaryHoverColor] = useState('#075985');
  const [radius, setRadius] = useState('0.375rem');
  const [fontFamily, setFontFamily] = useState('inherit');
  const [copied, setCopied] = useState(false);

  const applyPreset = (key: string) => {
    const preset = PRESETS[key];
    if (preset) {
      setPrimaryColor(preset.primary);
      setPrimaryHoverColor(preset.primaryHover);
      setRadius(preset.radius);
      setFontFamily(preset.font);
    }
  };

  const primaryFg = useMemo(() => getOptimalTextColor(primaryColor), [primaryColor]);

  const previewStyle = useMemo(
    () =>
      ({
        '--a11y-color-primary': primaryColor,
        '--a11y-color-primary-hover': primaryHoverColor,
        '--a11y-color-primary-fg': primaryFg,
        '--a11y-color-info': primaryColor,
        '--banner-info-border': primaryColor,
        '--banner-info-bg': `color-mix(in srgb, ${primaryColor} 18%, var(--color-background-default, #ffffff))`,
        '--a11y-radius': radius,
        '--a11y-radius-lg': radius === '9999px' ? '9999px' : radius === '0px' ? '0px' : `calc(${radius} * 1.33)`,
        '--a11y-font-sans': fontFamily === 'monospace' ? 'Menlo, monospace' : 'inherit',
      }) as React.CSSProperties,
    [primaryColor, primaryHoverColor, primaryFg, radius, fontFamily]
  );

  const generatedCss = `:root {
  /* Brand Colors */
  --a11y-color-primary: ${primaryColor};
  --a11y-color-primary-hover: ${primaryHoverColor};

  /* Corner Radius Scale */
  --a11y-radius: ${radius};

  /* Typography */
  --a11y-font-sans: ${fontFamily === 'monospace' ? 'Menlo, Monaco, monospace' : 'inherit'};
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-current="page">Theming Guide</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Theming & Customization</h1>
        <p>
          Learn how to re-skin `@a11ypros/a11y-ui-components` to match your company&apos;s brand,
          design system, and aesthetic using our 3-tier CSS Custom Property architecture.
        </p>
      </header>

      {/* Live Studio Section */}
      <section aria-labelledby="live-customizer-title" className="doc-section">
        <h2 id="live-customizer-title">Live Theme Studio</h2>
        <p>
          Customize the tokens below to preview the changes in real-time across multiple components,
          then copy the generated CSS tokens into your application.
        </p>

        {/* WCAG Contrast Requirement Banner */}
        <div style={{ marginBlock: '1.25rem' }}>
          <Banner variant="warning" title="WCAG Color Contrast Requirements">
            When customizing colors for your brand, ensure your color combinations meet WCAG contrast ratios:
            <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0 }}>
              <li><strong>4.5:1 minimum</strong> for body and component text against its background (WCAG 1.4.3 Level AA).</li>
              <li><strong>3:1 minimum</strong> for graphical objects, icons, focus rings, and interactive UI component boundaries (WCAG 1.4.11).</li>
            </ul>
          </Banner>
        </div>

        {/* Theme Presets */}
        <div style={{ marginBlock: '1.25rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            Quick Presets:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                className="btn btn--secondary btn--sm"
                style={{
                  borderRadius: preset.radius === '9999px' ? '9999px' : '0.375rem',
                  borderColor: primaryColor === preset.primary ? primaryColor : undefined,
                  fontWeight: primaryColor === preset.primary ? 600 : 400,
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-background-secondary, #fafafa)',
            border: '1px solid var(--color-border-default, #e5e5e5)',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Primary Color Picker */}
          <div>
            <label
              htmlFor="primary-color-input"
              style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.375rem' }}
            >
              Primary Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id="primary-color-input"
                type="color"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  setPrimaryHoverColor(e.target.value);
                }}
                style={{ width: '36px', height: '36px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                aria-label="Primary color hex value"
                style={{
                  padding: '0.375rem 0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary, #171717)',
                  backgroundColor: 'var(--color-background-default, #ffffff)',
                  border: '1px solid var(--color-border-default, #ccc)',
                  borderRadius: '4px',
                  width: '100px',
                }}
              />
            </div>
          </div>

          {/* Primary Hover Color Picker */}
          <div>
            <label
              htmlFor="primary-hover-input"
              style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.375rem' }}
            >
              Primary Hover Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id="primary-hover-input"
                type="color"
                value={primaryHoverColor}
                onChange={(e) => setPrimaryHoverColor(e.target.value)}
                style={{ width: '36px', height: '36px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={primaryHoverColor}
                onChange={(e) => setPrimaryHoverColor(e.target.value)}
                aria-label="Primary hover color hex value"
                style={{
                  padding: '0.375rem 0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary, #171717)',
                  backgroundColor: 'var(--color-background-default, #ffffff)',
                  border: '1px solid var(--color-border-default, #ccc)',
                  borderRadius: '4px',
                  width: '100px',
                }}
              />
            </div>
          </div>

          {/* Corner Radius Selector */}
          <div>
            <label
              htmlFor="radius-select"
              style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.375rem' }}
            >
              Corner Radius
            </label>
            <select
              id="radius-select"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-primary, #171717)',
                backgroundColor: 'var(--color-background-default, #ffffff)',
                border: '1px solid var(--color-border-default, #ccc)',
                borderRadius: '4px',
              }}
            >
              <option value="0px">Sharp (0px)</option>
              <option value="0.25rem">Subtle (4px)</option>
              <option value="0.375rem">Default (6px)</option>
              <option value="0.5rem">Rounded (8px)</option>
              <option value="0.75rem">Curved (12px)</option>
              <option value="9999px">Pill (9999px)</option>
            </select>
          </div>

          {/* Font Family Selector */}
          <div>
            <label
              htmlFor="font-select"
              style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.375rem' }}
            >
              Font Family
            </label>
            <select
              id="font-select"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-primary, #171717)',
                backgroundColor: 'var(--color-background-default, #ffffff)',
                border: '1px solid var(--color-border-default, #ccc)',
                borderRadius: '4px',
              }}
            >
              <option value="inherit">Sans-serif (System / Inter)</option>
              <option value="monospace">Monospace (Code / Brutalist)</option>
            </select>
          </div>
        </div>

        {/* Live Interactive Preview Box */}
        <div
          style={{
            ...previewStyle,
            padding: '2rem',
            border: '2px dashed var(--color-border-focus, #0ea5e9)',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--color-background-default, #ffffff)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ marginBottom: '1rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary, #666)' }}>
            Live Rendered Output:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="ghost">Ghost Action</Button>
              <Button variant="danger">Danger Action</Button>
            </div>

            {/* Input and Banner */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <Input
                label="Customized Input"
                placeholder="Type something here..."
                helperText="Notice the corner radius and focus colors."
              />
              <Banner
                variant="info"
                title="Branded Information Banner"
                style={{ '--banner-info-bg': `color-mix(in srgb, ${primaryColor} 20%, var(--color-background-default, #171717))` } as React.CSSProperties}
              >
                Banners inherit the corner radius and custom semantic variables seamlessly.
              </Banner>
            </div>

            {/* Accordion and Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <Accordion>
                <AccordionItem id="accordion-1" title="Accessible Accordion Item 1">
                  This accordion panel inherits all active brand tokens.
                </AccordionItem>
                <AccordionItem id="accordion-2" title="Accessible Accordion Item 2">
                  Corner radii and hover states adapt dynamically.
                </AccordionItem>
              </Accordion>

              <Tabs
                aria-label="Theme Preview Tabs"
                items={[
                  {
                    id: 'tab-1',
                    label: 'Active Tab',
                    content: <p style={{ margin: 0 }}>Active tab underline and text color match your primary brand color.</p>,
                  },
                  {
                    id: 'tab-2',
                    label: 'Second Tab',
                    content: <p style={{ margin: 0 }}>Tabs are keyboard navigable (Arrow keys).</p>,
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Copy CSS Code Box */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Generated CSS Tokens:</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="btn btn--secondary btn--sm"
              aria-label="Copy generated CSS tokens to clipboard"
            >
              {copied ? '✓ Copied to Clipboard!' : 'Copy CSS Tokens'}
            </button>
          </div>
          <pre className="code-block" style={{ margin: 0 }}>
            <code>{generatedCss}</code>
          </pre>
        </div>
      </section>

      {/* 3-Tier Theming System Architecture */}
      <section aria-labelledby="theming-tiers-title" className="doc-section">
        <h2 id="theming-tiers-title">The 3-Tier Theming Architecture</h2>
        <p>
          Our components are built with standard CSS Custom Properties organized in three tiers so
          you can customize at whatever level of granularity you need:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBlock: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid var(--color-border-default, #e5e5e5)', borderRadius: '0.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Tier 1: Global Brand Tokens (<code>--a11y-*</code>)</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Define these on <code>:root</code> or a container element. They cascade down to all components automatically.
              Adjusting <code>--a11y-color-primary</code> or <code>--a11y-radius</code> instantly re-skins the entire library.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--color-border-default, #e5e5e5)', borderRadius: '0.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Tier 2: Component-Scoped Tokens (<code>--btn-*</code>, <code>--input-*</code>, etc.)</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Target specific component types without affecting others. For example, set <code>.btn &#123; --btn-radius: 9999px; &#125;</code> to make buttons pill-shaped while keeping inputs standard rounded.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--color-border-default, #e5e5e5)', borderRadius: '0.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Tier 3: Instance &amp; Tailwind Overrides</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Pass inline <code>style</code> props or Tailwind <code>className</code> utilities directly to component instances for one-off tweaks.
            </p>
          </div>
        </div>
      </section>

      {/* Global Tokens Reference */}
      <section aria-labelledby="tokens-reference-title" className="doc-section">
        <h2 id="tokens-reference-title">Global Token Reference</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="props-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Default (Light)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--a11y-color-primary</code></td>
                <td><code>#0369a1</code></td>
                <td>Main brand color used for primary buttons, active tabs, check states.</td>
              </tr>
              <tr>
                <td><code>--a11y-color-primary-hover</code></td>
                <td><code>#075985</code></td>
                <td>Darker shade for hover interactions.</td>
              </tr>
              <tr>
                <td><code>--a11y-color-primary-fg</code></td>
                <td><code>#ffffff</code></td>
                <td>Foreground text color on primary backgrounds (ensures contrast).</td>
              </tr>
              <tr>
                <td><code>--a11y-radius</code></td>
                <td><code>0.375rem</code> (6px)</td>
                <td>Universal base corner radius for buttons, inputs, tables, fieldsets.</td>
              </tr>
              <tr>
                <td><code>--a11y-radius-lg</code></td>
                <td><code>0.5rem</code> (8px)</td>
                <td>Larger corner radius for modals, banners, accordions.</td>
              </tr>
              <tr>
                <td><code>--a11y-color-focus</code></td>
                <td><code>#0ea5e9</code></td>
                <td>Focus visible ring color (WCAG 2.4.7 / 2.4.11 compliant).</td>
              </tr>
              <tr>
                <td><code>--a11y-focus-width</code></td>
                <td><code>2px</code></td>
                <td>Thickness of the keyboard focus ring.</td>
              </tr>
              <tr>
                <td><code>--a11y-font-sans</code></td>
                <td>System font stack</td>
                <td>Primary font family for all UI components.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Component Tokens Reference */}
      <section aria-labelledby="component-tokens-title" className="doc-section">
        <h2 id="component-tokens-title">Component-Scoped Variables</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="props-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Available Custom Properties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Button</strong></td>
                <td>
                  <code>--btn-radius</code>, <code>--btn-primary-bg</code>, <code>--btn-primary-fg</code>,{' '}
                  <code>--btn-secondary-bg</code>, <code>--btn-danger-bg</code>, <code>--btn-font-family</code>
                </td>
              </tr>
              <tr>
                <td><strong>Input / Textarea / Select</strong></td>
                <td>
                  <code>--input-bg</code>, <code>--input-color</code>, <code>--input-border-color</code>,{' '}
                  <code>--input-radius</code>, <code>--input-focus-border</code>, <code>--input-focus-ring</code>
                </td>
              </tr>
              <tr>
                <td><strong>Modal</strong></td>
                <td>
                  <code>--modal-bg</code>, <code>--modal-radius</code>, <code>--modal-shadow</code>,{' '}
                  <code>--modal-backdrop-bg</code>, <code>--modal-border-color</code>
                </td>
              </tr>
              <tr>
                <td><strong>Banner</strong></td>
                <td>
                  <code>--banner-radius</code>, <code>--banner-info-bg</code>, <code>--banner-info-border</code>,{' '}
                  <code>--banner-success-bg</code>, <code>--banner-warning-bg</code>, <code>--banner-error-bg</code>
                </td>
              </tr>
              <tr>
                <td><strong>Tabs</strong></td>
                <td>
                  <code>--tabs-active-color</code>, <code>--tabs-active-border-color</code>, <code>--tabs-border-color</code>
                </td>
              </tr>
              <tr>
                <td><strong>Accordion</strong></td>
                <td>
                  <code>--accordion-bg</code>, <code>--accordion-radius</code>, <code>--accordion-header-hover-bg</code>
                </td>
              </tr>
              <tr>
                <td><strong>DataTable</strong></td>
                <td>
                  <code>--table-radius</code>, <code>--table-border-color</code>, <code>--table-header-bg</code>,{' '}
                  <code>--table-row-hover-bg</code>, <code>--table-selected-bg</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* WCAG Contrast Compliance Guide */}
      <section aria-labelledby="wcag-compliance-title" className="doc-section">
        <h2 id="wcag-compliance-title">WCAG Color Contrast &amp; Accessibility Requirements</h2>
        <p>
          While <code>@a11ypros/a11y-ui-components</code> comes with fully accessible defaults, overriding design tokens with your own custom brand palette requires adhering to WCAG 2.1 Level AA color contrast requirements:
        </p>

        <div style={{ overflowX: 'auto', marginBlock: '1rem' }}>
          <table className="props-table">
            <thead>
              <tr>
                <th>Element Type</th>
                <th>WCAG Criterion</th>
                <th>Minimum Contrast Ratio</th>
                <th>Description &amp; Scope</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Body &amp; UI Text</strong></td>
                <td>1.4.3 Contrast (Minimum)</td>
                <td><code>4.5:1</code> (Level AA)</td>
                <td>Applies to all normal body copy, button labels, input placeholders, tabs, and table cell content.</td>
              </tr>
              <tr>
                <td><strong>Large Text</strong></td>
                <td>1.4.3 Contrast (Minimum)</td>
                <td><code>3:1</code> (Level AA)</td>
                <td>Applies to large text at or above 18pt (24px) or bold text at or above 14pt (18.66px).</td>
              </tr>
              <tr>
                <td><strong>Interactive Elements &amp; UI Components</strong></td>
                <td>1.4.11 Non-text Contrast</td>
                <td><code>3:1</code> (Level AA)</td>
                <td>Applies to interactive component borders (input outlines, checkboxes, radios), icons, and state boundaries.</td>
              </tr>
              <tr>
                <td><strong>Focus Rings &amp; Indicators</strong></td>
                <td>2.4.11 Focus Appearance</td>
                <td><code>3:1</code> (Level AA)</td>
                <td>Ensure <code>--a11y-color-focus</code> has at least 3:1 contrast against adjacent background colors.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Scoped Theming Example */}
      <section aria-labelledby="scoped-theming-title" className="doc-section">
        <h2 id="scoped-theming-title">Scoped / Multi-Tenant Theming</h2>
        <p>
          Because our theming uses standard CSS custom properties, you can create multi-tenant or
          section-specific themes simply by applying a CSS class:
        </p>
        <pre className="code-block">
          <code>{`/* globals.css */
.tenant-marketing {
  --a11y-color-primary: #8b5cf6; /* Purple */
  --a11y-radius: 9999px;         /* Pill buttons */
}

.tenant-dashboard {
  --a11y-color-primary: #0284c7; /* Sky */
  --a11y-radius: 4px;            /* Subtle corners */
}`}</code>
        </pre>
      </section>
    </article>
  );
}
