import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Checkbox Component | A11Y UI',
  description:
    'Build accessible checkbox interactions with labels, helper text, validation states, and controlled behavior using the A11Y UI Checkbox component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
