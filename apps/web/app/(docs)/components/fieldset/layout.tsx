import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Group related form controls with clear legend context and semantic structure using the A11Y UI Fieldset component patterns.';
const slug = 'components/fieldset';

export const metadata: Metadata = createDocMetadata({
  title: 'Fieldset Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Fieldset',
    description,
    slug: 'fieldset',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
