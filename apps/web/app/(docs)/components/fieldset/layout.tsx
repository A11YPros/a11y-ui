import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fieldset Component | A11Y UI',
  description:
    'Group related form controls with clear legend context and semantic structure using the A11Y UI Fieldset component patterns.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
