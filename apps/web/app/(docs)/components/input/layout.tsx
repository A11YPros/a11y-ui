import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Create accessible single-line text inputs with labels, helper text, validation messaging, and proper form semantics using the Input component.';
const slug = 'components/input';

export const metadata: Metadata = createDocMetadata({
  title: 'Input Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Input',
    description,
    slug: 'input',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
