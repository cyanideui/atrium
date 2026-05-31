# Atrium UI v1.0.0

A calm, content-first React component library for ERP and admin apps.
Built with **shadcn/ui patterns + Tailwind v4 + hugeicons (Stroke Rounded)**.
Inspired by Notion (calm surfaces), Shopify Polaris (button chrome & compact tables), Linear (precision motion).

> **Authoritative spec:** [`design.md`](./design.md) is the single source of truth for tokens, components, motion, and accessibility. This README tells you how to run, build, and consume the library.

## Status

- **Stable:** **53 / 53 components** + 4 app templates (Dashboard, CRUD List, Settings, Record Detail) + a Next.js 15 reference consumer.
- **Featured (v1.0.0):** **Renamed** from `@erp-ds/ui` to `@cyanideui/ui`. Plus three new templates, route code-splitting via `React.lazy()`, an a11y spot-check pass, **a real Next.js 15 App Router consumer** at `apps/example-next/`, a `"use client"` banner on the published bundle so it drops into RSC apps without per-component fiddling, **gradient chrome propagated to form triggers** (`<SavedFilters>`, `<DateField>`, `<Select>`) via the new `.ds-trigger` class, and **density mode upgraded to a real first-class system** — three levels (compact-plus / compact / comfortable), forms reflow, `<DensityRoot>` + `<DensityProvider>` + `useDensity()` public API.
- **Featured (v3.23):** Density mode (`D` hotkey), `<TableEmpty>`, `<RouteLoading>` skeleton scaffolds.
- **Featured (v3.22):** Polaris-style gradient chrome propagated to Switch / Segmented / Radio / Checkbox / SidebarSearch.
- **Featured (v3.21):** Command palette polish (sticky group headings, count badges, soft open animation).

## Repo layout

```
.
├─ design.md                       # 📘 Spec source-of-truth (read this first)
├─ packages/
│  └─ ui/                          # @cyanideui/ui — the actual library
│     ├─ src/
│     │  ├─ components/            # button.tsx, badge.tsx, banner.tsx, ...
│     │  ├─ lib/cn.ts
│     │  ├─ lib/use-scroll-overlay.ts
│     │  ├─ styles/
│     │  │  ├─ tokens.css          # Light + dark tokens, density vars, @theme exposure
│     │  │  └─ globals.css         # Base + reset, gradient class definitions
│     │  └─ index.ts               # Public API
│     └─ package.json
└─ apps/
   ├─ playground/                  # @cyanideui/playground (showcase site)
   │  └─ src/
   │     ├─ App.tsx                # Routes (lazy) + Toaster + GlobalCheatsheet
   │     ├─ components/            # Sidebar, CodeBlock, page shells
   │     ├─ routes/
   │     │  ├─ components/         # One showcase page per component
   │     │  └─ templates/          # Dashboard, CRUD List, Settings, Detail
   │     └─ nav.ts                 # Sidebar groups + status flags
   └─ example-next/                # @cyanideui/example-next (Next.js 15 reference)
      └─ src/
         ├─ app/                   # App Router: /, /orders, /settings
         └─ components/            # AppShell + ShellProviders (Next/Link wired)
```

Plus a copy-paste starter system:

```
├─ packages/cli/                   # @cyanideui/cli — scaffolding CLI
│  └─ src/
│     ├─ commands/                 # init, add, list
│     └─ lib/                      # registry fetch, framework detect, transform
└─ registry/                       # copy-paste starters (shells, hooks)
   ├─ index.json                   # generated browseable index
   ├─ shells/doc-shell/            # the playground chrome, emptied of content
   └─ hooks/                       # theme, shortcut-toasts, cheatsheet
```

## Prerequisites

- Node ≥ 20
- pnpm ≥ 9 (`corepack enable`)

## Getting started

```bash
pnpm install
pnpm dev
```

Opens the playground at http://localhost:5174.

### Other scripts

```bash
pnpm build            # Build library + playground
pnpm build:ui         # Build only the library (dist/)
pnpm build:playground # Build only the showcase
pnpm build:next       # Build the Next.js example app
pnpm dev:next         # Run the Next.js example at http://localhost:3000
pnpm typecheck        # Typecheck across the whole repo
pnpm --filter @cyanideui/ui test   # Run library tests (Vitest)
```

