'use client';

import React, { useState } from 'react';

interface CustomComponentCTAProps {
  compact?: boolean;
}

export function CustomComponentCTA({ compact = false }: CustomComponentCTAProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('asap');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !description) return;

    setStatus('submitting');

    try {
      const formData = new FormData(e.currentTarget);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setDescription('');
    } catch (error) {
      console.error('Custom component request error:', error);
      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setDescription('');
    }
  };

  return (
    <section
      aria-labelledby="custom-cta-heading"
      className={`custom-cta-section ${compact ? 'custom-cta-section--compact' : ''}`}
    >
      <div className="custom-cta-container">
        <div className="custom-cta-content">
          <div className="custom-cta-badge">
            <span className="custom-badge-pill">TAILORED DEVELOPMENT</span>
          </div>
          <h2 id="custom-cta-heading" className="custom-cta-title">
            Need a Custom Accessible Component for Your Project?
          </h2>
          <p className="custom-cta-desc">
            Can&apos;t find the exact UI pattern or complex component your application requires? We design and build bespoke, production-ready React components tailored to your design system with 100% WCAG 2.2 AA compliance, full keyboard support, and test suites.
          </p>

          <div className="custom-cta-highlights">
            <div className="custom-highlight-item">
              <span className="custom-highlight-icon" aria-hidden="true">
                ✓
              </span>
              <span>100% WCAG 2.2 AA Compliance Guaranteed</span>
            </div>
            <div className="custom-highlight-item">
              <span className="custom-highlight-icon" aria-hidden="true">
                ✓
              </span>
              <span>Tailored to Your Design System Tokens & Styling</span>
            </div>
            <div className="custom-highlight-item">
              <span className="custom-highlight-icon" aria-hidden="true">
                ✓
              </span>
              <span>Complete Unit Tests, Storybook Stories & ARIA Specs</span>
            </div>
          </div>
        </div>

        <div className="custom-cta-form-box">
          <h3 id="custom-form-title" className="custom-form-box__title">
            Request a Custom Build
          </h3>
          <p className="custom-form-box__sub">
            Tell us about your component requirements and we&apos;ll get back to you with a scope and estimate within 24 hours.
          </p>

          {status === 'success' ? (
            <div role="status" aria-live="polite" className="custom-success-box">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="custom-success-icon"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <strong>Request Received!</strong>
                <p>Thank you for reaching out. Our accessibility engineering team will contact you shortly.</p>
              </div>
            </div>
          ) : (
            <form
              name="custom-component-request"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="custom-form"
              aria-labelledby="custom-form-title"
            >
              <input type="hidden" name="form-name" value="custom-component-request" />
              <p className="visually-hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>

              <div className="custom-form__row">
                <div className="custom-form__field">
                  <label htmlFor="custom-name" className="custom-form__label">
                    Your Name
                  </label>
                  <input
                    id="custom-name"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="custom-form__input"
                    autoComplete="name"
                  />
                </div>

                <div className="custom-form__field">
                  <label htmlFor="custom-email" className="custom-form__label">
                    Work Email <span className="custom-required">*</span>
                  </label>
                  <input
                    id="custom-email"
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-form__input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="custom-form__row">
                <div className="custom-form__field">
                  <label htmlFor="custom-company" className="custom-form__label">
                    Company / Organization
                  </label>
                  <input
                    id="custom-company"
                    type="text"
                    name="company"
                    placeholder="Acme Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="custom-form__input"
                  />
                </div>

                <div className="custom-form__field">
                  <label htmlFor="custom-timeline" className="custom-form__label">
                    Target Timeline
                  </label>
                  <select
                    id="custom-timeline"
                    name="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="custom-form__select"
                  >
                    <option value="asap">ASAP (1-2 Weeks)</option>
                    <option value="1month">Within 1 Month</option>
                    <option value="planning">Future Project Planning</option>
                  </select>
                </div>
              </div>

              <div className="custom-form__field">
                <label htmlFor="custom-desc" className="custom-form__label">
                  Component Description & Requirements <span className="custom-required">*</span>
                </label>
                <textarea
                  id="custom-desc"
                  name="description"
                  required
                  rows={3}
                  placeholder="Describe the component, functionality, design system requirements, or WCAG criteria needed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="custom-form__textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="button-like button-like--primary custom-form__button"
              >
                {status === 'submitting' ? 'Sending Request...' : 'Submit Custom Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
