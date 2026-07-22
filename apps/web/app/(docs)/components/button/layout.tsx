import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Button Component | A11Y UI',
  description:
    'Implement accessible buttons with variants, sizes, loading states, and robust keyboard and screen-reader behavior using the A11Y UI Button component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
