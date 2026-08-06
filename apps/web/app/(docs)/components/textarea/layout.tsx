import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Capture multi-line user input with accessible labeling, helper text, validation messaging, and optional character count using Textarea.';
const slug = 'components/textarea';

export const metadata: Metadata = createDocMetadata({
  title: 'Textarea Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Textarea',
    description,
    slug: 'textarea',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
