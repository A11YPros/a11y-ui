import { describe, it, expect, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { A11yTextarea, registerTextarea } from './a11y-textarea';

expect.extend(toHaveNoViolations);

describe('A11yTextarea (<a11y-textarea>)', () => {
  beforeEach(() => {
    registerTextarea();
    document.body.innerHTML = '';
  });

  it('renders textarea with associated label and correct class names', () => {
    const textarea = document.createElement('a11y-textarea') as A11yTextarea;
    textarea.setAttribute('label', 'Feedback');
    textarea.setAttribute('rows', '5');
    document.body.appendChild(textarea);

    const nativeTextarea = textarea.querySelector('textarea') as HTMLTextAreaElement;
    expect(nativeTextarea).not.toBeNull();
    expect(nativeTextarea.classList.contains('form-textarea')).toBe(true);
    expect(nativeTextarea.rows).toBe(5);

    const label = textarea.querySelector('label') as HTMLLabelElement;
    expect(label.textContent).toBe('Feedback');
    expect(label.htmlFor).toBe(nativeTextarea.id);
  });

  it('displays character counter when show-count and max-length are set', () => {
    const textarea = document.createElement('a11y-textarea') as A11yTextarea;
    textarea.setAttribute('label', 'Message');
    textarea.setAttribute('max-length', '200');
    textarea.setAttribute('show-count', '');
    textarea.value = 'Hello world';
    document.body.appendChild(textarea);

    const count = textarea.querySelector('.form-character-count') as HTMLSpanElement;
    expect(count).not.toBeNull();
    expect(count.textContent).toBe('11 / 200');
    expect(count.getAttribute('aria-live')).toBe('polite');
  });

  it('handles error message and aria attributes', () => {
    const textarea = document.createElement('a11y-textarea') as A11yTextarea;
    textarea.setAttribute('label', 'Comments');
    textarea.setAttribute('error', 'Comment cannot be empty');
    document.body.appendChild(textarea);

    const nativeTextarea = textarea.querySelector('textarea') as HTMLTextAreaElement;
    expect(nativeTextarea.getAttribute('aria-invalid')).toBe('true');
    expect(nativeTextarea.classList.contains('form-textarea--error')).toBe(true);

    const errorSpan = textarea.querySelector('.form-error-text') as HTMLSpanElement;
    expect(errorSpan.textContent).toBe('Comment cannot be empty');
    expect(errorSpan.getAttribute('role')).toBe('alert');
  });

  it('passes axe accessibility audit with zero violations', async () => {
    const textarea = document.createElement('a11y-textarea') as A11yTextarea;
    textarea.setAttribute('label', 'Detailed Review');
    textarea.setAttribute('helper-text', 'Write at least 50 words');
    document.body.appendChild(textarea);

    const results = await axe(textarea);
    expect(results).toHaveNoViolations();
  });

  it('preserves typed text when an unrelated attribute such as error changes', () => {
    const el = document.createElement('a11y-textarea') as A11yTextarea;
    el.setAttribute('label', 'Bio');
    document.body.appendChild(el);

    const textarea = el.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'Hello there';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    el.setAttribute('error', 'Too short');
    expect(textarea.value).toBe('Hello there');

    el.setAttribute('value', 'Programmatic');
    expect(textarea.value).toBe('Programmatic');
  });

  it('moves the host id onto the native textarea so label and describedby resolve', () => {
    document.body.innerHTML = `
      <label for="bio">Biography</label>
      <a11y-textarea id="bio" helper-text="Tell us about yourself"></a11y-textarea>
    `;
    const el = document.querySelector('a11y-textarea') as A11yTextarea;
    const textarea = el.querySelector('textarea') as HTMLTextAreaElement;
    const externalLabel = document.querySelector('label[for="bio"]') as HTMLLabelElement;

    expect(el.hasAttribute('id')).toBe(false);
    expect(el.getAttribute('data-textarea-id')).toBe('bio');
    expect(document.getElementById('bio')).toBe(textarea);
    expect(externalLabel.control).toBe(textarea);

    el.setAttribute('error', 'Required');
    const describedBy = textarea.getAttribute('aria-describedby') as string;
    const described = document.getElementById(describedBy);
    expect(described).not.toBeNull();
    expect(described?.textContent).toBe('Required');
  });
});
