'use client';

import React, { useId, useRef } from 'react';
import { useFramework, Framework } from './FrameworkContext';

interface FrameworkToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function FrameworkToggle({ className = '', showLabel = false }: FrameworkToggleProps) {
  const { framework, setFramework } = useFramework();
  // The toggle mounts twice (desktop sidebar and mobile drawer), so the label id
  // must be unique per instance for aria-labelledby to resolve correctly.
  const labelId = useId();
  const reactBtnRef = useRef<HTMLButtonElement | null>(null);
  const wcBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (framework === 'react') {
        setFramework('wc');
        wcBtnRef.current?.focus();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (framework === 'wc') {
        setFramework('react');
        reactBtnRef.current?.focus();
      }
    }
  };

  return (
    <div className={`framework-toggle-wrap ${className}`.trim()}>
      {showLabel && (
        <span id={labelId} className="framework-toggle-label">
          Framework:
        </span>
      )}
      <div
        className="framework-toggle"
        role="radiogroup"
        aria-labelledby={showLabel ? labelId : undefined}
        aria-label={!showLabel ? 'Component framework selection' : undefined}
        onKeyDown={handleKeyDown}
      >
        <button
          ref={reactBtnRef}
          type="button"
          role="radio"
          aria-checked={framework === 'react'}
          tabIndex={framework === 'react' ? 0 : -1}
          className={`framework-toggle__btn ${
            framework === 'react' ? 'framework-toggle__btn--active' : ''
          }`}
          onClick={() => setFramework('react')}
        >
          <span className="framework-toggle__icon" aria-hidden="true">
            ⚛️
          </span>
          <span className="framework-toggle__text">React</span>
        </button>
        <button
          ref={wcBtnRef}
          type="button"
          role="radio"
          aria-checked={framework === 'wc'}
          tabIndex={framework === 'wc' ? 0 : -1}
          className={`framework-toggle__btn ${
            framework === 'wc' ? 'framework-toggle__btn--active' : ''
          }`}
          onClick={() => setFramework('wc')}
        >
          <span className="framework-toggle__icon" aria-hidden="true">
            🌐
          </span>
          <span className="framework-toggle__text">HTML5 Elements</span>
        </button>
      </div>
    </div>
  );
}
