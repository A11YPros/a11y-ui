import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';
import { JsonLd, createComponentJsonLd } from '../../../_components/JsonLd';

const description =
  'Accessible toggle switch component implementing role="switch", keyboard space toggling, and clear on/off accessible state announcements.';
const slug = 'components/switch';

export const metadata: Metadata = createDocMetadata({
  title: 'Switch Component | A11Y UI',
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createComponentJsonLd({
    name: 'Switch',
    description,
    slug: 'switch',
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
