import React from 'react';

export interface ApiPropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  example?: string;
}

export interface ApiSectionDoc {
  name: string;
  props: ApiPropDoc[];
}

interface ApiReferenceProps {
  title?: string;
  sections: ApiSectionDoc[];
}

export function ApiReference({ title = 'API reference', sections }: ApiReferenceProps) {
  return (
    <section aria-labelledby="api-reference-title" className="doc-section api-reference">
      <h2 id="api-reference-title">{title}</h2>

      {sections.map((section) => (
        <div className="api-reference__group" key={section.name}>
          <h3 className="api-reference__group-title">{section.name}</h3>
          <div className="api-reference__header" aria-hidden="true">
            <span>Prop</span>
            <span>Type</span>
            <span>Default</span>
            <span className="api-reference__header-indicator" />
          </div>

          <div className="api-reference__rows">
            {section.props.map((prop) => (
              <details className="api-reference__row" key={`${section.name}-${prop.name}`}>
                <summary>
                  <span className="api-reference__cell api-reference__cell--prop">{prop.name}</span>
                  <span className="api-reference__cell api-reference__cell--type">{prop.type}</span>
                  <span className="api-reference__cell api-reference__cell--default">
                    {prop.defaultValue ?? '\u2014'}
                  </span>
                  <span className="api-reference__chevron" aria-hidden="true">
                    <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="api-reference__details">
                  <p>
                    <strong>Name:</strong> {prop.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {prop.description}
                  </p>
                  <p>
                    <strong>Type:</strong> <code>{prop.type}</code>
                  </p>
                  <p>
                    <strong>Default:</strong> {prop.defaultValue ?? '\u2014'}
                  </p>
                  {prop.example ? (
                    <div>
                      <strong>Example:</strong>
                      <pre className="code-block api-reference__example">
                        <code>{prop.example}</code>
                      </pre>
                    </div>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
