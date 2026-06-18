import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

/**
 * # Input Component
 *
 * An accessible form input component with proper label association, error handling,
 * and ARIA attributes. Supports all standard HTML input types.
 *
 * ## Usage
 *
 * ```tsx
 * import { Input } from '@a11ypros/a11y-ui-components'
 *
 * function MyComponent() {
 *   return (
 *     <Input
 *       label="Email address"
 *       type="email"
 *       required
 *       placeholder="you@example.com"
 *     />
 *   )
 * }
 * ```
 *
 * ## Features
 *
 * - **Label association**: Labels are properly associated with inputs using \`htmlFor\` and \`id\`
 * - **Error handling**: Error messages are announced to screen readers via ARIA
 * - **Helper text**: Optional helper text for additional context
 * - **Required indicators**: Visual and ARIA indicators for required fields
 * - **All input types**: Supports text, email, password, number, tel, url, search, etc.
 *
 * ## Accessibility
 *
 * ### WCAG 2.1/2.2 Compliance
 *
 * - **1.3.1 Info and Relationships**: Proper label-input association via \`htmlFor\` and \`id\`
 * - **2.5.3 Label in Name**: Label text matches accessible name
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes including \`aria-required\`, \`aria-invalid\`, \`aria-describedby\`
 * - **4.1.3 Status Messages**: Error messages announced via ARIA live regions
 *
 * ### Keyboard Interactions
 *
 * | Key | Action |
 * |-----|--------|
 * | **Tab** | Moves focus to the input |
 * | **Shift+Tab** | Moves focus away from the input |
 * | **Enter** | Submits form (if in a form) |
 * | **Arrow keys** | Navigate within input value (for text inputs) |
 *
 * ### Screen Reader Support
 *
 * - Label is announced when input receives focus
 * - Required state is announced ("required")
 * - Error messages are announced when present
 * - Helper text is announced via \`aria-describedby\`
 * - Input type is announced (e.g., "email", "password")
 *
 * ### Focus Management
 *
 * - Focus indicators use 2px solid outline with 2px offset
 * - Focus styles respect \`prefers-reduced-motion\` media query
 * - Error state has distinct focus styling
 * - Focus visible only on keyboard navigation using \`:focus-visible\`
 *
 * ## Best Practices
 *
 * 1. **Always provide a label**: Required for accessibility and usability
 * 2. **Use appropriate input types**: Helps with validation and mobile keyboards
 * 3. **Provide helpful error messages**: Be specific about what went wrong
 * 4. **Use helper text for guidance**: Help users understand what to enter
 * 5. **Mark required fields**: Use \`required\` prop and visual indicator
 *
 * ## Common Pitfalls
 *
 * - Missing label (screen readers can't identify the input)
 * - Using placeholder as label (placeholders disappear and aren't reliable)
 * - Vague error messages (be specific about validation failures)
 * - Not marking required fields (users don't know what's mandatory)
 * - Using wrong input type (affects mobile keyboards and validation)
 *
 * @component
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   required
 *   error={errors.email}
 *   helperText="We'll never share your email"
 * />
 * ```
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom class name for the input',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display and announce',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Standard input with label and placeholder. The label is properly associated
 * with the input for screen readers and clicking the label focuses the input.
 */
export const Default: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

/**
 * Input with error message. Error messages are announced to screen readers
 * and displayed visually below the input. The input is marked as invalid
 * with \`aria-invalid="true"\`.
 */
export const WithError: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    error: 'Please enter a valid email address',
  },
};

/**
 * Input with helper text. Helper text provides additional context or guidance
 * and is associated with the input via \`aria-describedby\`.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
};

/**
 * Required input field. Required fields are marked with \`aria-required="true"\`
 * and display a visual indicator (asterisk) next to the label.
 */
export const Required: Story = {
  args: {
    label: 'Name',
    required: true,
  },
};

/**
 * Disabled input that cannot be edited. Disabled inputs are announced as
 * "disabled" by screen readers and appear visually dimmed.
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    disabled: true,
    defaultValue: 'Cannot edit',
  },
};
