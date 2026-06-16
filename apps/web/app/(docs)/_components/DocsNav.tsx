'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { componentDocs } from '../components/component-docs';
import { ThemeToggle } from '../../_components/ThemeToggle';

interface NavLink {
  href: string;
  label: string;
  startsWith?: string;
}

const headerLinks: NavLink[] = [
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/components', label: 'Components', startsWith: '/components' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/changelog', label: 'Changelog' },
];

const guideLinks: NavLink[] = [{ href: '/getting-started', label: 'Getting Started' }];

const resourceLinks: NavLink[] = [
  { href: '/accessibility', label: 'Accessibility Guide' },
  { href: '/changelog', label: 'Changelog' },
];

function isActive(pathname: string, href: string, startsWith?: string): boolean {
  if (startsWith) {
    return pathname === startsWith || pathname.startsWith(`${startsWith}/`);
  }

  return pathname === href;
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
	            <Link href={link.href} aria-current={active ? 'page' : undefined}>
	              {link.label}
	            </Link>
	          </li>
	        );
	      })}
	      <li>
	        <a href="/storybook-static/index.html">Playground</a>
	      </li>
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
        <li>
          <a href="https://www.npmjs.com/package/@a11ypros/a11y-ui-components">NPM Package</a>
        </li>
      </ul>
    </nav>
  );
}
