import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Use the accessible Link component for internal navigation, external destinations, and skip-link patterns with semantic anchor behavior.';
const slug = 'components/link';

export const metadata: Metadata = createDocMetadata({
  title: 'Link Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Link',
    description,
    slug: 'link',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
