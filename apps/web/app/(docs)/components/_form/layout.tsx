import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../../_components/docMetadata';

export const metadata: Metadata = createDocMetadata({
  title: 'Form Components | A11Y UI',
  description:
    'Explore accessible form building blocks in A11Y UI, including input, textarea, select, checkbox, radio, and fieldset composition patterns.',
  slug: 'components/form',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
