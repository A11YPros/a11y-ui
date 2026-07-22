'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import packageMeta from '../../../../../packages/design-system/package.json';
import { componentDocs } from '../components/component-docs';
import { ThemeToggle } from '../../_components/ThemeToggle';

interface NavLink {
  href: string;
  label: string;
  startsWith?: string;
  external?: boolean;
  icon?: 'github' | 'npm';
}

const headerLinks: NavLink[] = [
  {
    href: 'https://github.com/A11YPros/a11y-ui',
    label: 'GitHub',
    external: true,
    icon: 'github',
  },
  {
    href: 'https://www.npmjs.com/package/@a11ypros/a11y-ui-components',
    label: 'NPM',
    external: true,
    icon: 'npm',
  },
];

const guideLinks: NavLink[] = [{ href: '/getting-started', label: 'Getting Started' }];
const NPM_VERSION = packageMeta.version;

const resourceLinks: NavLink[] = [
  { href: '/accessibility', label: 'Accessibility Guide' },
];

function isActive(pathname: string, href: string, startsWith?: string): boolean {
  if (startsWith) {
    return pathname === startsWith || pathname.startsWith(`${startsWith}/`);
  }

  return pathname === href;
}

function HeaderLinkIcon({ icon }: { icon?: 'github' | 'npm' }) {
  if (icon === 'github') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" focusable="false">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.47v-1.67c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.64.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.59 9.59 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.21 2.4.11 2.65.64.7 1.02 1.59 1.02 2.68 0 3.84-2.33 4.69-4.56 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.47A10 10 0 0 0 12 2Z"
        />
      </svg>
    );
  }

  if (icon === 'npm') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" focusable="false">
        <path
          fill="currentColor"
          d="M2 7.5v9h20v-9H2Zm18.5 7.5H19v-6H3.5v6H2V9h18.5v6Z"
        />
      </svg>
    );
  }

  return null;
}

export function DocsHeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="docs-header__nav">
	  <ul className="docs-header__nav-list">
	      {headerLinks.map((link) => {
	        const active = isActive(pathname, link.href, link.startsWith);
	        return (
	          <li key={link.href}>
              {link.external && link.icon === 'npm' ? (
                <a
                  className="HeaderLink"
                  href={link.href}
                  rel="noopener"
                  aria-label={`npm version ${NPM_VERSION}`}
                >
                  <svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <rect width="16" height="16" fill="black"></rect>
                    <rect x="3" y="3" width="10" height="10" fill="white"></rect>
                    <path d="M8 5H11V13H8V5Z" fill="black"></path>
                  </svg>
                  {NPM_VERSION}
                </a>
              ) : link.external ? (
                <a className="HeaderLink" href={link.href} target="_blank" rel="noopener noreferrer">
                  <HeaderLinkIcon icon={link.icon} />{' '}
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} aria-current={active ? 'page' : undefined}>
                  {link.label}
                </Link>
              )}
	          </li>
	        );
	      })}
	      <li>
	        <ThemeToggle className="docs-theme-toggle" />
	      </li>
	  </ul>
    </nav>
  );
}

export function DocsSidebarNav() {
  const pathname = usePathname();
  const sortedComponentDocs = [...componentDocs].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <nav aria-label="Documentation" className="docs-sidebar__nav">
      <p className="docs-sidebar__heading">Guides</p>
      <ul>
        {guideLinks.map((link) => {
          const active = isActive(pathname, link.href, link.startsWith);
          return (
            <li key={link.href}>
              <Link href={link.href} aria-current={active ? 'page' : undefined}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="docs-sidebar__heading">Components</p>
      <ul>
        {sortedComponentDocs.map((item) => {
          const href = `/components/${item.slug}`;
          const active = isActive(pathname, href);
          return (
            <li key={item.slug}>
              <Link href={href} aria-current={active ? 'page' : undefined}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="docs-sidebar__heading">Resources</p>
      <ul>
        {resourceLinks.map((link) => {
          const active = isActive(pathname, link.href, link.startsWith);
          return (
            <li key={link.href}>
              <Link href={link.href} aria-current={active ? 'page' : undefined}>
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          <a href="/storybook-static/index.html">Storybook Playground</a>
        </li>
      </ul>
    </nav>
  );
}
