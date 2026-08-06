import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createDocMetadata } from '../../_components/docMetadata';

export const metadata: Metadata = createDocMetadata({
  title: 'AI Accessibility Audit Assistant | A11Y UI',
  description:
    'Run AI-assisted accessibility audits, review WCAG findings, and get remediation guidance for pages and components with the A11Y UI audit assistant.',
  slug: 'audit',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
