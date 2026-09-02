# @a11ypros/a11y-ui-components

[![npm version](https://img.shields.io/npm/v/@a11ypros/a11y-ui-components.svg?color=0e8168)](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
[![npm downloads](https://img.shields.io/npm/dm/@a11ypros/a11y-ui-components.svg?color=0e8168)](https://www.npmjs.com/package/@a11ypros/a11y-ui-components)
[![WCAG 2.1 AAA](https://img.shields.io/badge/WCAG%202.1-AA%20%2F%20AAA-success.svg?color=0e8168)](https://ui.a11ypros.com/accessibility)
[![Storybook Playground](https://img.shields.io/badge/Storybook-Playground-ff69b4.svg)](https://ui.a11ypros.com/storybook-static/index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An accessibility-first React UI component library built with WCAG 2.1 / 2.2 Level AA compliance. Every component has been carefully crafted by certified WAS (Web Accessibility Specialist) engineers to ensure your applications are usable by everyone, regardless of abilities or assistive technologies.

🌐 **Live Documentation & Demos**: [https://ui.a11ypros.com](https://ui.a11ypros.com)  
🎨 **Storybook Playground**: [https://ui.a11ypros.com/storybook-static/index.html](https://ui.a11ypros.com/storybook-static/index.html)

> **Looking for framework-agnostic Web Components?**  
> Check out [**`@a11ypros/a11y-ui-elements`**](https://www.npmjs.com/package/@a11ypros/a11y-ui-elements) ([GitHub](../elements)) — standard, zero-dependency Custom Elements with 1:1 accessibility parity for Vue, Angular, Svelte, Astro, PHP, or vanilla HTML.

---

## Key Features

- ✅ **WCAG 2.1/2.2 AA & AAA Compliant** - Accessibility built in as a core requirement, not an afterthought
- ✅ **Fully Themeable & Brandable** - Comprehensive `--a11y-*` CSS variable design token contract with out-of-the-box light and dark mode support
- ✅ **TypeScript Native** - Full type safety and inline JSDoc completion
- ✅ **Keyboard Navigable** - Complete keyboard support (`Tab`, `Shift+Tab`, `Arrow Keys`, `Escape`, `Space`) across all interactive components
- ✅ **Screen Reader Tested** - Verified with VoiceOver, NVDA, and JAWS with proper ARIA attributes, live regions, and semantic markup
- ✅ **Focus Management** - Built-in focus trap, focus return, and visible 3:1 focus ring tokens
- ✅ **Assistive Preferences Built In** - Automatic support for `prefers-reduced-motion` and `prefers-contrast`
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

Choose the stylesheet export that best matches your project setup:

**Option A: Full Stylesheet (Recommended)**  
Includes design tokens, CSS reset, focus visible rings, light/dark themes, high-contrast, and reduced-motion rules:

```tsx
// In your app root (e.g., layout.tsx, index.tsx, or App.tsx)
import '@a11ypros/a11y-ui-components/styles';
```

**Option B: Component-Only Styles**  
Includes only structural component styles without global resets or typography defaults (ideal if you already use Tailwind CSS or your own reset):

```tsx
import '@a11ypros/a11y-ui-components/styles/components';
```

### 2. Import and Render Components

```tsx
import { Button, Input, Modal, Switch, Tooltip } from '@a11ypros/a11y-ui-components';
import { useState } from 'react';

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return (
    <main>
      <h1>Accessible React Application</h1>

      <Input label="Work Email" type="email" required placeholder="you@company.com" />

      <Switch
        label="Enable email notifications"
        checked={notifications}
        onChange={setNotifications}
      />

      <Tooltip content="Opens confirmation dialog" position="top">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Confirm Modal
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Operation">
        <p>This modal automatically traps keyboard focus and announces to screen readers.</p>
        <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
      </Modal>
    </main>
  );
}
```

### 3. Accessible Dropdown Menu & Application Menubar

```tsx
import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Menubar,
  Button,
} from '@a11ypros/a11y-ui-components';

// Dropdown Action Menu
export function ActionsMenu() {
  return (
    <Menu trigger={<Button variant="secondary">Actions ▾</Button>}>
      <MenuItem onClick={() => alert('Edit')}>Edit</MenuItem>
      <MenuItem onClick={() => alert('Duplicate')}>Duplicate</MenuItem>
      <MenuItem disabled>Archive (Disabled)</MenuItem>
      <MenuDivider />
      <MenuItem danger onClick={() => alert('Delete')}>
        Delete
      </MenuItem>
    </Menu>
  );
}

// Application Menubar (Desktop-Style Navigation)
export function AppHeader() {
  return (
    <Menubar label="Application menu">
      <Menu trigger={<button type="button">File</button>}>
        <MenuItem shortcut="⌘N" onClick={() => alert('New File')}>
          New File
        </MenuItem>
        <MenuItem shortcut="⌘O" onClick={() => alert('Open')}>
          Open...
        </MenuItem>
        <MenuItem shortcut="⌘S" onClick={() => alert('Save')}>
          Save
        </MenuItem>
        <MenuDivider />
        <MenuItem danger shortcut="⌘Q" onClick={() => alert('Quit')}>
          Quit
        </MenuItem>
      </Menu>

      <Menu trigger={<button type="button">Edit</button>}>
        <MenuItem shortcut="⌘Z" onClick={() => alert('Undo')}>
          Undo
        </MenuItem>
        <MenuItem shortcut="⇧⌘Z" onClick={() => alert('Redo')}>
          Redo
        </MenuItem>
        <MenuDivider />
        <MenuItem shortcut="⌘X">Cut</MenuItem>
        <MenuItem shortcut="⌘C">Copy</MenuItem>
        <MenuItem shortcut="⌘V">Paste</MenuItem>
      </Menu>

      <Menu trigger={<button type="button">View</button>}>
        <MenuItem shortcut="⌘+">Zoom In</MenuItem>
        <MenuItem shortcut="⌘-">Zoom Out</MenuItem>
      </Menu>
    </Menubar>
  );
}
```

> **Note for Next.js App Router (RSC)**: Interactive components (`Modal`, `Tabs`, `Switch`, `Tooltip`, `Select`, `Accordion`, `Menu`, `Menubar`, etc.) manage client-side state and should be imported within `'use client'` files or client boundary wrappers.

---

## Theming & Customization

The library is designed from the ground up to be easily customized to fit your brand identity while guaranteeing WCAG non-text and text contrast standards.

### 1. CSS Custom Properties (`--a11y-*` Contract)

You can override tokens globally on `:root`, per theme, or scoped to specific component containers:

```css
/* Example: Customizing your brand colors, border radius, and typography */
:root {
  /* Brand colors */
  --a11y-color-primary: #6366f1;
  --a11y-color-primary-hover: #4f46e5;
  --a11y-color-primary-active: #4338ca;
  --a11y-color-primary-fg: #ffffff;

  /* Focus ring (WCAG 2.4.7 / 2.4.11 compliant) */
  --a11y-color-focus: #6366f1;
  --a11y-focus-width: 2px;
  --a11y-focus-offset: 2px;

  /* Border radius (change to 0px for sharp corners, or 9999px for rounded pill styles) */
  --a11y-radius: 0.5rem;

  /* Typography */
  --a11y-font-sans: 'Inter', system-ui, sans-serif;
}
```

### Key Theming Tokens

| Token                        | Description                                       | Default (Light) |
| ---------------------------- | ------------------------------------------------- | --------------- |
| `--a11y-color-primary`       | Primary action color                              | `#0369a1`       |
| `--a11y-color-primary-hover` | Hover state for primary actions                   | `#075985`       |
| `--a11y-color-bg`            | Background canvas color                           | `#ffffff`       |
| `--a11y-color-surface`       | Secondary surface/card background                 | `#fafafa`       |
| `--a11y-color-text`          | Primary body and heading text                     | `#171717`       |
| `--a11y-color-text-muted`    | Secondary helper and descriptive text             | `#525252`       |
| `--a11y-color-border`        | Default border color (WCAG 3:1 non-text contrast) | `#767676`       |
| `--a11y-color-focus`         | Accessible focus indicator color                  | `#0ea5e9`       |
| `--a11y-radius`              | Universal corner border radius                    | `0.375rem`      |

### 2. Light & Dark Themes

- **Automatic**: The library automatically matches the user's OS color scheme using `@media (prefers-color-scheme: dark)`.
- **Explicit Toggling**: Set `data-theme="dark"` or `data-theme="light"` on your `<html>` or `<body>` element to force a theme:

```html
<!-- Forced Dark Theme -->
<html data-theme="dark">
  ...
</html>
```

### 3. Reduced Motion & High Contrast

When using `@a11ypros/a11y-ui-components/styles`:

- **Reduced Motion**: Automatically zeroes out transition and animation durations when users enable `prefers-reduced-motion: reduce`.
- **High Contrast**: Elevates borders to `2px` and uses high-visibility focus rings under `prefers-contrast: high`.

### 4. JavaScript Design Tokens

Tokens are also exported as JavaScript/TypeScript constants for CSS-in-JS, Tailwind presets, or inline styles:

```tsx
import { colors, spacing, typography, motion } from '@a11ypros/a11y-ui-components';

const CustomCard = () => (
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

## Available Components & Utilities

### Form Controls

- **Input** — Accessible text input with label association, descriptions, and error live regions
- **Textarea** — Multi-line text field with dynamic height and ARIA error states
- **Select** — Accessible dropdown select with keyboard navigation (`ArrowUp` / `ArrowDown` / `Enter`)
- **Checkbox** — Keyboard-toggleable checkbox with custom accessible states
- **Radio / Fieldset** — Radio button group with semantic fieldset and legend wrappers
- **Switch** — Accessible toggle switch with `role="switch"` and keyboard toggling
- **Label** — Accessible form label component with required indicators

### UI & Navigation

- **Accordion** — WAI-ARIA collapsible disclosure component with keyboard arrow navigation
- **Banner** — Status and alert messaging banner with semantic `role="status"` / `role="alert"`
- **Button** — Accessible button with primary, secondary, ghost, and danger variants
- **DataTable** — Accessible data grid with column sorting indicators
- **Link** — Accessible link with external indicator support and focus rings
- **Menu** — Accessible dropdown action menu with WAI-ARIA menu button pattern, roving tabindex, keyboard shortcuts, and danger states
- **Menubar** — Desktop-style horizontal application menu bar (`role="menubar"`) with roving tabindex, inter-menu keyboard transitions, and hover switching
- **Modal** — Dialog overlay with automatic focus trapping, escape key closing, and focus restoration
- **Tabs** — WAI-ARIA 1.2 compliant keyboard-navigable tabs (`ArrowLeft` / `ArrowRight`)
- **Tooltip** — Floating information popup with `role="tooltip"`, `aria-describedby`, and Escape key dismissal

### Accessibility Hooks

- **`useFocusTrap`** — Traps keyboard focus within a container element (e.g., drawers, modals)
- **`useFocusReturn`** — Restores focus to the triggering element when an overlay closes
- **`useAriaLive`** — Manages dynamic screen reader announcements via live regions

### Accessibility Utilities

- **ARIA**: `announceToScreenReader()`
- **Focus Management**: `trapFocus()`, `getKeyboardFocusableElements()`
- **Keyboard Navigation**: `handleArrowNavigation()`, `isNavigationKey()`

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
