import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tabs Component | A11Y UI',
  description:
    'Build keyboard-friendly tab interfaces with clear panel relationships and accessible labeling using the A11Y UI Tabs component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
