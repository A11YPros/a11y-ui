'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Modal, Button } from '@a11ypros/a11y-ui-components';
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { modalApi } from '../api-reference-data';

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

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
            <span aria-current="page">Modal</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Modal</h1>
        <p>Display focused dialogs for flows that require immediate attention.</p>
      </header>

      <DocExample
        id="modal-example-title"
        title="Example"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Modal/Modal.tsx"
        code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
  <p>This is a modal dialog. Press ESC to close or click outside.</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>`}
      >
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
          <p>This is a modal dialog. Press ESC to close or click outside.</p>
          <div className="example-row example-row--spaced">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </DocExample>

      <ApiReference sections={modalApi} />

      <section aria-labelledby="modal-a11y-title" className="doc-section">
        <h2 id="modal-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: ESC key support, focus trap</li>
          <li>WCAG 2.1.2 No Keyboard Trap: Focus returns to trigger</li>
          <li>WCAG 2.4.3 Focus Order: Focus trapped within modal</li>
          <li>WCAG 4.1.2 Name, Role, Value: ARIA modal pattern</li>
        </ul>
      </section>

      <section aria-labelledby="modal-playground-title" className="doc-section">
        <h2 id="modal-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-modal--default"
        >
          Open Modal stories
        </a>
      </section>
    </article>
  );
}
