import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Label Component | A11Y UI',
  description:
    'Apply explicit, accessible labeling patterns with the Label component, including required indicators and control association guidance.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
