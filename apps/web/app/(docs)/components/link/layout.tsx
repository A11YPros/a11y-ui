import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Link Component | A11Y UI',
  description:
    'Use the accessible Link component for internal navigation, external destinations, and skip-link patterns with semantic anchor behavior.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
