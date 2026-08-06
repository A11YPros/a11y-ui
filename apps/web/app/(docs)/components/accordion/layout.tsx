import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Learn how to use the accessible Accordion component with keyboard-friendly disclosure behavior, semantic structure, and practical usage examples.';
const slug = 'components/accordion';

export const metadata: Metadata = createDocMetadata({
  title: 'Accordion Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Accordion',
    description,
    slug: 'accordion',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
