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
    slug: 'button',
    title: 'Button',
    summary: 'Action buttons with variants, sizes, and states.',
    storybookPath: '/storybook-static/index.html?path=/story/components-button--primary',
  },
  {
    slug: 'form',
    title: 'Form',
    summary: 'Input, select, checkbox, radio, and fieldset controls.',
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
