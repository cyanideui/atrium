import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

/**
 * <Kbd> — design.md §5.33
 *
 * Inline keyboard-style hint. Inset shadow gives the etched-key look. Use for
 * shortcut display anywhere in the UI (command palette items, sidebar search
 * triggers, cheatsheet rows, dropdown shortcuts, tutorials).
 *
 * Sizes: `sm` (18px) | `md` (22px, default) | `lg` (28px).
 *
 * `mod` auto-renders the platform-correct modifier — `⌘` on macOS, `Ctrl`
 * elsewhere — so you don't have to detect the platform yourself:
 *
 *   <KbdGroup>
 *     <Kbd mod />
 *     <Kbd>K</Kbd>
 *   </KbdGroup>
 *
 * `Keycap` and `KeycapGroup` are kept as aliases for back-compat — the
 * canonical names are `Kbd` / `KbdGroup` (matches the HTML `<kbd>` element).
 */

const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
const MOD = isMac ? "⌘" : "Ctrl"

const kbdVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center font-mono font-medium text-ink",
    "rounded-md bg-canvas",
    "shadow-[inset_0_-1px_0_var(--hairline-strong),inset_0_0_0_1px_var(--hairline)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[18px] min-w-[18px] px-1 text-[10px]",
        md: "h-[22px] min-w-[22px] px-1.5 text-[11px]",
        lg: "h-7 min-w-[28px] px-2 text-[12px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** Render the platform-correct modifier (⌘ on macOS, Ctrl elsewhere). */
  mod?: boolean
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, mod, children, ...rest }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={cn(kbdVariants({ size }), className)}
      {...rest}
    >
      {mod ? MOD : children}
    </kbd>
  )
)
Kbd.displayName = "Kbd"

/**
 * <KbdGroup> — chains keys with a thin "+" between them.
 *
 *   <KbdGroup>
 *     <Kbd mod />
 *     <Kbd>⇧</Kbd>
 *     <Kbd>P</Kbd>
 *   </KbdGroup>
 *   // → ⌘ + ⇧ + P
 */
export const KbdGroup = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  const items = React.Children.toArray(children).filter(Boolean)
  return (
    <span
      className={cn("inline-flex shrink-0 items-center gap-px", className)}
      {...rest}
    >
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span aria-hidden className="px-px text-[10px] leading-none text-ink-4">
              +
            </span>
          )}
          {child}
        </React.Fragment>
      ))}
    </span>
  )
}
KbdGroup.displayName = "KbdGroup"

/**
 * Parse a shortcut string like "⌘K", "⌘+⇧+P", "Ctrl+K", "⌘ K" into a list of
 * individual keys. Splits on "+" and whitespace; if neither separator is
 * present, splits each glyph (so "⌘K" → ["⌘", "K"]).
 */
function parseShortcut(input: string): string[] {
  const trimmed = input.trim()
  if (!trimmed) return []
  // Explicit separator: split on "+" or whitespace.
  if (/[+\s]/.test(trimmed)) {
    return trimmed
      .split(/[+\s]+/)
      .map((p) => p.trim())
      .filter(Boolean)
  }
  // No separator. If it's a single non-letter token (e.g. "esc", "↵", "?"),
  // keep it intact. Otherwise split per Unicode codepoint so "⌘K" → ["⌘", "K"].
  if (trimmed.length <= 1 || /^[a-zA-Z]+$/.test(trimmed)) return [trimmed]
  return Array.from(trimmed)
}

const MODIFIER_GLYPHS = new Set(["⌘", "⇧", "⌥", "⌃", "ctrl", "shift", "alt", "opt", "option", "meta", "cmd", "command"])

/**
 * <KbdShortcut> — render a shortcut string ("⌘⇧P", "Ctrl+K", "Esc") as a
 * styled key combo. Splits the string into individual `<Kbd>` keys joined by
 * `<KbdGroup>`'s "+" separator. Pass any other ReactNode through unchanged.
 */
export interface KbdShortcutProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** A shortcut string like "⌘K", "Ctrl+K", "Esc", "↵", or any ReactNode. */
  children: React.ReactNode
  size?: VariantProps<typeof kbdVariants>["size"]
}

export function KbdShortcut({
  children,
  size = "sm",
  className,
  ...rest
}: KbdShortcutProps) {
  // Non-string children pass through untouched. Lets consumers compose their
  // own KbdGroup if they need richer markup.
  if (typeof children !== "string") {
    return (
      <span className={cn("inline-flex items-center", className)} {...rest}>
        {children}
      </span>
    )
  }
  const keys = parseShortcut(children)
  if (keys.length === 0) return null
  if (keys.length === 1) {
    return (
      <Kbd size={size} className={className} {...rest}>
        {keys[0]}
      </Kbd>
    )
  }
  return (
    <KbdGroup className={className} {...rest}>
      {keys.map((k, i) =>
        MODIFIER_GLYPHS.has(k.toLowerCase()) || /^[⌘⇧⌥⌃]$/.test(k) ? (
          <Kbd key={i} size={size}>
            {k}
          </Kbd>
        ) : (
          <Kbd key={i} size={size}>
            {k}
          </Kbd>
        )
      )}
    </KbdGroup>
  )
}
KbdShortcut.displayName = "KbdShortcut"

export { kbdVariants }

/**
 * Back-compat aliases. New code should import `Kbd` / `KbdGroup`.
 *
 * @deprecated Use `Kbd` / `KbdGroup` instead.
 */
export const Keycap = Kbd
/** @deprecated Use `Kbd` / `KbdGroup` instead. */
export const KeycapGroup = KbdGroup
/** @deprecated Use `KbdProps` instead. */
export type KeycapProps = KbdProps
/** @deprecated Use `kbdVariants` instead. */
export const keycapVariants = kbdVariants
