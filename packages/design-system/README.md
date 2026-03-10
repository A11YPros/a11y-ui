# @a11ypros/a11y-ui-components

An accessibility-first React UI component library built with WCAG 2.1/2.2 Level AA compliance. Every component has been carefully crafted by a certified WAS (Web Accessibility Specialist) to ensure your applications are usable by everyone, regardless of their abilities or the assistive technologies they use.

## Features

- ✅ **WCAG 2.1/2.2 Level AA Compliant** - Built with accessibility as a core requirement
- ✅ **TypeScript** - Full TypeScript support with type definitions included
- ✅ **Tree-shakeable** - ES modules with side-effect-free exports for optimal bundle sizes
- ✅ **Keyboard Navigation** - Full keyboard support for all interactive components
- ✅ **Screen Reader Friendly** - Proper ARIA labels and semantic HTML
- ✅ **Focus Management** - Built-in focus trap and focus return utilities
- ✅ **Modern React** - Built for React 18+ with hooks and modern patterns

## Installation

```bash
npm install @a11ypros/a11y-ui-components
```

or

```bash
yarn add @a11ypros/a11y-ui-components
```

## Peer Dependencies

This package requires React 18+ and React DOM 18+:

```bash
npm install react react-dom
```

## Quick Start

### 1. Import CSS

Import the global styles in your application entry point:

```tsx
// In your main CSS file or entry point
import '@a11ypros/a11y-ui-components/styles';
```

Or import component-specific styles:

```tsx
import '@a11ypros/a11y-ui-components/styles/components';
```

### 2. Import and Use Components

```tsx
import { Button, Input, Modal } from '@a11ypros/a11y-ui-components';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Input label="Email" type="email" />
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    </div>
  );
}
```

## Available Components

### Form Components

- **Input** - Accessible text input with label and error handling
- **Textarea** - Multi-line text input
- **Select** - Dropdown select with keyboard navigation
- **Checkbox** - Accessible checkbox with proper labeling
- **Radio** - Radio button group with fieldset support
- **Label** - Accessible form label component
- **Fieldset** - Form fieldset for grouping related inputs

### UI Components

- **Button** - Accessible button with multiple variants
- **Link** - Accessible link component
- **Modal** - Accessible modal dialog with focus trap
- **Tabs** - Keyboard-navigable tab component
- **DataTable** - Accessible data table with sorting

### Hooks

- **useFocusTrap** - Trap focus within a container
- **useFocusReturn** - Return focus to previous element
- **useAriaLive** - Manage ARIA live regions for announcements

### Utilities

- **aria** - ARIA attribute utilities
- **keyboard** - Keyboard event utilities
- **focus** - Focus management utilities

### Design Tokens

- **colors** - Color palette and theme tokens
- **typography** - Typography scale and font tokens
- **spacing** - Spacing scale tokens
- **breakpoints** - Responsive breakpoint tokens
- **motion** - Animation and transition tokens

## Documentation

📚 **[View Full Documentation & Storybook](https://ui.a11ypros.com/storybook)**

Browse all components, see live examples, and explore accessibility features in our interactive Storybook documentation.

## Customization with Design Tokens

The library exports design tokens and utility functions for building custom components while maintaining accessibility standards:

```tsx
import { colors, spacing, typography, breakpoints, motion } from '@a11ypros/a11y-ui-components';

// Use tokens in your custom components
const CustomCard = () => (
  <div
    style={{
      backgroundColor: colors.neutral[50],
      padding: spacing[4],
      borderRadius: spacing[2],
      fontSize: typography.size.base,
    }}
  >
    Custom component using design tokens
  </div>
);
```

### Available Design Tokens

- **colors**: WCAG AA compliant color palettes
  - `primary`, `neutral`, `success`, `warning`, `error`
  - All colors meet 4.5:1 contrast ratio on appropriate backgrounds
- **spacing**: Consistent spacing scale (4px/8px grid system)
- **typography**: Font sizes, weights, line heights
- **breakpoints**: Responsive design breakpoints
- **motion**: Animation durations (respects `prefers-reduced-motion`)

### Accessibility Utilities

Import utility functions to enhance your custom components:

```tsx
import {
  announceToScreenReader,
  generateAriaLabel,
  trapFocus,
  restoreFocus,
  generateFocusRing,
  handleEscape,
  handleArrowKeys,
} from '@a11ypros/a11y-ui-components';

// Example: Custom modal with focus trap
const CustomModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      trapFocus(modalRef.current);
      announceToScreenReader('Dialog opened');
    }
  }, [isOpen]);

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
};
```

All utilities maintain WCAG compliance and follow accessibility best practices.

### Overriding Design Tokens

You can override the default design tokens by customizing CSS custom properties in your application:

```css
/* In your global CSS file */
:root {
  /* Override primary color */
  --color-primary-500: #your-brand-color;
  --color-primary-600: #your-darker-shade;
  --color-primary-700: #your-darkest-shade;

  /* Override spacing */
  --spacing-4: 1.5rem; /* default is 1rem */

  /* Override typography */
  --font-size-base: 1.125rem; /* default is 1rem */
  --font-weight-bold: 600; /* default is 700 */

  /* Override motion */
  --duration-normal: 250ms; /* default is 200ms */
}
```

**Important**: When overriding colors, ensure your custom colors maintain WCAG AA contrast ratios:

- **4.5:1** minimum for normal text
- **3:1** minimum for large text (18pt+) and UI components

You can test contrast ratios using tools like:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)

