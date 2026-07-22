import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Select Component | A11Y UI',
  description:
    'Use the Select component for accessible option lists with labels, placeholder handling, validation feedback, and native keyboard interaction.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
