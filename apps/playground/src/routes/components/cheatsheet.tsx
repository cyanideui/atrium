import { useState } from "react"
import { Button, KeyboardCheatsheet, useCheatsheetHotkey, Keycap } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const SHORTCUT_GROUPS = [
  {
    title: "Global",
    shortcuts: [
      { keys: ["mod", "K"] as ("mod" | string)[], label: "Open command palette" },
      { keys: ["/"] as ("mod" | string)[], label: "Quick search" },
      { keys: ["?"] as ("mod" | string)[], label: "Open this cheatsheet" },
      { keys: ["T"] as ("mod" | string)[], label: "Toggle theme" },
      { keys: ["B"] as ("mod" | string)[], label: "Toggle sidebar" },
      { keys: ["mod", "Shift", "P"] as ("mod" | string)[], label: "New (primary action)" },
      { keys: ["mod", "S"] as ("mod" | string)[], label: "Save" },
      { keys: ["Esc"] as ("mod" | string)[], label: "Close / cancel" },
    ],
  },
  {
    title: "Table",
    shortcuts: [
      { keys: ["↑", "↓"] as ("mod" | string)[], label: "Navigate rows", context: "Table focus" },
      { keys: ["Space"] as ("mod" | string)[], label: "Toggle selection", context: "Table focus" },
      { keys: ["Enter"] as ("mod" | string)[], label: "Open detail / edit", context: "Table focus" },
      { keys: ["mod", "A"] as ("mod" | string)[], label: "Select all visible", context: "Table focus" },
    ],
  },
  {
    title: "Modal & Drawer",
    shortcuts: [
      { keys: ["Enter"] as ("mod" | string)[], label: "Confirm / submit" },
      { keys: ["Esc"] as ("mod" | string)[], label: "Close / cancel" },
    ],
  },
  {
    title: "Form",
    shortcuts: [
      { keys: ["Tab"] as ("mod" | string)[], label: "Next field", context: "Form focus" },
      { keys: ["Shift", "Tab"] as ("mod" | string)[], label: "Previous field", context: "Form focus" },
      { keys: ["mod", "Enter"] as ("mod" | string)[], label: "Submit form", context: "Form focus" },
    ],
  },
]

export function CheatsheetPage() {
  // Auto-bound to ? key
  const [openHotkey, setOpenHotkey] = useCheatsheetHotkey()
  // Manual open via button
  const [openManual, setOpenManual] = useState(false)

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Keyboard Cheatsheet"
        status="stable"
        description="Modal listing all keyboard shortcuts grouped by context. Auto-binds to the ? key (skipped while typing)."
      />

      <Section title="Try it">
        <Demo
          code={`const [open, setOpen] = useCheatsheetHotkey()
<KeyboardCheatsheet open={open} onOpenChange={setOpen} groups={SHORTCUT_GROUPS} />`}
        >
          <Button onClick={() => setOpenManual(true)}>
            Open cheatsheet
          </Button>
          <span className="text-[12px] text-ink-3">
            …or press <Keycap size="sm">?</Keycap>
          </span>
        </Demo>
      </Section>

      <Section title="Auto-bound via useCheatsheetHotkey()">
        <p className="text-[13px] text-ink-2">
          The <code>useCheatsheetHotkey</code> hook listens for <Keycap size="sm">?</Keycap> globally
          (skipped while typing in inputs). It returns <code>[open, setOpen]</code> like useState.
        </p>
      </Section>

      <KeyboardCheatsheet open={openHotkey} onOpenChange={setOpenHotkey} groups={SHORTCUT_GROUPS} />
      <KeyboardCheatsheet open={openManual} onOpenChange={setOpenManual} groups={SHORTCUT_GROUPS} />
    </div>
  )
}
