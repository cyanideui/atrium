# cyanideui

Scaffold Atrium-styled apps and copy components, shells, templates, and hooks from the public registry into your project.

Same model as shadcn/ui: the CLI copies **source files** into your repo. You own them — modify freely, no version lock.

## Usage

```bash
# Add a component (copies source + transitive deps into src/)
npx cyanideui add button

# Bootstrap a new app (guides framework setup, adds the shell)
npx cyanideui init

# Add a registry item (and its dependencies) to the current project
npx cyanideui add shell-doc

# Browse what's available
npx cyanideui list
npx cyanideui list components
```

> `npx` is universal. pnpm / yarn / bun users: `pnpm dlx cyanideui …`, `yarn dlx cyanideui …`, `bunx cyanideui …`.

## Commands

### `atrium init`
Walks you through framework choice (Next.js or Vite + React Router), prints the base scaffold + Tailwind wiring, then optionally runs `atrium add shell-doc`.

### `atrium add <item>`
Copies a registry item into the current project. Resolves transitive registry dependencies (a shell pulls in its hooks), detects your framework, transforms router-specific code, and writes the files. Records what was added in `.atrium/manifest.json`.

Flags:
- `--overwrite` — overwrite existing files without prompting
- `--dry-run` — print the plan, write nothing
- `--framework <next|vite-react-router>` — force a framework instead of auto-detecting

### `atrium list [category]`
Browse the registry. Optional category filter: `shells`, `templates`, `blocks`, `hooks`.

## How framework transforms work

Registry source files wrap framework-specific lines in markers:

```tsx
// @atrium:if next
import Link from "next/link"
// @atrium:endif
// @atrium:if vite-react-router
import { Link } from "react-router-dom"
// @atrium:endif
```

At copy time, the CLI keeps the block matching your framework and strips the rest (markers included). One source file, correct output for each framework. No leftover markers — the CLI refuses to write a file that still contains them.

## Local development

Point the CLI at a local registry instead of GitHub:

```bash
ATRIUM_REGISTRY=file:./registry atrium list
ATRIUM_REGISTRY=file:./registry atrium add shell-doc --dry-run
```

## Registry items

**Components (copy-paste — Path 2, shadcn-style):** all 59 library components are available as copy-paste source. `add button` copies `src/components/ui/button.tsx` + its transitive deps (e.g. `spinner`, `src/lib/utils.ts`) using `@/` aliases. No `@cyanideui/ui` install — the code becomes yours.

```bash
atrium add button
atrium add table badge modal select
atrium add doc-shell          # the full app shell (pulls ~17 components transitively)
```

You can omit the category prefix: `add button` resolves to `component-button`, `add dashboard` → `template-dashboard`, etc.

| Category | Examples |
|---|---|
| `component-*` | All 59 UI components (button, table, modal, select, …) |
| `shell-doc` | Full chrome — sidebar + topbar + palette + shortcuts |
| `template-*` | dashboard, crud-list, settings, detail |
| `hook-*` | theme, shortcut-toasts, cheatsheet |
| `lib-*` | utils (cn), use-scroll-overlay |

## Where the registry lives

The registry ships **inside** this package at `dist/registry/`, and the public source of truth is the raw GitHub URL (the repo is public). The CLI fetches the public URL by default; override for local dev:

```bash
ATRIUM_REGISTRY=file:./registry atrium list
```
