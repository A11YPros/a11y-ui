import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';
import { JsonLd, createGuideJsonLd } from '../../_components/JsonLd';

const title = 'Theming Guide & Live Customizer | A11Y UI';
const description =
  'Re-skin A11Y UI components to match your design system using 3-tier CSS Custom Properties, global tokens, and our interactive live theme studio.';
const slug = 'theming';

export const metadata: Metadata = createDocMetadata({
  title,
  description,
  slug,
});

export default function Layout({ children }: { children: ReactNode }) {
  const jsonLdData = createGuideJsonLd({
    title,
    description,
    slug,
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
