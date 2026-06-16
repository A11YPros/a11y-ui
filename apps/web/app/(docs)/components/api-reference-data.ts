import type { ApiSectionDoc } from '../_components/ApiReference';

export const buttonApi: ApiSectionDoc[] = [
  {
    name: 'ButtonProps',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost' | 'danger'",
        defaultValue: "'primary'",
        description: 'Visual style variant for the button.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Controls button sizing.',
      },
      {
        name: 'loading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Shows spinner and marks the button as busy.',
      },
      {
        name: 'aria-label',
        type: 'string',
        description: 'Accessible name. Required when no visible label text is provided.',
      },
    ],
  },
];

export const accordionApi: ApiSectionDoc[] = [
  {
    name: 'AccordionProps',
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        description: 'AccordionItem children to render in the container.',
      },
      {
        name: 'allowMultiple',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Allows multiple accordion items to stay expanded.',
      },
      {
        name: 'className',
        type: 'string',
        defaultValue: "''",
        description: 'Additional class name for the accordion wrapper.',
      },
    ],
  },
  {
    name: 'AccordionItemProps',
    props: [
      {
        name: 'id',
        type: 'string',
        description: 'Unique ID used for details element identification.',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Summary text shown as the item trigger.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Panel content displayed when expanded.',
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Controls whether item is initially expanded.',
      },
    ],
  },
];

export const linkApi: ApiSectionDoc[] = [
  {
    name: 'LinkProps',
    props: [
      {
        name: 'external',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Treats href as external and applies secure rel/target behavior.',
      },
      {
        name: 'skip',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Styles/behaves as a skip link for keyboard users.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'Destination URL for the anchor element.',
      },
      {
        name: 'aria-label',
        type: 'string',
        description: 'Accessible label, useful when visible text is ambiguous.',
      },
    ],
  },
];

export const modalApi: ApiSectionDoc[] = [
  {
    name: 'ModalProps',
    props: [
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controls whether the dialog is visible.',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Called when modal should close.',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Dialog heading, used for accessible naming.',
      },
      {
        name: 'closeOnBackdropClick',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Allows click on backdrop to dismiss modal.',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Allows Escape key to dismiss modal.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'full'",
        defaultValue: "'md'",
        description: 'Sets modal width behavior.',
      },
      {
        name: 'returnFocusTo',
        type: 'HTMLElement | null',
        description: 'Optional element to receive focus when modal closes.',
      },
    ],
  },
];

export const tabsApi: ApiSectionDoc[] = [
  {
    name: 'TabsProps',
    props: [
      {
        name: 'items',
        type: 'TabItem[]',
        description: 'Array of tab definitions (id, label, content, disabled).',
      },
      {
        name: 'defaultSelectedId',
        type: 'string',
        description: 'Initial selected tab in uncontrolled mode.',
      },
      {
        name: 'selectedId',
        type: 'string',
        description: 'Selected tab ID in controlled mode.',
      },
      {
        name: 'onSelectionChange',
        type: '(id: string) => void',
        description: 'Selection callback for controlled usage.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Layout orientation for tab list keyboard behavior.',
      },
      {
        name: 'activationMode',
        type: "'automatic' | 'manual'",
        defaultValue: "'automatic'",
        description: 'Determines whether arrow keys auto-activate tabs.',
      },
      {
        name: 'aria-label / aria-labelledby',
        type: 'string',
        description: 'One of these is required to provide tablist accessible name.',
      },
    ],
  },
];

export const dataTableApi: ApiSectionDoc[] = [
  {
    name: 'DataTableProps<T>',
    props: [
      {
        name: 'data',
        type: 'T[]',
        description: 'Rows rendered in the table body.',
      },
      {
        name: 'columns',
        type: 'DataTableColumn<T>[]',
        description: 'Column definitions, with optional render and sort metadata.',
      },
      {
        name: 'getRowId',
        type: '(row: T) => string',
        description: 'Returns unique ID for each row.',
      },
      {
        name: 'selectable',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Enables row selection checkbox column.',
      },
      {
        name: 'selectedRows',
        type: 'string[]',
        defaultValue: '[]',
        description: 'Controlled selected row IDs.',
      },
      {
        name: 'onSelectionChange',
        type: '(selectedIds: string[]) => void',
        description: 'Called when row selection changes.',
      },
      {
        name: 'sortConfig',
        type: "{ column: string; direction: 'asc' | 'desc' }",
        description: 'Current sort state for sortable headers.',
      },
      {
        name: 'onSortChange',
        type: "(column: string, direction: 'asc' | 'desc') => void",
        description: 'Sort callback when user activates sortable header.',
      },
      {
        name: 'caption',
        type: 'string',
        description: 'Accessible table caption/label.',
      },
    ],
  },
];

