import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';
import { JsonLd, createGuideJsonLd } from '../../_components/JsonLd';

const title = 'Getting Started | A11Y UI';
const description =
  'Install A11Y UI, set up styles, and build your first accessible interface with step-by-step examples for production React projects.';
const slug = 'getting-started';

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
