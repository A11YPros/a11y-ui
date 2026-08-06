import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Build accessible checkbox interactions with labels, helper text, validation states, and controlled behavior using the A11Y UI Checkbox component.';
const slug = 'components/checkbox';

export const metadata: Metadata = createDocMetadata({
  title: 'Checkbox Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Checkbox',
    description,
    slug: 'checkbox',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
