import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';

export const metadata: Metadata = createDocMetadata({
  title: 'Accessibility Principles | A11Y UI',
  description:
    'Review the accessibility principles behind A11Y UI, including semantic HTML, keyboard support, screen-reader behavior, and practical testing guidance.',
  slug: 'accessibility',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
