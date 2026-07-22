import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Data Table Component | A11Y UI',
  description:
    'Present sortable and selectable tabular data with semantic markup and assistive technology support using the A11Y UI Data Table component.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
