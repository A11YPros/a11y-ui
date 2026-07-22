import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Input Component | A11Y UI',
  description:
    'Create accessible single-line text inputs with labels, helper text, validation messaging, and proper form semantics using the Input component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
