import Link from 'next/link';
import { CustomComponentCTA } from '../../_components/CustomComponentCTA';

export default function CustomComponentsPage() {
  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-current="page">Custom Component Development</span>
          </li>
        </ol>
      </nav>

      <CustomComponentCTA />
    </article>
  );
}
