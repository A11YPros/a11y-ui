'use client';

import React, { useState } from 'react';

interface ProComponentCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  availability: string;
  icon: string;
}

const proComponents: ProComponentCard[] = [
  {
    id: 'datepicker',
    title: 'Calendar & Datepicker Input',
    description:
      'Single-date selection popup calendar with full keyboard grid navigation, month/year jumping, and accessible screen-reader feedback.',
    tags: ['WCAG 2.1 AAA', 'Keyboard Grid', 'Popup Calendar'],
    availability: 'Coming Q3 2026',
    icon: '📅',
  },
  {
    id: 'daterange',
    title: 'Date Range Picker',
    description:
      'Dual-calendar range selector with keyboard shortcut navigation, preset range shortcuts (Today, Last 7 Days), and live announcements.',
    tags: ['Date Range', 'Preset Range', 'Live Announcements'],
    availability: 'Coming Q3 2026',
    icon: '🗓️',
  },
  {
    id: 'combobox',
    title: 'Multi-Select Combobox',
    description:
      'Autocomplete search dropdown with removable chip tags, focus trapping, screen reader announcements, and dynamic options.',
    tags: ['ARIA 1.2 Combobox', 'Chip Tags', 'Focus Managed'],
    availability: 'Coming Q3 2026',
    icon: '🔍',
  },
  {
    id: 'menubar',
    title: 'Accessible Menubar',
    description:
      'Desktop application-style horizontal menu bar with nested dropdown submenus, arrow key navigation, and shortcut triggers.',
    tags: ['WAI-ARIA Menubar', 'Arrow Navigation', 'Submenus'],
    availability: 'Coming Q3 2026',
    icon: '📑',
  },
  {
    id: 'inputcounter',
    title: 'InputCounter',
    description:
      'Numeric step input with accessible increment/decrement controls, min/max range boundaries, and aria-valuenow announcements.',
    tags: ['Numeric Stepper', 'Range Bounds', 'ARIA Valuenow'],
    availability: 'Coming Q3 2026',
    icon: '🔢',
  },
  {
    id: 'progress',
    title: 'Progress Indicator',
    description:
      'Accessible progress bar and spinner indicators with aria-valuenow status tracking, indeterminate loading states, and polite live regions.',
    tags: ['ARIA Progressbar', 'Indeterminate State', 'Live Regions'],
    availability: 'Coming Q3 2026',
    icon: '⏳',
  },
  {
    id: 'reorderable',
    title: 'Reorderable List',
    description:
      'Drag-and-drop & keyboard-reorderable list items with live region reorder announcements, focus trapping, and position feedback.',
    tags: ['Keyboard Reorder', 'Drag & Drop', 'Position Feedback'],
    availability: 'Coming Q4 2026',
    icon: '🔀',
  },
  {
    id: 'splitbutton',
    title: 'Split Button',
    description:
      'Dual-action button with primary action trigger and attached popup menu for secondary contextual options.',
    tags: ['Dual-Action', 'Context Menu', 'Keyboard Accessible'],
    availability: 'Coming Q4 2026',
    icon: '🔘',
  },
];

export function ProWaitlistSection() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('developer');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    try {
      const formData = new FormData(e.currentTarget);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section aria-labelledby="pro-title" className="pro-section">
      <div className="pro-header">
        <div className="pro-header__badge">
          <span className="pro-badge-pill">PRO TIER</span>
          <span className="pro-coming-soon">COMING SOON</span>
        </div>
        <h2 id="pro-title" className="pro-header__title">
          Enterprise Accessible Components
        </h2>
        <p className="pro-header__subtitle">
          Complex, production-tested components designed for strict WCAG compliance and complex web application workflows.
        </p>
      </div>

      <div className="pro-body-layout">
        <div className="pro-grid">
          {proComponents.map((item) => (
            <article key={item.id} className="pro-card">
              <div className="pro-card__header">
                <span className="pro-card__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="pro-card__lock" title="Locked component">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>{item.availability}</span>
                </span>
              </div>

              <h3 className="pro-card__title">{item.title}</h3>
              <p className="pro-card__desc">{item.description}</p>

              <ul className="pro-card__tags" aria-label="Features">
                {item.tags.map((tag) => (
                  <li key={tag} className="pro-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="pro-sidebar">
          <div className="pro-waitlist-box">
            <div className="pro-waitlist-box__content">
              <h3 id="waitlist-form-heading" className="pro-waitlist-box__title">
                Get Early Access & Pro Discounts
              </h3>
              <p className="pro-waitlist-box__desc">
                Join the waitlist to get early preview builds, launch discounts, and influence which components we release first.
              </p>
            </div>

            {status === 'success' ? (
              <div role="status" aria-live="polite" className="pro-success-box">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pro-success-icon"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <strong>You&apos;re on the list!</strong>
                  <p>We will email you as soon as early access opens for the Pro Tier.</p>
                </div>
              </div>
            ) : (
              <form
                name="pro-waitlist"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="pro-form"
                aria-labelledby="waitlist-form-heading"
              >
                <input type="hidden" name="form-name" value="pro-waitlist" />
                <p className="visually-hidden">
                  <label>
                    Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                  </label>
                </p>

                <div className="pro-form__fields">
                  <div className="pro-form__field">
                    <label htmlFor="pro-email" className="pro-form__label">
                      Email Address <span className="pro-required">*</span>
                    </label>
                    <input
                      id="pro-email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pro-form__input"
                      autoComplete="email"
                    />
                  </div>

                  <div className="pro-form__field">
                    <label htmlFor="pro-role" className="pro-form__label">
                      Your Role
                    </label>
                    <select
                      id="pro-role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="pro-form__select"
                    >
                      <option value="developer">Frontend / Full-stack Developer</option>
                      <option value="lead">Tech Lead / Architect</option>
                      <option value="a11y-specialist">Accessibility Specialist</option>
                      <option value="designer">Product Designer / Design System</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="button-like button-like--primary pro-form__button"
                  >
                    {status === 'submitting' ? 'Joining...' : 'Join Pro Waitlist'}
                  </button>
                </div>

                <p className="pro-form__privacy">
                  Zero spam. We will only email you for Pro Tier component updates.
                </p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
