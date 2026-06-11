import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link href="/components">Components</Link>
          </li>
        </ul>
      </nav>
      <h1>Accessible Design System</h1>
      <p>Welcome to the accessible design system documentation.</p>
    </main>
  );
}
