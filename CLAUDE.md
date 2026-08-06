# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

npm-workspaces monorepo for `@a11ypros/a11y-ui-components`, an accessibility-first React component library, plus the Next.js docs site deployed to `ui.a11ypros.com`.

- `packages/design-system` — the published library (`@a11ypros/a11y-ui-components`). The only package that gets released.
- `apps/web` — Next.js 15 docs site (`@apps/web`, private, excluded from changesets).
- `.storybook` — root Storybook config; stories are globbed from `packages/design-system/src`.

## Commands

Root scripts delegate with `yarn workspace ...`, so `yarn` must be installed even though the committed lockfile is `package-lock.json` and CI installs with `npm ci`.

```bash
npm run dev              # Next.js docs site on :3000
npm run storybook        # Storybook on :6006
npm run build            # Next.js static export -> apps/web/out
npm run build-storybook  # -> apps/web/public/storybook-static, then fixes asset paths
npm run build:local      # full Netlify-shaped build (Storybook + Next.js export)
npm run format           # Prettier write across the repo
```

Library build and tests run inside the package:

```bash
cd packages/design-system
npm run build            # tsc -> dist, then scripts/copy-css.js copies CSS
npm test                 # vitest run
npm run test:watch
npm run test:coverage    # thresholds enforced: 95% statements/functions/lines, 90% branches
npx vitest run src/components/Button/Button.test.tsx   # single file
npx vitest run -t "renders loading state"              # single test by name
```

There is no repo-wide lint or test script. `apps/web` has `next lint`; type checking happens via the library's `tsc` build (root `tsconfig.json` is `noEmit`).

## Architecture Notes

**The web app consumes `dist`, Storybook consumes `src`.** The package's `main`/`exports` point at `packages/design-system/dist`, so after changing library source you must rebuild the package before the Next.js app picks it up (`next.config.js` lists it in `transpilePackages`). Storybook reads `packages/design-system/src/**/*.stories.tsx` directly and hot-reloads without a build — it's the faster loop for component work.

**CSS is hand-wired, not bundled.** Each component does `import './Button.css'` inside its `.tsx`. `tsc` does not emit CSS, so `scripts/copy-css.js` mirrors every component `.css` plus `src/styles/{global,components}.css` into `dist`. A new component's stylesheet must also be added as an `@import` in `src/styles/components.css`, which is the aggregate consumers load via `@a11ypros/a11y-ui-components/styles/components`.

**Theming is CSS custom properties with inline fallbacks.** Every `var()` carries a fallback (`var(--spacing-2, 0.5rem)`) so components still render when the consumer hasn't imported `global.css`. `src/tokens/*.ts` are TS mirrors of those properties. Light/dark switches on `data-theme` on `<html>`; the Storybook toolbar and `src/test-utils.tsx` both set it.

**The site is fully static — no route handlers, no serverless functions.** `apps/web` uses `output: 'export'`, which cannot host route handlers. The former AI audit endpoint (`app/api/audit/route.ts` plus its `netlify/functions/audit.ts` twin) has been removed along with the `/audit` page, so nothing in the repo needs `ANTHROPIC_API_KEY` and no environment variables are required to build or run. Don't add a route handler under `app/api` — it will break `next build`.

**Storybook ships inside the Next.js export.** It builds into `apps/web/public/storybook-static`, then `scripts/fix-storybook-paths.js` rewrites relative asset paths to `/storybook-static/...` and strips CSP meta tags (CSP for Storybook is set as headers in `netlify.toml`, which needs `unsafe-eval`). Routing lives in `apps/web/public/_redirects`, which takes precedence over `netlify.toml` redirects; order matters there.

**Releases go through changesets.** `.github/workflows/release.yml` runs on push to `main`, and `scripts/validate-changesets.mjs` hard-fails any changeset referencing a package other than `@a11ypros/a11y-ui-components`. `scripts/release-publish.mjs` uses `NPM_TOKEN` when present and npm trusted publishing otherwise. Version bumps to the library need a changeset (`npm run changeset`).

