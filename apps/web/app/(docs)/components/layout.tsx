import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';

export const metadata: Metadata = createDocMetadata({
  title: 'Components Library | A11Y UI',
  description:
    'Browse all A11Y UI components with implementation examples, accessibility notes, and links to interactive Storybook playground demos.',
  slug: 'components',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
