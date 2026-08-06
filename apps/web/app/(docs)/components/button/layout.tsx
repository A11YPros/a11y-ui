import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Implement accessible buttons with variants, sizes, loading states, and robust keyboard and screen-reader behavior using the A11Y UI Button component.';
const slug = 'components/button';

export const metadata: Metadata = createDocMetadata({
  title: 'Button Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Button',
    description,
    slug: 'button',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
