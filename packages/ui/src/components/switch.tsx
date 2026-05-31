import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "../lib/cn"

/**
 * <Switch> — design.md §5.4 (renamed from Toggle in v3.9, gradient pass v3.22)
 *
 * Track 32×18 with Polaris-style gradient + inset insets. Thumb 14×14 with its
 * own gradient + inset highlight, sliding on `--ease-emphasis`.
 *
 * The gradient/inset look comes from `.ds-switch` rules in globals.css so it
 * picks up dark-mode swaps automatically. Tones (success, warning, critical,
 * info) override the on-state track gradient via data-tone attribute selectors.
 */

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Tone overrides the on-state track color. */
  tone?: "default" | "success" | "warning" | "critical" | "info"
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, tone = "default", style, ...rest }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    data-tone={tone}
    style={{
      width: "var(--density-switch-track-w)",
      height: "var(--density-switch-track-h)",
      ...style,
    }}
    className={cn(
      "ds-switch peer inline-flex shrink-0 cursor-pointer items-center rounded-pill",
      "transition-[background,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...rest}
  >
    <SwitchPrimitive.Thumb
      // Thumb sizing + slide distance ride the same density tokens as the
      // track. The translate offset is stored on a CSS variable so the
      // checked state can pick it up via `translate-x-[var(--…)]` (Tailwind
      // arbitrary value).
      style={{
        width: "var(--density-switch-thumb-size)",
        height: "var(--density-switch-thumb-size)",
      }}
      className={cn(
        "ds-switch-thumb pointer-events-none block rounded-pill",
        "transition-transform duration-[var(--dur-slide)] ease-[var(--ease-emphasis)]",
        "translate-x-0.5 data-[state=checked]:translate-x-[var(--density-switch-thumb-translate)]"
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = "Switch"
