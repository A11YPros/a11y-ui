import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Banner Component | A11Y UI',
  description:
    'Use the Banner component for status messaging with semantic structure, live region support, variant styling, and optional dismiss actions.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
