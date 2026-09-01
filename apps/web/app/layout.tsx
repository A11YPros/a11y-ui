import type { Metadata } from 'next';
import Script from 'next/script';
import { ClientElementsProvider } from './_components/ClientElementsProvider';
import './styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ui.a11ypros.com'),
  title: {
    default: 'A11Y UI - Accessibility-first React Components',
    template: '%s',
  },
  description:
    'Accessibility-first React components, patterns, and documentation built for production teams.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'A11Y UI - Accessibility-first React Components',
    description:
      'Build inclusive interfaces faster with WCAG compliant components, keyboard navigation, and screen reader support.',
    url: 'https://ui.a11ypros.com',
    siteName: 'A11Y UI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'A11Y UI - Accessibility-first React Components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A11Y UI - Accessibility-first React Components',
    description:
      'Build inclusive interfaces faster with WCAG compliant components, keyboard navigation, and screen reader support.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('a11y-ui-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();",
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W8QRH1S6R6"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-W8QRH1S6R6');`}
        </Script>
        <ClientElementsProvider />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