export const inputApi: ApiSectionDoc[] = [
  {
    name: 'InputProps',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Visible label text associated with the input.',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message; sets aria-invalid and alert semantics.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Supporting text shown when no error is present.',
      },
      {
        name: 'required',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Marks field as required and appends visual indicator.',
      },
    ],
  },
];

export const textareaApi: ApiSectionDoc[] = [
  {
    name: 'TextareaProps',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Visible label text for textarea.',
      },
      {
        name: 'maxLength',
        type: 'number',
        description: 'Maximum number of characters allowed.',
      },
      {
        name: 'showCount',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Displays live character count footer.',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message displayed with alert semantics.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Support text displayed when not in error state.',
      },
    ],
  },
];

export const selectApi: ApiSectionDoc[] = [
  {
    name: 'SelectProps',
    props: [
      {
        name: 'options',
        type: 'SelectOption[]',
        description: 'Option list for the native select control.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Visible associated label text.',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Disabled placeholder option text.',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error text and invalid state handling.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Support text when there is no error.',
      },
    ],
  },
];

export const checkboxApi: ApiSectionDoc[] = [
  {
    name: 'CheckboxProps',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text label associated with checkbox input.',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Sets mixed state on native checkbox element.',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error message rendered with alert role.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Optional helper copy below the checkbox.',
      },
    ],
  },
];

export const radioApi: ApiSectionDoc[] = [
  {
    name: 'RadioProps',
    props: [
      {
        name: 'name',
        type: 'string',
        description: 'Required shared name for radio group options.',
      },
      {
        name: 'options',
        type: 'RadioOption[]',
        description: 'Array of radio options with value/label/disabled.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Group label text rendered above options.',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Error text shown below group and announced.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Optional helper text shown when no error.',
      },
    ],
  },
];

export const fieldsetApi: ApiSectionDoc[] = [
  {
    name: 'FieldsetProps',
    props: [
      {
        name: 'legend',
        type: 'string',
        description: 'Legend text describing grouped controls.',
      },
      {
        name: 'legendHidden',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Visually hides legend while retaining screen-reader access.',
      },
      {
        name: 'required',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Displays required field explanation text for the group.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Grouped form controls rendered inside fieldset.',
      },
    ],
  },
];

export const labelApi: ApiSectionDoc[] = [
  {
    name: 'LabelProps',
    props: [
      {
        name: 'required',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Appends required indicator to the label text.',
      },
      {
        name: 'htmlFor',
        type: 'string',
        description: 'ID of associated form control element.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Visible label text content.',
      },
    ],
  },
];

export const formOverviewApi: ApiSectionDoc[] = [
  {
    name: 'Form Input Components',
    props: [
      {
        name: 'Input',
        type: 'InputProps',
        description: 'Single-line text inputs with helper/error support.',
        example: '<Input label="Email" type="email" required />',
      },
      {
        name: 'Textarea',
        type: 'TextareaProps',
        description: 'Multi-line text entry with optional character count.',
        example: '<Textarea label="Message" maxLength={280} showCount />',
      },
      {
        name: 'Select',
        type: 'SelectProps',
        description: 'Native select control with typed options.',
        example: '<Select label="Country" options={[{ value: "us", label: "United States" }]} />',
      },
      {
        name: 'Checkbox',
        type: 'CheckboxProps',
        description: 'Boolean and mixed-state controls.',
        example: '<Checkbox label="I agree" />',
      },
      {
        name: 'Radio',
        type: 'RadioProps',
        description: 'Grouped mutually-exclusive options.',
        example: '<Radio name="size" options={[{ value: "m", label: "Medium" }]} />',
      },
      {
        name: 'Fieldset / Label',
        type: 'FieldsetProps / LabelProps',
        description: 'Semantic grouping and labeling utilities for forms.',
        example: '<Fieldset legend="Shipping"><Input label="Street" /></Fieldset>',
      },
    ],
  },
];
