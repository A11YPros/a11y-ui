# @a11ypros/a11y-ui-components

[![npm version](https://img.shields.io/npm/v/@a11ypros/a11y-ui-components.svg?color=0e8168)](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
[![npm downloads](https://img.shields.io/npm/dm/@a11ypros/a11y-ui-components.svg?color=0e8168)](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
[![WCAG 2.1 AAA](https://img.shields.io/badge/WCAG%202.1-AA%20%2F%20AAA-success.svg?color=0e8168)](https://ui.a11ypros.com/accessibility)
[![Storybook Playground](https://img.shields.io/badge/Storybook-Playground-ff69b4.svg)](https://ui.a11ypros.com/storybook-static/index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An accessibility-first React UI component library built with WCAG 2.1 / 2.2 Level AA compliance. Every component has been carefully crafted by certified WAS (Web Accessibility Specialist) engineers to ensure your applications are usable by everyone, regardless of abilities or assistive technologies.

🌐 **Live Documentation & Demos**: [https://ui.a11ypros.com](https://ui.a11ypros.com)  
🎨 **Storybook Playground**: [https://ui.a11ypros.com/storybook-static/index.html](https://ui.a11ypros.com/storybook-static/index.html)

---

## Key Features

- ✅ **WCAG 2.1/2.2 AA & AAA Compliant** - Accessibility built in as a core requirement, not an afterthought
- ✅ **TypeScript Native** - Full type safety and inline JSDoc completion
- ✅ **Keyboard Navigable** - Complete keyboard support (`Tab`, `Shift+Tab`, `Arrow Keys`, `Escape`) for all interactive elements
- ✅ **Screen Reader Tested** - Verified with VoiceOver, NVDA, and JAWS with proper ARIA attributes & live regions
- ✅ **Focus Management** - Built-in focus trap, focus return, and visible 3:1 focus ring tokens
- ✅ **Tree-Shakeable & Lightweight** - ESM exports with zero side effects for minimal bundle impact
- ✅ **Modern React** - React 18+ & 19+ compatible

---

## Installation

```bash
npm install @a11ypros/a11y-ui-components
```

or

```bash
yarn add @a11ypros/a11y-ui-components
```

### Peer Dependencies

```bash
npm install react react-dom
```

---

## Quick Start

### 1. Import CSS Styles

Import global component tokens and styles in your application entry point:

```tsx
// In your app root (e.g., layout.tsx, index.tsx, or App.tsx)
import '@a11ypros/a11y-ui-components/styles';
```

Or component-specific styles:

```tsx
import '@a11ypros/a11y-ui-components/styles/components';
```

### 2. Import and Render Components

```tsx
import { Button, Input, Modal } from '@a11ypros/a11y-ui-components';
import { useState } from 'react';

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <h1>Accessible React Application</h1>
      
      <Input 
        label="Work Email" 
        type="email" 
        required 
        placeholder="you@company.com" 
      />

      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Confirm Modal
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Confirm Operation"
      >
        <p>This modal automatically traps keyboard focus and announces to screen readers.</p>
        <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
      </Modal>
    </main>
  );
}
```

---

## Available Components & Utilities

### Form Controls
- **Input** — Accessible text input with label association, description, and error live regions
- **Textarea** — Multi-line text field with dynamic height and ARIA error states
- **Select** — Custom accessible dropdown select with keyboard navigation
- **Checkbox** — Keyboard-toggleable checkbox with custom accessible states
- **Radio / Fieldset** — Radio button group with semantic fieldset and legend wrappers
- **Label** — Accessible form label component with required indicators

### UI & Navigation
- **Button** — Accessible button with primary, secondary, ghost, and danger variants
- **Link** — Accessible link with external indicator support and focus rings
- **Modal** — Dialog overlay with automatic focus trapping, escape key closing, and focus restoration
- **Tabs** — WAI-ARIA 1.2 compliant keyboard-navigable tabs (`ArrowLeft` / `ArrowRight`)
- **DataTable** — Accessible data grid with column sorting indicators

### Accessibility Hooks & Helpers
- **useFocusTrap** — Traps keyboard focus within a container element
- **useFocusReturn** — Restores focus to the triggering element when a modal or popover closes
- **useAriaLive** — Manages ARIA live region announcements dynamically

---

## Customization with Design Tokens

Import pre-tested accessibility design tokens for custom styling:

```tsx
import { colors, spacing, typography, motion } from '@a11ypros/a11y-ui-components';

const CustomBanner = () => (
  <div
    style={{
      backgroundColor: colors.neutral[50],
      padding: spacing[4],
      borderRadius: spacing[2],
      fontSize: typography.size.base,
    }}
  >
    Built with A11Y UI design tokens
  </div>
);
```

---

## Links & Resources

- 🌐 **Documentation**: [https://ui.a11ypros.com](https://ui.a11ypros.com)
- 🎨 **Storybook Playground**: [https://ui.a11ypros.com/storybook-static/index.html](https://ui.a11ypros.com/storybook-static/index.html)
- 📦 **NPM Package**: [https://www.npmjs.com/package/@a11ypros/a11y-ui-components](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
- 💻 **GitHub Repository**: [https://github.com/A11YPros/a11y-ui](https://github.com/A11YPros/a11y-ui)
- 🐛 **Issue Tracker**: [https://github.com/A11YPros/a11y-ui/issues](https://github.com/A11YPros/a11y-ui/issues)

---

## License

MIT © [A11y Pros](https://a11ypros.com)
