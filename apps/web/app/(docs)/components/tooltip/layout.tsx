import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Accessible floating tooltip component with role="tooltip", aria-describedby association, hover and focus triggers, and Escape dismissal.';
const slug = 'components/tooltip';

export const metadata: Metadata = createDocMetadata({
  title: 'Tooltip Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Tooltip',
    description,
    slug: 'tooltip',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
