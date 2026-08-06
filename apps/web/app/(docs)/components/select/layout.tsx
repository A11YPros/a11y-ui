import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Use the Select component for accessible option lists with labels, placeholder handling, validation feedback, and native keyboard interaction.';
const slug = 'components/select';

export const metadata: Metadata = createDocMetadata({
  title: 'Select Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Select',
    description,
    slug: 'select',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
