import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Present sortable and selectable tabular data with semantic markup and assistive technology support using the A11Y UI Data Table component.';
const slug = 'components/table';

export const metadata: Metadata = createDocMetadata({
  title: 'Data Table Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Data Table',
    description,
    slug: 'table',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
