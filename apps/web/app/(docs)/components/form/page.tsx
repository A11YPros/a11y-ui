'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Fieldset,
} from '@a11ypros/a11y-ui-components';

export default function FormPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [agree, setAgree] = useState(false);
  const [size, setSize] = useState('');

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
            <span aria-current="page">Form</span>
          </li>
        </ol>
      </nav>

      <header className="doc-page__header">
        <h1>Form components</h1>
        <p>Compose labeled, keyboard-friendly form controls with consistent field semantics.</p>
      </header>

      <section aria-labelledby="form-input-title" className="doc-section">
        <h2 id="form-input-title">Input</h2>
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </section>

      <section aria-labelledby="form-textarea-title" className="doc-section">
        <h2 id="form-textarea-title">Textarea</h2>
        <Textarea
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          showCount
        />
      </section>

      <section aria-labelledby="form-select-title" className="doc-section">
        <h2 id="form-select-title">Select</h2>
        <Select
          label="Country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
          ]}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </section>

      <section aria-labelledby="form-checkbox-title" className="doc-section">
        <h2 id="form-checkbox-title">Checkbox</h2>
        <Checkbox
          id="agree"
          label="I agree to the terms and conditions"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
      </section>

      <section aria-labelledby="form-radio-title" className="doc-section">
        <h2 id="form-radio-title">Radio</h2>
        <Radio
          name="size"
          label="Size"
          options={[
            { value: 's', label: 'Small' },
            { value: 'm', label: 'Medium' },
            { value: 'l', label: 'Large' },
          ]}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </section>

      <section aria-labelledby="form-fieldset-title" className="doc-section">
        <h2 id="form-fieldset-title">Fieldset and label</h2>
        <Fieldset legend="Newsletter preferences">
          <Select
            id="news-email"
            label="Email frequency"
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Fieldset>
      </section>

      <section aria-labelledby="form-a11y-title" className="doc-section">
        <h2 id="form-a11y-title">Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1 Info and Relationships: Proper label-input association</li>
          <li>WCAG 2.5.3 Label in Name: Label text matches accessible name</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
          <li>WCAG 4.1.3 Status Messages: Error messages announced</li>
        </ul>
      </section>

      <section aria-labelledby="form-playground-title" className="doc-section">
        <h2 id="form-playground-title">Playground</h2>
        <a
          className="playground-link"
          href="/storybook-static/index.html?path=/story/components-form-input--default"
        >
          Open Form stories
        </a>
      </section>
    </article>
  );
}
