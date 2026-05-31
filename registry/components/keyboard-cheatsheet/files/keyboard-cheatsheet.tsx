import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
} from "@/components/ui/modal"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

/**
 * <KeyboardCheatsheet> — design.md §5.32
 * Modal with grouped shortcut tables. Use `useCheatsheetHotkey()` for the
 * default `?` keybinding (skipped while typing).
 */

export interface CheatsheetShortcut {
  /** Keys: an array, where each entry is either a string (literal key) or
   *  the special token "mod" (which renders as ⌘ on Mac, Ctrl elsewhere). */
  keys: (string | "mod")[]
  label: React.ReactNode
  /** Optional context like "Table focus" — shown below the label. */
  context?: React.ReactNode
}

export interface CheatsheetGroup {
  title: string
  shortcuts: CheatsheetShortcut[]
}

export interface KeyboardCheatsheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CheatsheetGroup[]
  /** Override the title. */
  title?: React.ReactNode
}

export function KeyboardCheatsheet({
  open,
  onOpenChange,
  groups,
  title = "Keyboard shortcuts",
}: KeyboardCheatsheetProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>
            Press <Kbd size="sm">?</Kbd> anytime to open this guide.
          </ModalDescription>
        </ModalHeader>
        <ModalBody className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {groups.map((group) => (
            <section key={group.title}>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                {group.title}
              </h3>
              <ul className="space-y-1.5">
                {group.shortcuts.map((s, i) => (
                  <li
                    key={i}
                    className={cn(
                      "flex items-center justify-between gap-3 text-[13px]"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="text-ink">{s.label}</div>
                      {s.context && (
                        <div className="text-[11px] text-ink-4">{s.context}</div>
                      )}
                    </div>
                    <KbdGroup>
                      {s.keys.map((k, j) =>
                        k === "mod" ? (
                          <Kbd key={j} mod size="sm" />
                        ) : (
                          <Kbd key={j} size="sm">{k}</Kbd>
                        )
                      )}
                    </KbdGroup>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

/**
 * Hook: bind `?` (Shift+/) to toggle the cheatsheet. Skips while typing.
 * Returns `[open, setOpen]`.
 */
export function useCheatsheetHotkey(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return [open, setOpen]
}
