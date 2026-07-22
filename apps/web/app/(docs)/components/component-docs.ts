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
    storybookPath: '/storybook-static/index.html?path=/story/components-accordion--single-open',
  },
  {
    slug: 'banner',
    title: 'Banner',
    summary: 'Inline status and alert messaging with dismiss support.',
    storybookPath: '/storybook-static/index.html?path=/story/components-banner--info',
  },
  {
    slug: 'button',
    title: 'Button',
    summary: 'Action buttons with variants, sizes, and states.',
    storybookPath: '/storybook-static/index.html?path=/story/components-button--primary',
  },
  // {
  //   slug: 'form',
  //   title: 'Form Overview',
  //   summary: 'Overview of all form building blocks.',
  //   storybookPath: '/storybook-static/index.html?path=/story/components-form-input--default',
  // },
  {
    slug: 'input',
    title: 'Input',
    summary: 'Single-line text and email fields.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-input--default',
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    summary: 'Multi-line text input with count and helper text.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-textarea--default',
  },
  {
    slug: 'select',
    title: 'Select',
    summary: 'Single-select lists with placeholders and option states.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-select--default',
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    summary: 'Boolean choices and consent controls.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-checkbox--default',
  },
  {
    slug: 'radio',
    title: 'Radio',
    summary: 'Mutually exclusive option groups.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-radio--default',
  },
  {
    slug: 'fieldset',
    title: 'Fieldset',
    summary: 'Grouped controls with legend context.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-fieldset--default',
  },
  {
    slug: 'label',
    title: 'Label',
    summary: 'Visible labels and htmlFor association patterns.',
    storybookPath: '/storybook-static/index.html?path=/story/components-form-input--default',
  },
  {
    slug: 'link',
    title: 'Link',
    summary: 'Navigation and utility link variants.',
    storybookPath: '/storybook-static/index.html?path=/story/components-link--default',
  },
  {
    slug: 'modal',
    title: 'Modal',
    summary: 'Focus-managed dialogs and overlays.',
    storybookPath: '/storybook-static/index.html?path=/story/components-modal--default',
  },
  {
    slug: 'table',
    title: 'Data Table',
    summary: 'Sortable tabular content and row selection.',
    storybookPath: '/storybook-static/index.html?path=/story/components-datatable--default',
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    summary: 'Keyboard-friendly tab lists and panels.',
    storybookPath: '/storybook-static/index.html?path=/story/components-tabs--default',
  },
];
