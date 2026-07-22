import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Getting Started | A11Y UI',
  description:
    'Install A11Y UI, set up styles, and build your first accessible interface with step-by-step examples for production React projects.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