## Component Conventions

Components live in `src/components/<Name>/` with `<Name>.tsx`, `<Name>.css`, `<Name>.stories.tsx`, `<Name>.test.tsx`. Form primitives are flat files under `src/components/Form/`.

- `React.forwardRef` with an exported `<Name>Props` interface extending the matching intrinsic element props, JSDoc on each prop, and a component-level JSDoc block listing the WCAG success criteria it satisfies plus a usage example.
- Shared behavior comes from `src/utils/{aria,keyboard,focus}.ts` and `src/hooks/{useFocusTrap,useFocusReturn,useAriaLive}.ts` — prefer these over re-implementing key handling or focus logic.
- Story `title` follows `Components/<Name>` (`Components/Form/<Name>` for form parts); `@storybook/addon-a11y` runs on every story.
- Tests import from `src/test-utils.tsx`, which registers `jest-axe` matchers, exposes `runAxeTest(container)`, accepts a `theme` render option, and stubs `matchMedia`/`IntersectionObserver`/`ResizeObserver`.

Adding a component touches five places: the component folder, `src/index.ts` exports, the `@import` in `src/styles/components.css`, a docs page at `apps/web/app/(docs)/components/<slug>/`, and entries in `apps/web/app/(docs)/components/component-docs.ts` and `api-reference-data.ts` (the docs nav and API tables are data-driven, including the `storybookPath` deep link).

<!-- a11y-agent-team: start -->

# Accessibility-First Development

This project enforces WCAG AA accessibility standards for all web UI code.

## Hook-Based Enforcement

Accessibility review is enforced by three global hooks:

1. **Proactive detection** (`UserPromptSubmit`) — Detects web projects and injects the delegation instruction on every prompt.
2. **Edit gate** (`PreToolUse`) — Blocks Edit/Write to UI files until accessibility-lead has been consulted. Uses `permissionDecision: "deny"`.
3. **Session marker** (`PostToolUse`) — Unlocks the edit gate after accessibility-lead completes.

If an edit is blocked, delegate to `accessibility-agents:accessibility-lead` first.

## Mandatory Accessibility Check

Before writing or modifying any web UI code - including HTML, JSX, CSS, React components, Tailwind classes, web pages, forms, modals, or any user-facing web content - you MUST:

1. Consider which accessibility specialist agents are needed for the task
2. Apply the relevant specialist knowledge before generating code
3. Verify the output against the appropriate checklists

**Automatic trigger detection:** If a user prompt involves creating, editing, or reviewing any file matching `*.html`, `*.jsx`, `*.tsx`, `*.vue`, `*.svelte`, `*.astro`, or `*.css` - or if the prompt describes building UI components, pages, forms, or visual elements - treat it as a web UI task and apply the Decision Matrix below.

## Available Specialist Agents

| Agent                         | When to Use                                                       |
| ----------------------------- | ----------------------------------------------------------------- |
| accessibility-lead            | Any UI task - coordinates all specialists and runs final review   |
| aria-specialist               | Interactive components, custom widgets, ARIA usage                |
| modal-specialist              | Dialogs, drawers, popovers, overlays                              |
| contrast-master               | Colors, themes, CSS styling, visual design                        |
| keyboard-navigator            | Tab order, focus management, keyboard interaction                 |
| live-region-controller        | Dynamic content updates, toasts, loading states                   |
| forms-specialist              | Forms, inputs, validation, error handling, multi-step wizards     |
| alt-text-headings             | Images, alt text, SVGs, heading structure, page titles, landmarks |
| tables-data-specialist        | Data tables, sortable tables, grids, comparison tables            |
| link-checker                  | Ambiguous link text, "click here"/"read more" detection           |
| cognitive-accessibility       | WCAG 2.2 cognitive SC, COGA guidance, plain language              |
| mobile-accessibility          | React Native, Expo, iOS, Android - touch targets, screen readers  |
| design-system-auditor         | Color token contrast, focus ring tokens, spacing tokens           |
| web-accessibility-wizard      | Full guided web accessibility audit                               |
| document-accessibility-wizard | Document audit for .docx, .xlsx, .pptx, .pdf                      |
| markdown-a11y-assistant       | Markdown audit - links, headings, emoji, tables                   |
| testing-coach                 | Screen reader testing, keyboard testing, automated testing        |
| wcag-guide                    | WCAG 2.2 criteria explanations, conformance levels                |

