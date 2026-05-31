# shell-doc

The playground's chrome, emptied of content — a Notion-style sidebar + content card layout.

## What you get

- **Sidebar** — brand, search trigger (opens command palette), nav (from `nav.ts`), footer with a settings popover.
- **Content card** — sticky topbar with breadcrumbs (auto-derived from `nav.ts`) + theme toggle + help button.
- **Command palette** — ⌘K / Ctrl+K. Lists your routes + theme/density actions.
- **Keyboard cheatsheet** — `?` opens a shortcuts modal.
- **Shortcut toasts** — confirmation chips when you toggle theme (`T`), cycle density (`D`), collapse sidebar (`B`), or change body width (`W`).

## Files

| File | What it is |
|---|---|
| `src/lib/nav.ts` | **Edit this** — your routes |
| `src/components/app-shell.tsx` | The sidebar + content card. **Edit the brand here.** |
| `src/components/shell-providers.tsx` | Mount once at your root. Owns DensityRoot + Toaster + hotkeys. |
| `src/components/command-palette.tsx` | ⌘K palette |
| `src/components/nav-link-item.tsx` | Router bridge for sidebar links |

Plus the hooks `use-theme`, `use-shortcut-toasts`, `use-global-cheatsheet` (pulled in automatically).

## Wiring it up

**Next.js** (`src/app/layout.tsx`):
```tsx
import { ShellProviders } from "@/components/shell-providers"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellProviders>{children}</ShellProviders>
      </body>
    </html>
  )
}
```

**Vite** (`src/App.tsx`):
```tsx
import { ShellProviders } from "./components/shell-providers"
import { Routes, Route } from "react-router-dom"

export function App() {
  return (
    <ShellProviders>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* … */}
      </Routes>
    </ShellProviders>
  )
}
```

## First edits

1. **`src/lib/nav.ts`** — replace the sample routes with yours.
2. **Brand** in `app-shell.tsx` — change `logo="A"` and `name="Your App"`.
3. Build your pages. The shell handles the chrome.
