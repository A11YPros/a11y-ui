import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';

export const metadata: Metadata = createDocMetadata({
  title: 'Pro Components & Waitlist | A11Y UI',
  description:
    'Preview upcoming enterprise Pro components (DatePicker, DataGrid, Multi-select Combobox, Rich Text Editor) and join the early access waitlist.',
  slug: 'pro',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
