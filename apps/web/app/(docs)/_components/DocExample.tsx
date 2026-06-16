'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface DocExampleProps {
  id: string;
  title: string;
  code: string;
  language?: 'tsx' | 'ts' | 'jsx' | 'js' | 'css' | 'html' | 'json' | 'bash';
  githubUrl?: string;
  description?: string;
  children: ReactNode;
}

export function DocExample({
  id,
  title,
  code,
  language = 'tsx',
  githubUrl,
  description,
  children,
}: DocExampleProps) {
  const codeTitleId = `${id}-code-title`;
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    const root = document.documentElement;

    const getCurrentTheme = (): 'light' | 'dark' => {
      const value = root.getAttribute('data-theme');
      return value === 'dark' ? 'dark' : 'light';
    };

    setTheme(getCurrentTheme());

    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  const copyLabel = useMemo(() => {
    if (copyState === 'copied') {
      return 'Copied';
    }

    if (copyState === 'failed') {
      return 'Copy failed';
    }

    return 'Copy';
  }, [copyState]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      window.setTimeout(() => {
        setCopyState('idle');
      }, 1800);
    } catch {
      setCopyState('failed');
      window.setTimeout(() => {
        setCopyState('idle');
      }, 2200);
    }
  };

  return (
    <section aria-labelledby={id} className="doc-section doc-example">
      <h2 id={id}>{title}</h2>
      {description ? <p className="doc-example__description">{description}</p> : null}

      <div className="doc-example__preview" aria-label={`${title} preview`}>
        {children}
      </div>

      <div className="doc-example__code" role="group" aria-labelledby={codeTitleId}>
        <div className="doc-example__code-header">
          <h3 id={codeTitleId}>Code</h3>
          <div className="doc-example__actions">
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-example__github-button"
                aria-label={`View ${title} source on GitHub, opens in new window`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="doc-example__github-icon"
                  focusable="false"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.47v-1.67c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.64.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.59 9.59 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.21 2.4.11 2.65.64.7 1.02 1.59 1.02 2.68 0 3.84-2.33 4.69-4.56 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.47A10 10 0 0 0 12 2Z"
                  />
                </svg>
                <span>View on GitHub</span>
                <span aria-hidden="true" className="doc-example__external-indicator">
                  ↗
                </span>
                <span className="visually-hidden">opens in new window</span>
              </a>
            ) : null}

            <button
              type="button"
              className="doc-example__copy-button"
              onClick={handleCopy}
              aria-label={`Copy ${title} example code`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="doc-example__copy-icon"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M9 2.5A2.5 2.5 0 0 0 6.5 5v1H5A2.5 2.5 0 0 0 2.5 8.5v10A2.5 2.5 0 0 0 5 21h8a2.5 2.5 0 0 0 2.5-2.5V17H17a2.5 2.5 0 0 0 2.5-2.5v-10A2.5 2.5 0 0 0 17 2H9Zm0 1.5h8A1 1 0 0 1 18 5v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm-4 3.5h1.5v7A2.5 2.5 0 0 0 9 17h5v1.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
                />
              </svg>
              {copyLabel}
            </button>
          </div>
        </div>

        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          customStyle={{ margin: 0 }}
          className="code-block"
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>

        <p className="visually-hidden" aria-live="polite" aria-atomic="true">
          {copyState === 'copied' ? 'Code copied to clipboard.' : null}
          {copyState === 'failed' ? 'Copy failed. Please copy manually.' : null}
        </p>
      </div>
    </section>
  );
}
