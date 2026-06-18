import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

/**
 * # Checkbox Component
 *
 * An accessible checkbox component with proper label association, error handling,
 * and ARIA attributes. Supports both controlled and uncontrolled usage.
 *
 * ## Usage
 *
 * ```tsx
 * import { Checkbox } from '@a11ypros/a11y-ui-components'
 *
 * function MyComponent() {
 *   const [checked, setChecked] = useState(false)
 *
 *   return (
 *     <Checkbox
 *       id="agree"
 *       label="I agree to the terms and conditions"
 *       checked={checked}
 *       onChange={(e) => setChecked(e.target.checked)}
 *     />
 *   )
 * }
 * ```
 *
 * ## Features
 *
 * - **Label association**: Labels are properly associated with checkboxes using \`htmlFor\` and \`id\`
 * - **Error handling**: Error messages are announced to screen readers via ARIA
 * - **Helper text**: Optional helper text for additional context
 * - **Keyboard accessible**: Full keyboard support with Space key for toggling
 *
 * ## Accessibility
 *
 * ### WCAG 2.1/2.2 Compliance
 *
 * - **1.3.1 Info and Relationships**: Proper label-checkbox association via \`htmlFor\` and \`id\`
 * - **2.5.3 Label in Name**: Label text matches accessible name
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes including \`aria-required\`, \`aria-invalid\`, \`aria-describedby\`
 *
 * ### Keyboard Interactions
 *
 * | Key | Action |
 * |-----|--------|
 * | **Tab** | Moves focus to the checkbox |
 * | **Shift+Tab** | Moves focus away from the checkbox |
 * | **Space** | Toggles checkbox state |
 * | **Enter** | Toggles checkbox state (in some contexts) |
 *
 * ### Screen Reader Support
 *
 * - Checkbox role and label are announced when focused
 * - Checked state is announced ("checked" or "not checked")
 * - Required state is announced ("required")
 * - Error messages are announced when present
 * - Helper text is announced via \`aria-describedby\`
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
 * 2. **Use for binary choices**: Checkboxes are for independent yes/no choices
 * 3. **Group related checkboxes**: Use Fieldset component to group related options
 * 4. **Provide helpful error messages**: Be specific about what needs to be checked
 * 5. **Use helper text for guidance**: Help users understand the implications of checking
 *
 * ## Common Pitfalls
 *
 * - Missing label (screen readers can't identify the checkbox)
 * - Using checkbox for single choice (use Radio for mutually exclusive options)
 * - Vague error messages (be specific about validation failures)
 * - Not grouping related checkboxes (use Fieldset for logical grouping)
 * - Using wrong element (use Radio for single choice from multiple options)
 *
 * @component
 * @example
 * ```tsx
 * <Checkbox
 *   id="terms"
 *   label="I agree to the terms"
 *   required
 *   error={errors.terms}
 * />
 * ```
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'I agree to the terms and conditions',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
      table: {
        type: { summary: 'string' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state for the checkbox',
      table: {
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom class name for the checkbox',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text providing additional context for the checkbox',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display when the checkbox is in an error state',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Standard checkbox with label. The label is properly associated
 * with the checkbox for screen readers and clicking the label toggles the checkbox.
 */
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="checkbox-default"
        label={args.label}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        {...args}
      />
    );
  },
};

/**
 * Checkbox with error message. Error messages are announced to screen readers
 * and displayed visually below the checkbox. The checkbox is marked as invalid
 * with \`aria-invalid="true"\`.
 */
export const WithError: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="checkbox-error"
        label="I agree to the terms"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        error="You must agree to the terms to continue"
      />
    );
  },
};

/**
 * Checkbox with helper text. Helper text provides additional context or guidance
 * and is associated with the checkbox via \`aria-describedby\`.
 */
export const WithHelperText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="checkbox-helper"
        label="Subscribe to newsletter"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        helperText="Receive weekly updates about new features"
      />
    );
  },
};

/**
 * Required checkbox field. Required checkboxes are marked with \`aria-required="true"\`
 * and display a visual indicator (asterisk) next to the label.
 */
export const Required: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="checkbox-required"
        label="I accept the privacy policy"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        required
      />
    );
  },
};

/**
 * Disabled checkbox that cannot be toggled. Disabled checkboxes are announced as
 * "disabled" by screen readers and appear visually dimmed.
 */
export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    label: 'This option is disabled',
    disabled: true,
    checked: false,
  },
};

/**
 * Checked checkbox state. Shows the checkbox in its checked state.
 */
export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    label: 'This option is selected',
    checked: true,
  },
};

/**
 * Multiple checkboxes grouped together. Use Fieldset component to group
 * related checkboxes for better semantic structure and accessibility.
 */
export const Grouped: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      email: false,
      sms: false,
      push: false,
    });

    const handleChange =
      (key: keyof typeof preferences) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreferences((prev) => ({ ...prev, [key]: e.target.checked }));
      };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          id="pref-email"
          label="Email notifications"
          checked={preferences.email}
          onChange={handleChange('email')}
        />
        <Checkbox
          id="pref-sms"
          label="SMS notifications"
          checked={preferences.sms}
          onChange={handleChange('sms')}
        />
        <Checkbox
          id="pref-push"
          label="Push notifications"
          checked={preferences.push}
          onChange={handleChange('push')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple checkboxes that can be selected independently. For better accessibility, wrap related checkboxes in a Fieldset component.',
      },
    },
  },
};
