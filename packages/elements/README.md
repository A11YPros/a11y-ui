# @a11ypros/a11y-ui-elements

Standard, framework-agnostic Web Components (Custom Elements) built for WCAG 2.1/2.2 AA & AAA compliance, full keyboard navigation, and screen reader support.

## Highlights

- **Standard Custom Elements (v1)**: Usable in plain HTML, Vue, Angular, Svelte, Astro, PHP/WordPress, Rails, Django, and React.
- **Light DOM Architecture**: Eliminates the shadow DOM boundary issue for ARIA attributes (`aria-labelledby`, `aria-describedby`, `<label for="...">`).
- **Zero Runtime Dependencies**: 0kB third-party runtime weight.
- **Design Token Compatible**: Uses standard CSS custom properties for theming (light/dark mode).

## Quick Start

### 1. Plain HTML / Static Pages

```html
<!-- Load stylesheets -->
<link rel="stylesheet" href="path/to/@a11ypros/a11y-ui-components/styles/global.css" />
<link rel="stylesheet" href="path/to/@a11ypros/a11y-ui-components/styles/components.css" />

<!-- Load Web Components -->
<script type="module" src="path/to/@a11ypros/a11y-ui-elements/dist/index.js"></script>

<!-- Use elements -->
<a11y-switch label="Dark theme" checked></a11y-switch>
<a11y-button variant="primary">Save Changes</a11y-button>
```

### 2. Vue / Svelte / Angular

Import the package once at app startup:

```ts
import '@a11ypros/a11y-ui-elements';
```

Use in templates:

```vue
<!-- Vue -->
<template>
  <a11y-switch :checked="isEnabled" @change="onToggle" label="Notifications" />
  <a11y-button variant="primary" :loading="isSubmitting">Submit</a11y-button>
</template>
```

```svelte
<!-- Svelte -->
<script>
  import '@a11ypros/a11y-ui-elements';
  let checked = $state(false);
</script>

<a11y-switch label="Airplane Mode" {checked} on:change={(e) => checked = e.detail.checked} />
```

### 3. React 19+

React 19 supports standard Custom Elements natively:

```tsx
import '@a11ypros/a11y-ui-elements';

export function Settings() {
  return (
    <div>
      <a11y-switch label="Sound Effects" checked />
      <a11y-button variant="primary">Submit</a11y-button>
    </div>
  );
}
```

## Available Components in POC

- `<a11y-switch>`: WAI-ARIA Switch pattern with `Space`/`Enter` keyboard toggle, `size` (sm, md, lg), `label-position` (start, end), `error`, and `helper-text`.
- `<a11y-button>`: Native button with `variant` (primary, secondary, ghost, danger), `size` (sm, md, lg), and accessible loading state (`aria-busy="true"` + live region announcement).
