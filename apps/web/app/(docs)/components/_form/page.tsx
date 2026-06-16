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
import { DocExample } from '../../_components/DocExample';
import { ApiReference } from '../../_components/ApiReference';
import { formOverviewApi } from '../api-reference-data';

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

      <DocExample
        id="form-input-title"
        title="Input"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Input.tsx"
        code={`<Input
  label="Email address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  required
/>`}
      >
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </DocExample>

      <DocExample
        id="form-textarea-title"
        title="Textarea"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Textarea.tsx"
        code={`<Textarea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  maxLength={500}
  showCount
/>`}
      >
        <Textarea
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          showCount
        />
      </DocExample>

      <DocExample
        id="form-select-title"
        title="Select"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Select.tsx"
        code={`<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  value={country}
  onChange={(e) => setCountry(e.target.value)}
/>`}
      >
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
      </DocExample>

      <DocExample
        id="form-checkbox-title"
        title="Checkbox"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Checkbox.tsx"
        code={`<Checkbox
  id="agree"
  label="I agree to the terms and conditions"
  checked={agree}
  onChange={(e) => setAgree(e.target.checked)}
/>`}
      >
        <Checkbox
          id="agree"
          label="I agree to the terms and conditions"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
      </DocExample>

      <DocExample
        id="form-radio-title"
        title="Radio"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Radio.tsx"
        code={`<Radio
  name="size"
  label="Size"
  options={[
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
  ]}
  value={size}
  onChange={(e) => setSize(e.target.value)}
/>`}
      >
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
      </DocExample>

      <DocExample
        id="form-fieldset-title"
        title="Fieldset and label"
        githubUrl="https://github.com/A11YPros/a11y-ui/blob/main/packages/design-system/src/components/Form/Fieldset.tsx"
        code={`<Fieldset legend="Newsletter preferences">
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
</Fieldset>`}
      >
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
      </DocExample>

      <ApiReference title="Form component APIs" sections={formOverviewApi} />

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