### Available CSS Custom Properties

**Colors:**

- `--color-primary-[50-900]`
- `--color-neutral-[50-900]`
- `--color-success-[500-700]`
- `--color-warning-[500-700]`
- `--color-error-[500-700]`

**Spacing:**

- `--spacing-[0,1,2,3,4,5,6,8,10,12,16,20,24,32]`

**Typography:**

- `--font-size-[xs,sm,base,lg,xl,2xl,3xl,4xl]`
- `--font-weight-[normal,medium,semibold,bold]`
- `--line-height-[tight,normal,relaxed]`

**Motion:**

- `--duration-[fast,normal,slow]`

## Usage Examples

### Form with Validation

```tsx
import { Input, Button, Label } from '@a11ypros/a11y-ui-components';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <form>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        required
      />
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Modal Dialog

```tsx
import { Modal, Button } from '@a11ypros/a11y-ui-components';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
        <p>Are you sure you want to proceed?</p>
        <Button onClick={() => setIsOpen(false)}>Confirm</Button>
      </Modal>
    </>
  );
}
```

## Important Note on Accessibility

> **Note**: While these components are built with accessibility in mind and meet WCAG 2.1/2.2 Level AA standards, **simply using these components does not guarantee an accessible application**. These components are foundational building blocks that must be used properly within the larger consuming application with accessibility in mind.

To ensure your application is truly accessible, consider:

- **Proper Implementation**: Use components according to their documented patterns and accessibility guidelines
- **Application-Level Considerations**: Ensure proper page structure, heading hierarchy, and landmark regions
- **Content Accessibility**: Write clear, descriptive text and provide alternative text for images
- **Testing**: Regularly test your application with keyboard navigation and screen readers
- **User Experience**: Consider the full user journey and how components work together

## Internationalization (i18n)

Currently, all screen reader text and ARIA labels are provided in English. Full i18n support is a high-priority feature coming soon to ensure global accessibility.

## Tree Shaking

This package is fully tree-shakeable. Import only what you need:

```tsx
// ✅ Good - tree-shakeable
import { Button } from '@a11ypros/a11y-ui-components';

// ✅ Also good - import specific utilities
import { useFocusTrap } from '@a11ypros/a11y-ui-components';
```

## TypeScript Support

Full TypeScript definitions are included. No need to install `@types` packages.

```tsx
import { Button, ButtonProps } from '@a11ypros/a11y-ui-components';

const props: ButtonProps = {
  variant: 'primary',
  size: 'medium',
  children: 'Click me',
};
```

## Contributing

Contributions are welcome! Please see our [GitHub repository](https://github.com/ryan0122/a11ypros-components) for contribution guidelines.

## License

MIT © [A11y Pros](https://a11ypros.com)

## Links

- 📦 [npm package](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
- 📚 [Documentation & Storybook](https://ui.a11ypros.com/storybook)
- 🐛 [Issue Tracker](https://github.com/ryan0122/a11ypros-components/issues)
- 💻 [Source Code](https://github.com/ryan0122/a11ypros-components)
