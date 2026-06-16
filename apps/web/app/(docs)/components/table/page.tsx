'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DataTable } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { dataTableApi } from '../api-reference-data';

const sampleData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
];

export default function TablePage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<
    { column: string; direction: 'asc' | 'desc' } | undefined
  >();

  return (
    <article className="doc-page">
      <nav aria-label="Breadcrumb" className="docs-breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/components">Components</Link>
          </li>
          <li>
            <span aria-current="page">Data Table</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Data Table</h1>
        <p>Present sortable, selectable tabular data with semantic table markup.</p>
      </header>

      <DocExample
        id="table-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/DataTable/DataTable.tsx"
        code={`import { useState } from 'react';
import { DataTable } from '@a11ypros/a11y-ui-components';

const sampleData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
];

export function Example() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' }>();

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      getRowId={(row) => row.id}
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      sortConfig={sortConfig}
      onSortChange={(column, direction) => setSortConfig({ column, direction })}
      caption="User list"
    />
  );
}`}
      >
        <DataTable
          data={sampleData}
          columns={columns}
          getRowId={(row) => row.id}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortConfig={sortConfig}
          onSortChange={(column, direction) => setSortConfig({ column, direction })}
          caption="User list"
        />
      </DocExample>

      <ApiReference sections={dataTableApi} />

      <section aria-labelledby="table-a11y-title" className="doc-section">
        <h2 id="table-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1 Info and Relationships: Semantic table structure</li>
          <li>WCAG 2.1.1 Keyboard: Arrow keys, Home/End navigation</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
          <li>WCAG 4.1.3 Status Messages: Sort announcements</li>
        </ul>
      </section>

      <section aria-labelledby="table-playground-title" className="doc-section">
        <h2 id="table-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-datatable--default"
        >
          Open Data Table stories
        </a>
      </section>
    </article>
  );
}