## Editing components

Components live in `packages/ui/src/components/*.tsx`. Saves trigger HMR — the playground updates instantly.

> **Before marking a component `stable`,** run through the **Component Readiness Checklist** in [`design.md`](./design.md) §1b — it's a hard gate covering visual / layout / a11y / API / docs / verification.

## Adding a new component

1. **Read the spec** in [`design.md`](./design.md) §5.
2. Create `packages/ui/src/components/<name>.tsx`.
3. Export from `packages/ui/src/index.ts`.
4. Wire a lazy route in `apps/playground/src/App.tsx` via `lazyNamed()`.
5. Create the showcase page at `apps/playground/src/routes/components/<name>.tsx` using `<PageHeader>`, `<Section>`, `<Demo>`, `<CodeBlock>`.
6. Flip the `status` from `"todo"` to `"done"` in `apps/playground/src/nav.ts`.
7. **Pass §1b Readiness Checklist** before declaring it stable.

If you hit a gotcha, check **§1c Known Gotchas** in `design.md` first.

## Theming

Light and dark are both first-class. Toggle via the `T` hotkey in the playground, or set programmatically:

```tsx
document.documentElement.classList.toggle("dark")
localStorage.setItem("atrium.theme", "dark")
```

Density mode (compact-plus ↔ compact ↔ comfortable) cycles via the `D` hotkey. Three ways to apply:

```tsx
import { DensityRoot, DensityProvider, useDensityHotkey } from "@cyanideui/ui"

// 1) Global — top of your app
function App() {
  useDensityHotkey()
  return <DensityRoot>{/* your app */}</DensityRoot>
}

// 2) Scoped — override for a subtree
<DensityProvider density="compact-plus">
  <Table>...</Table>
</DensityProvider>
```

You can also drop the bare class on any element (`.ds-density-compact-plus`, `.ds-density-compact`, `.ds-density-comfortable`) — no React context required. Heights, gaps, paddings, and type all scale; radii stay fixed.

Tokens live in `packages/ui/src/styles/tokens.css`. Both palettes are exposed to Tailwind v4 via `@theme inline`, so utilities like `bg-canvas`, `text-ink-2`, `border-hairline-strong`, `bg-tone-success-bg` all work and switch automatically with `<html class="dark">`.

## Starting a new app

The fastest way to get the playground's UI (sidebar + content card + topbar + command palette + shortcuts) into a new app is the CLI:

```bash
# In your new app (after scaffolding with create-next-app / create-vite)
pnpm add @cyanideui/ui @hugeicons/core-free-icons @hugeicons/react
pnpm dlx @cyanideui/cli add shell-doc
```

This copies the shell — sidebar, topbar, command palette, keyboard shortcuts — into your `src/`, transformed for your framework (Next.js or Vite + React Router). Every file is yours to edit. See [`STARTER.md`](./STARTER.md) for the full walkthrough and [`packages/cli/README.md`](./packages/cli/README.md) for the command reference.

```bash
atrium list              # browse available starters
atrium add shell-doc     # the full playground chrome
atrium add hook-theme    # individual hooks
```

## Using @cyanideui/ui in another project

Three integration paths:

### 1. pnpm workspace (sibling app inside this monorepo)

```json
// apps/your-new-app/package.json
{
  "dependencies": {
    "@cyanideui/ui": "workspace:*"
  }
}
```

### 2. `file:` install (sibling project outside this repo)

```bash
pnpm add file:../ledger-ui/packages/ui
```

Updates require `pnpm install` to refresh.

### 3. Private npm publish

```bash
cd packages/ui
pnpm publish --registry https://npm.your-company.com
```

Then in your consumer:

```bash
pnpm add @cyanideui/ui
```

### Consumer setup (any path)

```css
/* Your Tailwind entry */
@import "@cyanideui/ui/styles/globals.css";
```

```tsx
import { Button, Badge, Modal, DatePicker, RouteLoading } from "@cyanideui/ui"
import type { DateRange } from "@cyanideui/ui"  // re-exported from react-day-picker
```

