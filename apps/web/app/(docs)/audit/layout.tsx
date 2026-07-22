import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI Accessibility Audit Assistant | A11Y UI',
  description:
    'Run AI-assisted accessibility audits, review WCAG findings, and get remediation guidance for pages and components with the A11Y UI audit assistant.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
