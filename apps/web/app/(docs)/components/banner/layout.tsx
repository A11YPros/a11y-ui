import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Use the Banner component for status messaging with semantic structure, live region support, variant styling, and optional dismiss actions.';
const slug = 'components/banner';

export const metadata: Metadata = createDocMetadata({
  title: 'Banner Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Banner',
    description,
    slug: 'banner',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
