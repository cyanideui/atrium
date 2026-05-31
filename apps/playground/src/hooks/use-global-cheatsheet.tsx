import * as React from "react"
import { KeyboardCheatsheet, useCheatsheetHotkey } from "@atrium/ui"

const GROUPS = [
  {
    title: "Global",
    shortcuts: [
      { keys: ["mod", "K"] as ("mod" | string)[], label: "Open command palette" },
      { keys: ["?"] as ("mod" | string)[], label: "Open this cheatsheet" },
      { keys: ["B"] as ("mod" | string)[], label: "Toggle sidebar" },
      { keys: ["W"] as ("mod" | string)[], label: "Toggle body width" },
      { keys: ["T"] as ("mod" | string)[], label: "Toggle theme" },
      { keys: ["D"] as ("mod" | string)[], label: "Cycle density (compact+ → compact → comfortable)" },
      { keys: ["Esc"] as ("mod" | string)[], label: "Close / cancel" },
    ],
  },
]

/**
 * Wires the global ? hotkey to a Cheatsheet modal.
 *
 * Two flavours:
 *   - <GlobalCheatsheet /> (uncontrolled, mounts its own state)
 *   - <GlobalCheatsheet open={...} onOpenChange={...} /> (controlled, lets the
 *     surrounding shell open it from a button click)
 */
export interface GlobalCheatsheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function GlobalCheatsheet({ open: cOpen, onOpenChange }: GlobalCheatsheetProps = {}) {
  const [internalOpen, setInternalOpen] = useCheatsheetHotkey()

  // Sync the ? hotkey into the controlled prop when used in controlled mode.
  React.useEffect(() => {
    if (cOpen === undefined) return
    if (internalOpen !== cOpen) onOpenChange?.(internalOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalOpen])

  const open = cOpen ?? internalOpen
  const setOpen = (v: boolean) => {
    setInternalOpen(v)
    onOpenChange?.(v)
  }

  return <KeyboardCheatsheet open={open} onOpenChange={setOpen} groups={GROUPS} />
}
