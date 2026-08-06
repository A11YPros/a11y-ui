import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';
import { JsonLd, createGuideJsonLd } from '../../_components/JsonLd';

const title = 'Accessibility Principles | A11Y UI';
const description =
  'Review the accessibility principles behind A11Y UI, including semantic HTML, keyboard support, screen-reader behavior, and practical testing guidance.';
const slug = 'accessibility';

export const metadata: Metadata = createDocMetadata({
  title,
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createGuideJsonLd({
    title,
    description,
    slug,
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
