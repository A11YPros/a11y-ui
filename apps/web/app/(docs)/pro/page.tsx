import Link from 'next/link';
import { ProWaitlistSection } from '../../_components/ProWaitlistSection';

export default function ProPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-current="page">Pro Tier</span>
          </li>
        </ol>
      </nav>

      <ProWaitlistSection />
    </article>
  );
}
