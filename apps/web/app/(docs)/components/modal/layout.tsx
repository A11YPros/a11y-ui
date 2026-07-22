import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Modal Component | A11Y UI',
  description:
    'Implement accessible modal dialogs with focus management, keyboard handling, and close behavior using the A11Y UI Modal component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
