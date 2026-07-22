import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Textarea Component | A11Y UI',
  description:
    'Capture multi-line user input with accessible labeling, helper text, validation messaging, and optional character count using Textarea.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
