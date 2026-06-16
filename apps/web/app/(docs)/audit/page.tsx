'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button } from '@a11ypros/a11y-ui-components';

// Dynamically import SyntaxHighlighter to avoid SSR/build issues
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism as any),
  { ssr: false }
);

interface AuditIssue {
  wcagSC: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  codeSuggestion?: string;
}

interface AuditResponse {
  issues: AuditIssue[];
  summary: string;
}

export default function AuditPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const [codeStyle, setCodeStyle] = useState<any>(null);

  // Load the style on client side only
  useEffect(() => {
    import('react-syntax-highlighter/dist/cjs/styles/prism').then((mod) => {
      setCodeStyle(mod.vscDarkPlus);
    });
  }, []);

  const handleAudit = async () => {
    if (!code.trim()) {
      setError('Please enter JSX code to audit');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to perform audit');
      }

      const data: AuditResponse = await response.json();
      setResult(data);
      // Expand all issues by default
      setExpandedIssues(new Set(data.issues.map((_, i) => i)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleIssue = (index: number) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIssues(newExpanded);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'var(--color-error-500, #ef4444)';
      case 'warning':
        return 'var(--color-warning-500, #f59e0b)';
      case 'info':
        return 'var(--color-primary-500, #0ea5e9)';
      default:
        return 'var(--color-neutral-500, #737373)';
    }
  };

  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  // Group issues by WCAG SC
  const groupedIssues = result?.issues.reduce(
    (acc, issue, index) => {
      if (!acc[issue.wcagSC]) {
        acc[issue.wcagSC] = [];
      }
      acc[issue.wcagSC].push({ ...issue, originalIndex: index });
      return acc;
    },
    {} as Record<string, Array<AuditIssue & { originalIndex: number }>>
  );

  return (
    <main className="audit-page">
      <div className="audit-container">
        <header className="audit-header">
          <div className="audit-header-top">
            <h1>AI Accessibility Audit Assistant</h1>
            <div className="audit-header-logo">
              <Image src="/logo.png" alt="A11y Pros Logo" width={150} height={25} priority />
            </div>
          </div>
          <p>
            Paste your JSX code snippet below to get an AI-powered accessibility review based on
            WCAG 2.1 and 2.2 guidelines.
          </p>
        </header>

        <div className="audit-input-section">
          <label htmlFor="code-input" className="audit-label">
            JSX Code Snippet
          </label>
          <textarea
            id="code-input"
            className="audit-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="<button onClick={handleClick}>Click me</button>"
            rows={12}
            aria-describedby="code-input-help"
          />
          <p id="code-input-help" className="audit-help-text">
            Enter your JSX/React component code to analyze for accessibility issues.
          </p>
          <Button
            onClick={handleAudit}
            loading={loading}
            disabled={!code.trim() || loading}
            variant="primary"
            size="lg"
            className="audit-button"
          >
            {loading ? 'Auditing...' : 'Run Accessibility Audit'}
          </Button>
        </div>

        {error && (
          <div className="audit-error" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="audit-results">
            <h2>Audit Results</h2>
            <p className="audit-summary">{result.summary}</p>

            {result.issues.length === 0 ? (
              <div className="audit-success">
                <p>✓ No accessibility issues found!</p>
              </div>
            ) : (
              <div className="audit-issues">
                {groupedIssues &&
                  Object.entries(groupedIssues).map(([wcagSC, issues]) => (
                    <div key={wcagSC} className="audit-sc-group">
                      <h3 className="audit-sc-title">
                        WCAG {wcagSC}
                        <span className="audit-sc-count">
                          {' '}
                          ({issues.length} issue{issues.length !== 1 ? 's' : ''})
                        </span>
                      </h3>
                      {issues.map((issue, idx) => {
                        const globalIndex = issue.originalIndex;
                        const isExpanded = expandedIssues.has(globalIndex);
                        return (
                          <div
                            key={globalIndex}
                            className={`audit-issue audit-issue--${issue.severity}`}
                          >
                            <button
                              className="audit-issue-header"
                              onClick={() => toggleIssue(globalIndex)}
                              aria-expanded={isExpanded}
                              aria-controls={`issue-${globalIndex}`}
                            >
                              <span
                                className="audit-severity-badge"
                                style={{ backgroundColor: getSeverityColor(issue.severity) }}
                              >
                                {getSeverityLabel(issue.severity)}
                              </span>
                              <span className="audit-issue-message">{issue.message}</span>
                              <span className="audit-issue-toggle" aria-hidden="true">
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </button>
                            {isExpanded && (
                              <div id={`issue-${globalIndex}`} className="audit-issue-details">
                                <div className="audit-issue-suggestion">
                                  <strong>Suggestion:</strong> {issue.suggestion}
                                </div>
                                {issue.codeSuggestion && (
                                  <div className="audit-issue-code">
                                    <strong>Code suggestion:</strong>
                                    {codeStyle ? (
                                      // @ts-expect-error - react-syntax-highlighter type issues with dynamic import
                                      <SyntaxHighlighter
                                        language="jsx"
                                        style={codeStyle}
                                        customStyle={{
                                          marginTop: '0.5rem',
                                          borderRadius: '0.375rem',
                                          fontSize: '0.875rem',
                                        }}
                                      >
                                        {issue.codeSuggestion}
                                      </SyntaxHighlighter>
                                    ) : (
                                      <pre
                                        style={{
                                          padding: '1rem',
                                          background: '#1e1e1e',
                                          color: '#d4d4d4',
                                          borderRadius: '0.375rem',
                                          marginTop: '0.5rem',
                                          fontSize: '0.875rem',
                                          overflow: 'auto',
                                        }}
                                      >
                                        {issue.codeSuggestion}
                                      </pre>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
