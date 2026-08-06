import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Implement accessible modal dialogs with focus management, keyboard handling, and close behavior using the A11Y UI Modal component.';
const slug = 'components/modal';

export const metadata: Metadata = createDocMetadata({
  title: 'Modal Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Modal',
    description,
    slug: 'modal',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
