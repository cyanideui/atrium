import * as React from "react"
import { Button, ShortcutHint, shortcutToast } from "@cyanideui/ui"
import {
  Sun02Icon,
  Moon02Icon,
  Minimize02Icon,
  Maximize02Icon,
  Menu09Icon,
  SidebarLeft01Icon,
  ArrowExpand01Icon,
  Search01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

/**
 * <ShortcutHint> showcase — compact pill chip + Sonner integration.
 *
 * Two angles to demo:
 *   1. The chip as a standalone visual (drop into inline help / empty
 *      states / overlay hints).
 *   2. The chip fired as a toast via `shortcutToast()` — this is how the
 *      playground surfaces hotkey confirmations (T/D/B/W).
 */

export function ShortcutHintPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Shortcut hint"
        status="stable"
        description="Compact pill chip that confirms a keyboard shortcut just landed. Single line, leading icon, label, trailing keycap. Inspired by Linear / Raycast / Notion's shortcut feedback chips."
      />

      <Section title="Anatomy">
        <Demo
          code={`<ShortcutHint icon={Sun02Icon} label="Light mode" shortcut="T" />`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <ShortcutHint icon={Sun02Icon} label="Light mode" shortcut="T" />
            <ShortcutHint icon={Moon02Icon} label="Dark mode" shortcut="T" />
            <ShortcutHint icon={Maximize02Icon} label="Comfortable" shortcut="D" />
            <ShortcutHint icon={SidebarLeft01Icon} label="Sidebar expanded" shortcut="B" />
            <ShortcutHint icon={ArrowExpand01Icon} label="Full width" shortcut="W" />
          </div>
        </Demo>
      </Section>

      <Section
        title="Tones"
        description="Tint the chip per intent. Use sparingly — the default neutral chip is the right choice for ambient hotkey confirmations."
      >
        <Demo
          code={`<ShortcutHint tone="info" icon={Search01Icon} label="Search opened" shortcut="/" />
<ShortcutHint tone="success" icon={CheckmarkCircle02Icon} label="Saved" shortcut={<>⌘S</>} />
<ShortcutHint tone="warning" icon={AlertCircleIcon} label="Unsaved changes" shortcut="Esc" />
<ShortcutHint tone="critical" icon={AlertCircleIcon} label="Action blocked" shortcut="!" />`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <ShortcutHint tone="info" icon={Search01Icon} label="Search opened" shortcut="/" />
            <ShortcutHint tone="success" icon={CheckmarkCircle02Icon} label="Saved" shortcut="S" />
            <ShortcutHint tone="warning" icon={AlertCircleIcon} label="Unsaved changes" shortcut="Esc" />
            <ShortcutHint tone="critical" icon={AlertCircleIcon} label="Action blocked" shortcut="!" />
          </div>
        </Demo>
      </Section>

      <Section
        title="Without keycap"
        description="Hide the trailing keycap with `hideShortcut` for ambient confirmations that aren't tied to a key (e.g. autosave, optimistic UI feedback)."
      >
        <Demo
          code={`<ShortcutHint icon={CheckmarkCircle02Icon} label="Saved" hideShortcut tone="success" />`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <ShortcutHint icon={CheckmarkCircle02Icon} label="Saved" hideShortcut tone="success" />
            <ShortcutHint icon={Search01Icon} label="Found 12 results" hideShortcut tone="info" />
          </div>
        </Demo>
      </Section>

      <Section
        title="As a toast"
        description="Pair with `shortcutToast()` to fire the chip via Sonner with sensible defaults — 1500 ms duration, deduped by id, no surrounding toaster card. The playground uses this for every global hotkey (T / D / B / W)."
      >
        <Demo
          code={`shortcutToast({
  id: "demo:density",
  icon: Minimize02Icon,
  label: "Compact",
  shortcut: "D",
})`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                shortcutToast({
                  id: "demo:theme",
                  icon: Sun02Icon,
                  label: "Light mode",
                  shortcut: "T",
                })
              }
            >
              Fire theme chip
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                shortcutToast({
                  id: "demo:density",
                  icon: Menu09Icon,
                  label: "Compact+",
                  shortcut: "D",
                })
              }
            >
              Fire density chip
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                shortcutToast({
                  id: "demo:saved",
                  icon: CheckmarkCircle02Icon,
                  label: "Saved",
                  shortcut: "S",
                })
              }
            >
              Fire saved chip
            </Button>
          </div>
        </Demo>
      </Section>

      <Section
        title="When to use"
        description="A small confirmation, not a notification."
      >
        <ul className="text-[13px] text-ink-2">
          <li>Confirm a keyboard shortcut landed (theme toggle, density cycle, sidebar collapse).</li>
          <li>Inline keyboard help inside empty states or onboarding flows.</li>
          <li>Hover hints on power-user UI affordances ("press / to search").</li>
          <li className="text-ink-3">
            <strong>Don't</strong> use for messages that need acknowledgment, errors, or anything with an action button — use{" "}
            <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">toast()</code> with a regular Sonner toast for those.
          </li>
        </ul>
      </Section>
    </div>
  )
}
