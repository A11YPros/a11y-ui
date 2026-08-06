import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Build keyboard-friendly tab interfaces with clear panel relationships and accessible labeling using the A11Y UI Tabs component.';
const slug = 'components/tabs';

export const metadata: Metadata = createDocMetadata({
  title: 'Tabs Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Tabs',
    description,
    slug: 'tabs',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
