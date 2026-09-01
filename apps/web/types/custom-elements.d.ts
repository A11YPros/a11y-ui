import type { DOMAttributes } from 'react';

type CustomElementProps = DOMAttributes<HTMLElement> & {
  class?: string;
  className?: string;
  id?: string;
  style?: any;
  ref?: any;
  key?: any;
  title?: string;
  label?: string;
  checked?: boolean | string;
  disabled?: boolean | string;
  size?: string;
  variant?: string;
  loading?: boolean | string;
  open?: boolean | string;
  [key: string]: any;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a11y-switch': CustomElementProps;
      'a11y-button': CustomElementProps;
      'a11y-accordion': CustomElementProps;
      'a11y-accordion-item': CustomElementProps;
      'a11y-modal': CustomElementProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a11y-switch': CustomElementProps;
      'a11y-button': CustomElementProps;
      'a11y-accordion': CustomElementProps;
      'a11y-accordion-item': CustomElementProps;
      'a11y-modal': CustomElementProps;
    }
  }
}
