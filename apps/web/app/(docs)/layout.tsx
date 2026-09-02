import Link from 'next/link';
import Image from 'next/image';
import { DocsHeaderNav, DocsSidebarNav } from './_components/DocsNav';
import { MobileNavDrawer } from './_components/MobileNavDrawer';
import { UiLogo } from '../_components/UiLogo';
import { FrameworkProvider } from './_components/FrameworkContext';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <FrameworkProvider>
      <div className="docs-shell">
      <header className="docs-header">
        <div className="docs-header__inner">
          <div className="docs-header__brand-group">
            <MobileNavDrawer />
            <Link href="/" className="docs-brand">
              <UiLogo className="docs-brand__logo" />
              <span className="visually-hidden">A11y UI</span>
            </Link>
          </div>
          <DocsHeaderNav />
        </div>
      </header>

      <div className="docs-content-wrap">
        <aside className="docs-sidebar" aria-label="Documentation sections">
          <DocsSidebarNav />
        </aside>

        <main id="main-content" tabIndex={-1} className="docs-main">
          {children}
        </main>
      </div>

      <footer className="docs-footer">
        <p className="docs-footer__tagline">Powered by A11Y Pros</p>
        <a
          href="https://a11ypros.com"
          className="docs-footer__brand-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit A11YPros"
        >
          <Image
            src="/logo.png"
            alt=""
            width={180}
            height={40}
            className="docs-footer__brand-image docs-footer__brand-image--light"
          />
          <Image
            src="/logo-dark.png"
            alt=""
            width={180}
            height={40}
            className="docs-footer__brand-image docs-footer__brand-image--dark"
          />
          <span className="visually-hidden">A11YPros</span>
        </a>
      </footer>
    </div>
    </FrameworkProvider>
  );
}
