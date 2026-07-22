import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Accordion Component | A11Y UI',
  description:
    'Learn how to use the accessible Accordion component with keyboard-friendly disclosure behavior, semantic structure, and practical usage examples.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
