import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Components Library | A11Y UI',
  description:
    'Browse all A11Y UI components with implementation examples, accessibility notes, and links to interactive Storybook playground demos.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