## Commands

Type `/` followed by a command name to invoke the corresponding specialist directly:

| Command          | Specialist                    | Purpose                                          |
| ---------------- | ----------------------------- | ------------------------------------------------ |
| `/aria`          | aria-specialist               | ARIA patterns - roles, states, properties        |
| `/contrast`      | contrast-master               | Color contrast - ratios, themes, visual design   |
| `/keyboard`      | keyboard-navigator            | Keyboard nav - tab order, focus, shortcuts       |
| `/forms`         | forms-specialist              | Forms - labels, validation, error handling       |
| `/alt-text`      | alt-text-headings             | Images/headings - alt text, hierarchy, landmarks |
| `/tables`        | tables-data-specialist        | Tables - headers, scope, caption, sorting        |
| `/links`         | link-checker                  | Links - ambiguous text detection                 |
| `/modal`         | modal-specialist              | Modals - focus trap, return, escape              |
| `/live-region`   | live-region-controller        | Live regions - dynamic announcements             |
| `/audit`         | web-accessibility-wizard      | Full guided web accessibility audit              |
| `/document`      | document-accessibility-wizard | Document audit - Word, Excel, PPT, PDF           |
| `/markdown`      | markdown-a11y-assistant       | Markdown audit - links, headings, emoji          |
| `/test`          | testing-coach                 | Testing - screen reader, keyboard, automated     |
| `/wcag`          | wcag-guide                    | WCAG reference - criteria explanations           |
| `/cognitive`     | cognitive-accessibility       | Cognitive a11y - COGA, plain language            |
| `/mobile`        | mobile-accessibility          | Mobile - React Native, touch targets             |
| `/design-system` | design-system-auditor         | Tokens - contrast, focus rings, spacing          |

## Decision Matrix

- **New component or page:** Always apply aria-specialist + keyboard-navigator + alt-text-headings. Add forms-specialist for inputs, contrast-master for styling, modal-specialist for overlays, live-region-controller for dynamic updates, tables-data-specialist for data tables.
- **Modifying existing UI:** At minimum apply keyboard-navigator. Add others based on what changed.
- **Code review/audit:** Apply all specialist checklists. Use web-accessibility-wizard for guided audits.
- **Document audit:** Use document-accessibility-wizard for Office and PDF accessibility audits.
- **Mobile app:** Use mobile-accessibility for touch targets, labels, and screen reader compatibility.
- **Cognitive / UX clarity:** Use cognitive-accessibility for WCAG 2.2 SC 3.3.7, 3.3.8, 3.3.9, COGA guidance.
- **Design system / tokens:** Use design-system-auditor to validate color token pairs, focus ring tokens, spacing tokens.
- **Data tables:** Always apply tables-data-specialist.
- **Links:** Always apply link-checker when pages contain hyperlinks.
- **Images or media:** Always apply alt-text-headings.

## Non-Negotiable Standards

- Semantic HTML before ARIA (`<button>` not `<div role="button">`)
- One H1 per page, never skip heading levels
- Every interactive element reachable and operable by keyboard
- Text contrast 4.5:1, UI component contrast 3:1
- No information conveyed by color alone
- Focus managed on route changes, dynamic content, and deletions
- Modals trap focus and return focus on close
- Live regions for all dynamic content updates

For tasks that do not involve any user-facing web content (backend logic, scripts, database work), these requirements do not apply.

<!-- a11y-agent-team: end -->
