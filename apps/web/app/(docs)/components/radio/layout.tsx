import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Radio Component | A11Y UI',
  description:
    'Build accessible single-choice radio groups with proper labeling, helper text, and validation states using the A11Y UI Radio component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
