import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Desktop-style application menu bars following the WAI-ARIA Menubar pattern with composite roving tabindex and inter-menu keyboard navigation.';
const slug = 'components/menubar';

export const metadata: Metadata = createDocMetadata({
  title: 'Menubar Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Menubar',
    description,
    slug: 'menubar',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
