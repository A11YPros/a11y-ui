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
      'a11y-input': CustomElementProps;
      'a11y-textarea': CustomElementProps;
      'a11y-select': CustomElementProps;
      'a11y-checkbox': CustomElementProps;
      'a11y-radio': CustomElementProps;
      'a11y-fieldset': CustomElementProps;
      'a11y-label': CustomElementProps;
      'a11y-banner': CustomElementProps;
      'a11y-link': CustomElementProps;
      'a11y-tabs': CustomElementProps;
      'a11y-tab-panel': CustomElementProps;
      'a11y-tooltip': CustomElementProps;
      'a11y-menu': CustomElementProps;
      'a11y-menu-item': CustomElementProps;
      'a11y-menu-divider': CustomElementProps;
      'a11y-menu-group': CustomElementProps;
      'a11y-menubar': CustomElementProps;
      'a11y-data-table': CustomElementProps;
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
      'a11y-input': CustomElementProps;
      'a11y-textarea': CustomElementProps;
      'a11y-select': CustomElementProps;
      'a11y-checkbox': CustomElementProps;
      'a11y-radio': CustomElementProps;
      'a11y-fieldset': CustomElementProps;
      'a11y-label': CustomElementProps;
      'a11y-banner': CustomElementProps;
      'a11y-link': CustomElementProps;
      'a11y-tabs': CustomElementProps;
      'a11y-tab-panel': CustomElementProps;
      'a11y-tooltip': CustomElementProps;
      'a11y-menu': CustomElementProps;
      'a11y-menu-item': CustomElementProps;
      'a11y-menu-divider': CustomElementProps;
      'a11y-menu-group': CustomElementProps;
      'a11y-menubar': CustomElementProps;
      'a11y-data-table': CustomElementProps;
    }
  }
}
