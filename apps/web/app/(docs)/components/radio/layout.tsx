import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Build accessible single-choice radio groups with proper labeling, helper text, and validation states using the A11Y UI Radio component.';
const slug = 'components/radio';

export const metadata: Metadata = createDocMetadata({
  title: 'Radio Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Radio',
    description,
    slug: 'radio',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
