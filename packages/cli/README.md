# @cyanideui/cli

Scaffold Atrium-styled apps and copy shell / hook starters from the registry into your project.

Same model as shadcn/ui: the CLI copies **source files** into your repo. You own them — modify freely, no version lock.

## Usage

```bash
# Bootstrap a new app (guides framework setup, adds the shell)
pnpm dlx @cyanideui/cli init

# Add a registry item (and its dependencies) to the current project
atrium add shell-doc

# Browse what's available
atrium list
atrium list hooks
```

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

## Registry items (v1)

| Item | What it is |
|---|---|
| `shell-doc` | The full playground-style chrome — sidebar + content card + topbar + command palette + cheatsheet + shortcut toasts |
| `template-dashboard` | KPI tiles + sparklines + recent-orders table |
| `template-crud-list` | Search + filters + bulk actions + pagination + empty state |
| `template-settings` | Tabbed sectioned form with autosave |
| `template-detail` | Record detail — line items + workflow timeline + drawer inspector |
| `hook-theme` | `useTheme()` backed by a shared external store |
| `hook-shortcut-toasts` | Confirmation chips on theme/density/sidebar/width changes |
| `hook-cheatsheet` | `?` hotkey → shortcuts modal |

## Where the registry lives

The registry ships **inside** this package at `dist/registry/`. The CLI reads from there by default — no network, no auth, works with a private source repo. Override for local dev:

```bash
ATRIUM_REGISTRY=file:./registry atrium list
```
