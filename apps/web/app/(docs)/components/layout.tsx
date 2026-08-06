import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';
import { JsonLd, createGuideJsonLd } from '../../_components/JsonLd';

const title = 'Components Library | A11Y UI';
const description =
  'Browse all A11Y UI components with implementation examples, accessibility notes, and links to interactive Storybook playground demos.';
const slug = 'components';

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
