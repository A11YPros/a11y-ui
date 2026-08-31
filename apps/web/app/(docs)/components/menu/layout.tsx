import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Accessible dropdown action menus following the WAI-ARIA Menu Button pattern with roving focus, keyboard shortcuts, and focus restoration.';
const slug = 'components/menu';

export const metadata: Metadata = createDocMetadata({
  title: 'Menu Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Menu',
    description,
    slug: 'menu',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