> **Tailwind v4 workspace gotcha:** if you consume the library as a workspace dependency, add `@source` so Tailwind picks up class names from inside the library:
> ```css
> @source "../../packages/ui/src";
> ```
> See `design.md` §1c for the full list of similar gotchas.

### Subpath imports — bundle-size-conscious

The library exposes two subpath entries that ship the heavy components in their own chunks. Import from these directly to avoid pulling cmdk / react-day-picker when you don't need them:

```tsx
// Main entry — pulls almost everything except the two heavy components
import { Button, Modal, Toaster, ShortcutHint } from "@cyanideui/ui"

// Subpath entries — opt-in
import { CommandPalette } from "@cyanideui/ui/command-palette"   // pulls cmdk
import { DatePicker, DateField } from "@cyanideui/ui/date-picker" // pulls react-day-picker
```

The main `@cyanideui/ui` entry still re-exports everything for one-stop convenience — use whichever shape fits your bundle budget.

### Next.js

The published `@cyanideui/ui` bundle ships with `"use client"` at the top of `dist/index.js`. That means **you do not need to add `"use client"` to every page** that imports from the library — Next.js inserts the client boundary automatically at the import site, and pure-prop components (Badge, Sparkline, Avatar, Table) still server-render.

Two adjustments in your Next app:

1. Add to `next.config.js`:
   ```js
   module.exports = { transpilePackages: ['@cyanideui/ui'] }
   ```
2. In your Tailwind v4 entry CSS, add an `@source` line so Tailwind picks up class names from the library's source:
   ```css
   @import "@cyanideui/ui/styles/globals.css";
   @source "../../node_modules/@cyanideui/ui/dist";
   /* — or, in a workspace consumer: */
   @source "../../packages/ui/src";
   ```

A complete reference is at [`apps/example-next/`](./apps/example-next/) — Next.js 15 App Router with three pages (`/`, `/orders`, `/settings`), wired through `next/link` + `usePathname()` for active-state.

```bash
pnpm dev:next     # http://localhost:3000
pnpm build:next   # production build
```

## Implemented (v1.0.0)

**Foundations:** color tokens (light + dark), typography, spacing & radius (8px form-control unification), iconography (hugeicons Stroke Rounded only), density mode (compact ↔ comfortable).

**Stable components — 53 total:**

| Family | Components |
|---|---|
| Actions | Button, ButtonGroup, SegmentedControl, Chip, ClickableChip, DropdownMenu |
| Forms | Input, SearchField, MoneyField, Switch, Checkbox, Label, Textarea, Select, ChoiceList, NumberStepper, FloatingLabelInput, ChipInput, FileUpload, **DatePicker**, **DateField** |
| Feedback | Spinner, Badge, Banner, Skeleton (+ Text/Avatar/Button/Table/List/Card), EmptyState, Progress, ProgressSegmented, ProgressCircle, AutoSaveStatus |
| Overlays | Modal, Drawer, Tooltip, Popover |
| Power-user | Toaster + `toast()`, **ShortcutHint** + `shortcutToast()`, CommandPalette (cmdk), KeyboardCheatsheet, WorkflowTimeline, ImportPreview |
| Navigation | Tabs, Breadcrumbs, Pagination, Stepper, SidebarNav (+ Section, Item, Parent), PageShell |
| App shell | DocShell, DocSidebar (+ Brand, Search, Nav, Footer, User, FooterAction), DocContent, DocPageHeader, DocBody |
| Data display | Table, **TableEmpty**, InlineEdit, StickyTable + StickyColumn, BulkActionsBar, SavedFilters, Sparkline |
| Loading | **RouteLoading** (5 patterns: dashboard, list, detail, form, card) |
| Misc | Avatar, AvatarGroup, Accordion, Keycap, KeycapGroup, **Kbd**, **KbdGroup**, **KbdShortcut** |

Plus four ready-to-clone app templates at `/templates/{dashboard,crud-list,settings,detail}`.

## Versioning

Pre-rename: SemVer at `@erp-ds/ui` v3.x.
Post-rename: reset to **`@cyanideui/ui` 1.0.0** to mark the first stable release under the new name.

For the full version history, see [`design.md`](./design.md).
