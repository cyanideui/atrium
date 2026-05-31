import * as React from "react"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "../lib/cn"
import { Icon } from "./icon"
import { Kbd } from "./kbd"
import { toast } from "./toaster"

/**
 * <ShortcutHint> — design.md §5.x
 *
 * A compact pill chip that confirms a keyboard shortcut just landed.
 * Shape: `[icon 14] · label · | · <Kbd>K</Kbd>`. Roughly 28–32 px tall,
 * auto-width, single line, hairline border, soft elevation. Reads as
 * ambient confirmation — much smaller footprint than a full toast.
 *
 * Inspired by Linear / Raycast / Notion's shortcut feedback chips.
 *
 * Two ways to use it:
 *
 *   1. **Direct render** — drop it into any UI to display a hotkey
 *      affordance (e.g. inline help, empty-state hints).
 *
 *      <ShortcutHint icon={Sun02Icon} label="Light mode" shortcut="T" />
 *
 *   2. **As a toast** — pair with `shortcutToast()` to fire the chip via
 *      Sonner with sensible defaults (1500 ms, dedup id, unstyled wrapper).
 *
 *      shortcutToast({ id: "theme", icon: Sun02Icon, label: "Light mode", shortcut: "T" })
 *
 * `tone` lets you tint the chip per intent. Defaults to `default` (neutral
 * canvas + hairline). Other tones use the existing token palette.
 */

export type ShortcutHintTone = "default" | "info" | "success" | "warning" | "critical"

export interface ShortcutHintProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hugeicon to render as a leading glyph. */
  icon?: IconSvgElement
  /** Single-line label. Keep it short — this is a chip, not a toast. */
  label: React.ReactNode
  /** Shortcut string rendered in a trailing `<Kbd>`. Hide by passing nothing. */
  shortcut?: React.ReactNode
  /** Visual tone. Defaults to `default` (neutral canvas + hairline border). */
  tone?: ShortcutHintTone
  /** Render only the icon + label (no Kbd, no divider). Useful when you
   *  want a generic "ambient confirmation" chip without the keyboard hint. */
  hideShortcut?: boolean
}

/**
 * Per-tone classes. The default tone gets the Polaris-style gradient +
 * inset highlight + elev-2 shadow via `.ds-shortcut-hint` (defined in
 * globals.css). Tinted tones keep their flat tone-bg backgrounds so the
 * color reads cleanly — adding a gradient on top of an already-tinted
 * surface would muddy it.
 *
 * Tinted tones also keep `shadow-elev-2` here at the Tailwind layer; the
 * default tone's shadow is owned by `.ds-shortcut-hint` so we don't
 * double-stack.
 */
const TONE: Record<ShortcutHintTone, string> = {
  default: "ds-shortcut-hint",
  info: "border-transparent bg-tone-info-bg text-tone-info-fg shadow-elev-2",
  success: "border-transparent bg-tone-success-bg text-tone-success-fg shadow-elev-2",
  warning: "border-transparent bg-tone-attention-bg text-tone-attention-fg shadow-elev-2",
  critical: "border-transparent bg-tone-critical-bg text-tone-critical-fg shadow-elev-2",
}

const ICON_TONE: Record<ShortcutHintTone, string> = {
  default: "text-ink-2",
  info: "text-tone-info-fg",
  success: "text-tone-success-fg",
  warning: "text-tone-attention-fg",
  critical: "text-tone-critical-fg",
}

export const ShortcutHint = React.forwardRef<HTMLDivElement, ShortcutHintProps>(
  (
    {
      className,
      icon,
      label,
      shortcut,
      tone = "default",
      hideShortcut,
      ...rest
    },
    ref,
  ) => {
    const showShortcut = !hideShortcut && shortcut !== undefined
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-auto inline-flex h-8 items-center gap-2 rounded-pill border px-3 text-[12.5px]",
          TONE[tone],
          className,
        )}
        {...rest}
      >
        {icon && <Icon icon={icon} size={14} className={cn("shrink-0", ICON_TONE[tone])} aria-hidden />}
        <span className="font-medium leading-none">{label}</span>
        {showShortcut && (
          <>
            <span aria-hidden className="ml-0.5 h-3 w-px bg-current opacity-20" />
            <Kbd size="sm">{shortcut}</Kbd>
          </>
        )}
      </div>
    )
  },
)
ShortcutHint.displayName = "ShortcutHint"

/* ----------------- Toast helper ----------------- */

export interface ShortcutToastOptions extends ShortcutHintProps {
  /** Stable Sonner id so cycling fast replaces in-flight toasts instead of
   *  stacking. Required for dedup. */
  id: string
  /** Auto-dismiss duration in ms. Default 1500 — chips don't need long. */
  duration?: number
  /** Override toaster position. Default `bottom-center` so shortcut
   *  confirmations don't compete with notification-style top-center toasts. */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
}

/**
 * Fire a `<ShortcutHint>` as a Sonner toast. Two things matter for a clean
 * pill render:
 *
 *   1. `unstyled: true` skips Sonner's INTERNAL default styles.
 *   2. The `classNames.toast` override resets the user-supplied global
 *      `<Toaster>` classes (the 360-px-wide rounded card, padding, shadow,
 *      tone backgrounds). Without this, our chip renders inside a card.
 *
 * Together they produce a chip that paints alone on the page, no host
 * frame around it.
 *
 * Position defaults to `bottom-center` so shortcut confirmations don't
 * fight with notification-style toasts at top-center. Override per-call
 * if you need to.
 */
export function shortcutToast(opts: ShortcutToastOptions) {
  const { id, duration = 1500, position = "bottom-center", ...chipProps } = opts
  toast.custom(() => <ShortcutHint {...chipProps} />, {
    id,
    duration,
    position,
    unstyled: true,
    classNames: {
      // `!` prefixes force these to win over the global classNames.toast
      // declared on `<Toaster>`. Strategy: keep Sonner's default 360 px
      // toast slot (so the chip stays centered with the rest of the
      // toaster column) but strip every visual — background, border,
      // shadow, padding, radius, tone backgrounds — and center the chip
      // inside the now-invisible slot via `flex justify-center`.
      //
      // We tried `!w-auto !min-w-0` first; that shrunk the slot but
      // pinned the chip to the slot's left edge, sliding it off-center.
      toast:
        "!bg-transparent !border-0 !shadow-none !p-0 !rounded-none flex !justify-center",
    },
  })
}
