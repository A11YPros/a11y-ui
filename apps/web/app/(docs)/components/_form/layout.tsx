import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Form Components | A11Y UI',
  description:
    'Explore accessible form building blocks in A11Y UI, including input, textarea, select, checkbox, radio, and fieldset composition patterns.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
