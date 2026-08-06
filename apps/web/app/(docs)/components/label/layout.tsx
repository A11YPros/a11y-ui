import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Apply explicit, accessible labeling patterns with the Label component, including required indicators and control association guidance.';
const slug = 'components/label';

export const metadata: Metadata = createDocMetadata({
  title: 'Label Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Label',
    description,
    slug: 'label',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
