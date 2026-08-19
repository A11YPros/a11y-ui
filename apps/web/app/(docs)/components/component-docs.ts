export interface ComponentDocMeta {
  slug: string;
  title: string;
  summary: string;
  storybookPath: string;
}

export const componentDocs: ComponentDocMeta[] = [
  {
    slug: 'accordion',
    title: 'Accordion',
    summary: 'Details and summary disclosure patterns.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-accordion--docs',
  },
  {
    slug: 'banner',
    title: 'Banner',
    summary: 'Inline status and alert messaging with dismiss support.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-banner--docs',
  },
  {
    slug: 'button',
    title: 'Button',
    summary: 'Action buttons with variants, sizes, and states.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-button--docs',
  },
  // {
  //   slug: 'form',
  //   title: 'Form Overview',
  //   summary: 'Overview of all form building blocks.',
  //   storybookPath: '/storybook-static/index.html?path=/docs/components-form-input--docs',
  // },
  {
    slug: 'input',
    title: 'Input',
    summary: 'Single-line text and email fields.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-input--docs',
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    summary: 'Multi-line text input with count and helper text.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-textarea--docs',
  },
  {
    slug: 'select',
    title: 'Select',
    summary: 'Single-select lists with placeholders and option states.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-select--docs',
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    summary: 'Boolean choices and consent controls.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-checkbox--docs',
  },
  {
    slug: 'radio',
    title: 'Radio',
    summary: 'Mutually exclusive option groups.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-radio--docs',
  },
  {
    slug: 'fieldset',
    title: 'Fieldset',
    summary: 'Grouped controls with legend context.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-fieldset--docs',
  },
  {
    slug: 'label',
    title: 'Label',
    summary: 'Visible labels and htmlFor association patterns.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-form-input--docs',
  },
  {
    slug: 'link',
    title: 'Link',
    summary: 'Navigation and utility link variants.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-link--docs',
  },
  {
    slug: 'modal',
    title: 'Modal',
    summary: 'Focus-managed dialogs and overlays.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-modal--docs',
  },
  {
    slug: 'table',
    title: 'Data Table',
    summary: 'Sortable tabular content and row selection.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-datatable--docs',
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    summary: 'Keyboard-friendly tab lists and panels.',
    storybookPath: '/storybook-static/index.html?path=/docs/components-tabs--docs',
  },
];
