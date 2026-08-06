import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';

export const metadata: Metadata = createDocMetadata({
  title: 'Custom Accessible Component Development | A11Y UI',
  description:
    'Need custom WCAG 2.2 AA accessible React components for your project? Request bespoke component development tailored to your design system.',
  slug: 'custom-components',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
