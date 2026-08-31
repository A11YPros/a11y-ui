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

export const bannerApi: ApiSectionDoc[] = [
  {
    name: 'BannerProps',
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'Visible banner heading text announced to assistive technology.',
      },
      {
        name: 'variant',
        type: "'info' | 'success' | 'warning' | 'error' | 'critical'",
        defaultValue: "'info'",
        description: 'Visual style and default live region behavior for the banner.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Optional supporting message content displayed under the title.',
      },
      {
        name: 'isExposed',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Controls visibility of the banner in controlled usage.',
      },
      {
        name: 'onClose',
        type: '() => void',
        description: 'Enables dismiss control and fires when user closes the banner.',
      },
      {
        name: 'ariaLive',
        type: "'polite' | 'assertive' | 'off'",
        description: 'Optional override for live region politeness.',
      },
      {
        name: 'ariaAtomic',
        type: "'true' | 'false'",
        description: 'Optional override to announce full banner region updates.',
      },
      {
        name: 'className',
        type: 'string',
        defaultValue: "''",
        description: 'Additional class names for custom styling.',
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

export const switchApi: ApiSectionDoc[] = [
  {
    name: 'SwitchProps',
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Controlled checked state.',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial state for uncontrolled usage.',
      },
      {
        name: 'onChange',
        type: '(checked: boolean, event: MouseEvent | KeyboardEvent) => void',
        description: 'Callback fired when the switch state changes.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Visible label text associated with the switch.',
      },
      {
        name: 'labelPosition',
        type: "'start' | 'end'",
        defaultValue: "'end'",
        description: 'Position of label relative to the switch toggle.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Size of the switch control.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables user interaction and dims the control.',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Validation error message associated via aria-describedby.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Supplementary helper text associated via aria-describedby.',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Field name for hidden input during standard HTML form submission.',
      },
      {
        name: 'value',
        type: 'string',
        defaultValue: "'on'",
        description: 'Field value for hidden input during form submission.',
      },
    ],
  },
];

export const tooltipApi: ApiSectionDoc[] = [
  {
    name: 'TooltipProps',
    props: [
      {
        name: 'content',
        type: 'React.ReactNode',
        description: 'Tooltip body copy or elements displayed inside the popover.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Accessible name for icon-only triggers (aria-label).',
      },
      {
        name: 'contentHeading',
        type: 'string',
        description: 'Optional bold heading rendered above the tooltip body.',
      },
      {
        name: 'placement',
        type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",
        defaultValue: "'top'",
        description: 'Preferred placement of tooltip relative to the anchor trigger.',
      },
      {
        name: 'defaultIcon',
        type: "'help' | 'info'",
        description: 'Built-in icon anchor when no children are provided.',
      },
      {
        name: 'customIcon',
        type: 'React.ReactNode',
        description: 'Custom SVG or icon element for free-standing triggers.',
      },
      {
        name: 'isSmall',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Compact tooltip size with reduced padding.',
      },
      {
        name: 'showDashedUnderline',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether to show dashed underline on non-interactive wrapped text.',
      },
      {
        name: 'shouldNotWrap',
        type: 'boolean',
        defaultValue: 'false',
        description:
          'Prevents wrapping child in a button if child already handles keyboard events.',
      },
      {
        name: 'open',
        type: 'boolean',
        description: 'Controlled visibility state.',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Callback fired when tooltip visibility changes.',
      },
      {
        name: 'delay',
        type: 'number',
        defaultValue: '150',
        description: 'Delay in milliseconds before opening on hover.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Anchor element to wrap as trigger.',
      },
    ],
  },
];

export const menuApi: ApiSectionDoc[] = [
  {
    name: 'MenuProps',
    props: [
      {
        name: 'trigger',
        type: 'React.ReactNode',
        description:
          'The trigger element (e.g. <Button>). Automatically wired with accessibility attributes.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Menu content containing MenuItem, MenuDivider, and MenuGroup.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Accessible label for the menu if trigger does not contain visible text.',
      },
      {
        name: 'isOpen',
        type: 'boolean',
        description: 'Controlled open state.',
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial open state when uncontrolled.',
      },
      {
        name: 'onOpenChange',
        type: '(isOpen: boolean) => void',
        description: 'Callback fired when open state changes.',
      },
      {
        name: 'placement',
        type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'",
        defaultValue: "'bottom-start'",
        description: 'Alignment of dropdown menu relative to the trigger.',
      },
      {
        name: 'closeOnSelect',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether selecting a menu item automatically closes the menu.',
      },
    ],
  },
  {
    name: 'MenuItemProps',
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Item label text or elements.',
      },
      {
        name: 'onClick',
        type: '(event: React.MouseEvent | React.KeyboardEvent) => void',
        description: 'Action handler invoked on click, Enter, or Space.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'Optional destination URL to render as an accessible navigation link.',
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Optional leading icon or SVG element.',
      },
      {
        name: 'shortcut',
        type: 'string',
        description: 'Optional keyboard shortcut label (e.g. ⌘S).',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables interaction and skips the item during keyboard navigation.',
      },
      {
        name: 'danger',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies destructive danger styling for critical actions (e.g. Delete).',
      },
    ],
  },
  {
    name: 'MenuGroupProps',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Optional section header text associated via aria-labelledby.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Group content items.',
      },
    ],
  },
];

export const menubarApi: ApiSectionDoc[] = [
  {
    name: 'MenubarProps',
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The Menu instances rendered within the menubar.',
      },
      {
        name: 'label',
        type: 'string',
        defaultValue: "'Application menu'",
        description: 'Accessible label for the menubar container (aria-label).',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: 'Orientation of the menubar container.',
      },
      {
        name: 'openMenuId',
        type: 'string | null',
        description: 'Controlled ID of the currently open menu.',
      },
      {
        name: 'onOpenMenuChange',
        type: '(menuId: string | null) => void',
        description: 'Callback fired when the active/open menu changes.',
      },
    ],
  },
];
