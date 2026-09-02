# @a11ypros/a11y-ui-elements

[![npm version](https://img.shields.io/npm/v/@a11ypros/a11y-ui-elements.svg?color=0e8168)](https://www.npmjs.com/package/@a11ypros/a11y-ui-elements)
[![npm downloads](https://img.shields.io/npm/dm/@a11ypros/a11y-ui-elements.svg?color=0e8168)](https://www.npmjs.com/package/@a11ypros/a11y-ui-elements)
[![WCAG 2.1 AAA](https://img.shields.io/badge/WCAG%202.1-AA%20%2F%20AAA-success.svg?color=0e8168)](https://ui.a11ypros.com/accessibility)
[![Storybook Playground](https://img.shields.io/badge/Storybook-Playground-ff69b4.svg)](https://ui.a11ypros.com/storybook-static/index.html?path=/docs/web-components-button--docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Standard, framework-agnostic Web Components (Custom Elements v1) built for WCAG 2.1/2.2 Level AA & AAA compliance, keyboard navigation, and screen reader support.

🌐 **Live Documentation & Demos**: [https://ui.a11ypros.com](https://ui.a11ypros.com)  
🎨 **Storybook Playground**: [https://ui.a11ypros.com/storybook-static/index.html](https://ui.a11ypros.com/storybook-static/index.html?path=/docs/web-components-button--docs)

> **Building with React?**  
> Check out [**`@a11ypros/a11y-ui-components`**](https://www.npmjs.com/package/@a11ypros/a11y-ui-components) ([GitHub](../design-system)) — our dedicated React component library with custom hooks, focus traps, and full TypeScript typing.

---

## Highlights

- **Standard Custom Elements (v1)**: Works natively in plain HTML, Vue, Angular, Svelte, Astro, Solid, PHP/WordPress, Rails, Django, and React 19+.
- **Light DOM Architecture**: Eliminates shadow DOM boundaries for form association (`<form>`, `<label for="...">`) and cross-element ARIA references (`aria-labelledby`, `aria-describedby`).
- **Zero Runtime Dependencies**: 0 kB third-party runtime overhead.
- **Accessible by Default**: Keyboard focus management, ARIA live regions, and high-contrast / reduced-motion support built in.
- **Design Token System**: Uses standard CSS custom properties (`--a11y-*`) with seamless light and dark theme support.

---

## Installation

```bash
npm install @a11ypros/a11y-ui-elements
```

or with yarn / pnpm:

```bash
yarn add @a11ypros/a11y-ui-elements
# or
pnpm add @a11ypros/a11y-ui-elements
```

---

## Quick Start

### 1. Include Styles

Import the component and design token styles:

```ts
import '@a11ypros/a11y-ui-elements/dist/styles.css';
```

Or via `<link>` in HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/@a11ypros/a11y-ui-elements/dist/styles.css" />
```

### 2. Register & Use Elements

#### Option A: Register All Elements

```ts
import '@a11ypros/a11y-ui-elements';
```

#### Option B: Tree-Shaken Subpath Imports

```ts
import '@a11ypros/a11y-ui-elements/button';
import '@a11ypros/a11y-ui-elements/modal';
import '@a11ypros/a11y-ui-elements/switch';
```

#### Option C: Plain HTML / CDN

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="https://unpkg.com/@a11ypros/a11y-ui-elements/dist/styles.css" />
    <script
      type="module"
      src="https://unpkg.com/@a11ypros/a11y-ui-elements/dist/bundle.js"
    ></script>
  </head>
  <body>
    <a11y-button variant="primary">Click Me</a11y-button>
    <a11y-switch label="Dark Mode" checked></a11y-switch>
  </body>
</html>
```

---

## Framework Integration Examples

### Vue 3

```vue
<script setup>
import '@a11ypros/a11y-ui-elements';
import { ref } from 'vue';

const isChecked = ref(false);
</script>

<template>
  <a11y-switch
    :checked="isChecked"
    @change="isChecked = $event.detail.checked"
    label="Email Alerts"
  />
  <a11y-button variant="primary">Submit</a11y-button>
</template>
```

### Svelte

```svelte
<script>
  import '@a11ypros/a11y-ui-elements';
  let open = false;
</script>

<a11y-button variant="secondary" on:click={() => open = true}>Open Dialog</a11y-button>
<a11y-modal title="Notice" {open} on:close={() => open = false}>
  <p>Accessible modal with native dialog backing and focus trapping.</p>
</a11y-modal>
```

### React 19+

```tsx
import '@a11ypros/a11y-ui-elements';

export function Header() {
  return (
    <nav>
      <a11y-button variant="primary">Save Changes</a11y-button>
      <a11y-switch label="Airplane Mode" />
    </nav>
  );
}
```

---

## Component Suite

| Element             | Description                                                                                              | Keyboard / A11y Features                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `<a11y-button>`     | Primary, secondary, ghost, danger buttons                                                                | Accessible loading states, `aria-busy`, live announcements                     |
| `<a11y-switch>`     | WAI-ARIA Switch toggle                                                                                   | `Space`/`Enter` activation, `role="switch"`, `aria-checked`                    |
| `<a11y-modal>`      | Dialog overlay                                                                                           | Native `<dialog>`, focus trap, `Escape` key dismiss, focus return              |
| `<a11y-accordion>`  | Expandable disclosure sections                                                                           | `Enter`/`Space` expand, `aria-expanded`, single/multi-expand                   |
| `<a11y-tabs>`       | Tabbed navigation                                                                                        | Arrow key roving tab navigation, `role="tablist"`, `aria-selected`             |
| `<a11y-data-table>` | Data table with sortable headers                                                                         | In-place sorting, row selection, `aria-sort`, screen reader alerts             |
| `<a11y-tooltip>`    | Contextual popup hint                                                                                    | Focus/hover activation, `Escape` dismiss, `role="tooltip"`, `aria-describedby` |
| `<a11y-banner>`     | Info, success, warning, error banner                                                                     | Alert roles (`role="alert"`, `role="status"`), dismissible                     |
| `<a11y-link>`       | Accessible hyperlink                                                                                     | External link warnings, screen-reader-only labels, high contrast               |
| `<a11y-menu>`       | Dropdown menu                                                                                            | Arrow key navigation, `Enter`/`Space` activation, submenus                     |
| `<a11y-menubar>`    | Application menu bar                                                                                     | Horizontal arrow key roving, WAI-ARIA menubar pattern                          |
| **Form Suite**      | `<a11y-input>`, `<a11y-textarea>`, `<a11y-select>`, `<a11y-checkbox>`, `<a11y-radio>`, `<a11y-fieldset>` | Native form association, validation errors, helper text, live regions          |

---

## Related Packages

- [**`@a11ypros/a11y-ui-components`**](https://www.npmjs.com/package/@a11ypros/a11y-ui-components) — The native React component library version of this design system.

---

## License

MIT © [Ryan Mack](mailto:ryan@a11ypros.com) / [A11YPros](https://a11ypros.com)
