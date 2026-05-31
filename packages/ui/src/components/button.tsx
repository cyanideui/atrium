import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"
import { Spinner } from "./spinner"

/**
 * <Button> — Shopify Polaris-style.
 *
 * Separates shape (variant) from intent (tone).
 *   <Button variant="primary" tone="critical">Delete</Button>
 *   <Button variant="secondary">Cancel</Button>
 *   <Button variant="tertiary" tone="success">Mark as paid</Button>
 *   <Button variant="plain">Learn more</Button>
 *
 * Visual conventions match Polaris:
 *   • Subtle vertical gradient + inset highlight (top) + inset shadow (bottom)
 *   • 8px corner radius
 *   • 600 font-weight
 *   • Pressed state inverts the inset highlight to feel like a key press
 */

/**
 * The pressed/active state and gradients can't be expressed cleanly through
 * Tailwind utilities (we'd need arbitrary inset shadows for every variant×tone).
 * Use a small CSS module-style stylesheet keyed by data-attributes instead.
 */
const styles = `
.ds-btn {
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid transparent;
  letter-spacing: -0.005em;
  transform: translateY(0);
  transition:
    background var(--dur-base) var(--ease-standard),
    border-color var(--dur-base) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard),
    color var(--dur-base) var(--ease-standard),
    transform var(--dur-fast) var(--ease-standard),
    outline-offset var(--dur-fast) var(--ease-standard);
}
.ds-btn:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}
/*
 * Pressed: snap INTO the active state (transition ~0ms) so the press feels
 * immediate. Releasing the mouse drops :active and the original transitions
 * carry the button smoothly back to hover/default. Without this snap, a
 * normal-speed click is over before the 150ms background transition finishes,
 * so you never actually see the pressed state — the button looks broken.
 */
.ds-btn:active:not(:disabled) {
  transform: translateY(1px);
  transition-duration: 0ms;
}

/* ---------- PRIMARY ---------- */
.ds-btn[data-variant="primary"][data-tone="default"] {
  background: linear-gradient(180deg, #404040 0%, #1a1a1a 100%);
  color: var(--canvas);
  border-color: #1a1a1a;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.20),
    inset 0 -1px 0 0 rgba(0,0,0,0.30),
    0 1px 0 0 rgba(0,0,0,0.05);
}
.ds-btn[data-variant="primary"][data-tone="default"]:hover {
  background: linear-gradient(180deg, #2e2e2e 0%, #0d0d0d 100%);
  border-color: #0d0d0d;
}
.ds-btn[data-variant="primary"][data-tone="default"]:active {
  background: #1a1a1a;
  box-shadow:
    inset 0 1px 2px 0 rgba(0,0,0,0.4),
    inset 0 -1px 0 0 rgba(255,255,255,0.05);
}

.ds-btn[data-variant="primary"][data-tone="critical"] {
  background: linear-gradient(180deg, #e51c00 0%, #cc1a00 100%);
  color: #ffffff;
  border-color: #b81700;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.25),
    inset 0 -1px 0 0 rgba(0,0,0,0.20),
    0 1px 0 0 rgba(0,0,0,0.05);
}
.ds-btn[data-variant="primary"][data-tone="critical"]:hover {
  background: linear-gradient(180deg, #cc1a00 0%, #a31400 100%);
  border-color: #a31400;
}
.ds-btn[data-variant="primary"][data-tone="critical"]:active {
  background: #a31400;
  box-shadow:
    inset 0 1px 2px 0 rgba(0,0,0,0.3),
    inset 0 -1px 0 0 rgba(255,255,255,0.05);
}

.ds-btn[data-variant="primary"][data-tone="success"] {
  background: linear-gradient(180deg, #1aae39 0%, #0c8b29 100%);
  color: #ffffff;
  border-color: #0c8b29;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.25),
    inset 0 -1px 0 0 rgba(0,0,0,0.18);
}
.ds-btn[data-variant="primary"][data-tone="success"]:hover {
  background: linear-gradient(180deg, #149a31 0%, #0a7a25 100%);
  border-color: #0a7a25;
}
.ds-btn[data-variant="primary"][data-tone="success"]:active {
  background: #0a7a25;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.25);
}

.ds-btn[data-variant="primary"][data-tone="warning"] {
  background: linear-gradient(180deg, #dd5b00 0%, #b84a00 100%);
  color: #ffffff;
  border-color: #b84a00;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.25),
    inset 0 -1px 0 0 rgba(0,0,0,0.18);
}
.ds-btn[data-variant="primary"][data-tone="warning"]:hover {
  background: linear-gradient(180deg, #c75200 0%, #9a3d00 100%);
  border-color: #9a3d00;
}
.ds-btn[data-variant="primary"][data-tone="warning"]:active {
  background: #9a3d00;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.25);
}

.ds-btn[data-variant="primary"][data-tone="info"] {
  background: linear-gradient(180deg, #2563eb 0%, #1e4fc4 100%);
  color: #ffffff;
  border-color: #1e4fc4;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.22),
    inset 0 -1px 0 0 rgba(0,0,0,0.18);
}
.ds-btn[data-variant="primary"][data-tone="info"]:hover {
  background: linear-gradient(180deg, #1e54d4 0%, #173eaa 100%);
  border-color: #173eaa;
}
.ds-btn[data-variant="primary"][data-tone="info"]:active {
  background: #173eaa;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.25);
}

/* ---------- SECONDARY ---------- */
.ds-btn[data-variant="secondary"][data-tone="default"] {
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f7 100%);
  color: var(--ink);
  border-color: var(--hairline-strong);
  box-shadow:
    inset 0 -1px 0 0 rgba(0,0,0,0.04),
    0 1px 0 0 rgba(0,0,0,0.04);
}
.ds-btn[data-variant="secondary"][data-tone="default"]:hover {
  background: linear-gradient(180deg, #f6f6f7 0%, #ebecee 100%);
  border-color: var(--ink-3);
}
.ds-btn[data-variant="secondary"][data-tone="default"]:active {
  background: #ebecee;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.08);
}

/* Tinted secondaries — subtle washes that match Polaris */
.ds-btn[data-variant="secondary"][data-tone="critical"] {
  background: linear-gradient(180deg, #ffffff 0%, #fef2f1 100%);
  color: var(--error);
  border-color: var(--error);
}
.ds-btn[data-variant="secondary"][data-tone="critical"]:hover {
  background: var(--error-tint);
}
.ds-btn[data-variant="secondary"][data-tone="critical"]:active {
  background: #fbd6d4;
  box-shadow: inset 0 1px 2px 0 rgba(0,0,0,0.05);
}

.ds-btn[data-variant="secondary"][data-tone="success"] {
  background: linear-gradient(180deg, #ffffff 0%, #f3fbf5 100%);
  color: var(--success);
  border-color: var(--success);
}
.ds-btn[data-variant="secondary"][data-tone="success"]:hover {
  background: var(--success-tint);
}

.ds-btn[data-variant="secondary"][data-tone="warning"] {
  background: linear-gradient(180deg, #ffffff 0%, #fdf6f0 100%);
  color: var(--warning);
  border-color: var(--warning);
}
.ds-btn[data-variant="secondary"][data-tone="warning"]:hover {
  background: var(--warning-tint);
}

.ds-btn[data-variant="secondary"][data-tone="info"] {
  background: linear-gradient(180deg, #ffffff 0%, #f3f7ff 100%);
  color: var(--info);
  border-color: var(--info);
}
.ds-btn[data-variant="secondary"][data-tone="info"]:hover {
  background: var(--info-tint);
}

/* ---------- DARK OVERRIDES — tinted secondaries ---------- */
.dark .ds-btn[data-variant="secondary"][data-tone="critical"] {
  background: linear-gradient(180deg, #2a2024 0%, #2e1c1f 100%);
  color: var(--error);
}
.dark .ds-btn[data-variant="secondary"][data-tone="success"] {
  background: linear-gradient(180deg, #1c2a22 0%, #1a2e22 100%);
  color: var(--success);
}
.dark .ds-btn[data-variant="secondary"][data-tone="warning"] {
  background: linear-gradient(180deg, #2a241a 0%, #2e2520 100%);
  color: var(--warning);
}
.dark .ds-btn[data-variant="secondary"][data-tone="info"] {
  background: linear-gradient(180deg, #1c2030 0%, #1c2236 100%);
  color: var(--info);
}

/* ---------- TERTIARY (transparent ghost) ---------- */
.ds-btn[data-variant="tertiary"] {
  background: transparent;
  border-color: transparent;
  color: var(--ink-2);
}
.ds-btn[data-variant="tertiary"][data-tone="default"]:hover {
  background: rgba(0,0,0,0.06);
  color: var(--ink);
}
.ds-btn[data-variant="tertiary"][data-tone="default"]:active {
  background: rgba(0,0,0,0.10);
}
.dark .ds-btn[data-variant="tertiary"][data-tone="default"]:hover {
  background: rgba(255,255,255,0.06);
  color: var(--ink);
}
.dark .ds-btn[data-variant="tertiary"][data-tone="default"]:active {
  background: rgba(255,255,255,0.10);
}
.ds-btn[data-variant="tertiary"][data-tone="critical"] { color: var(--error); }
.ds-btn[data-variant="tertiary"][data-tone="critical"]:hover { background: var(--error-tint); }
.ds-btn[data-variant="tertiary"][data-tone="success"]  { color: var(--success); }
.ds-btn[data-variant="tertiary"][data-tone="success"]:hover  { background: var(--success-tint); }
.ds-btn[data-variant="tertiary"][data-tone="warning"]  { color: var(--warning); }
.ds-btn[data-variant="tertiary"][data-tone="warning"]:hover  { background: var(--warning-tint); }
.ds-btn[data-variant="tertiary"][data-tone="info"]     { color: var(--info); }
.ds-btn[data-variant="tertiary"][data-tone="info"]:hover     { background: var(--info-tint); }

/* ---------- PLAIN (text-only link) ---------- */
.ds-btn[data-variant="plain"] {
  background: transparent;
  border-color: transparent;
  height: auto;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  border-radius: 2px;
}
.ds-btn[data-variant="plain"][data-tone="default"] { color: var(--ink); }
.ds-btn[data-variant="plain"][data-tone="critical"] { color: var(--error); }
.ds-btn[data-variant="plain"][data-tone="success"] { color: var(--success); }
.ds-btn[data-variant="plain"][data-tone="warning"] { color: var(--warning); }
.ds-btn[data-variant="plain"][data-tone="info"] { color: var(--info); }
.ds-btn[data-variant="plain"]:hover { text-decoration-thickness: 2px; }

/* ---------- DISABLED ---------- */
.ds-btn:disabled {
  cursor: not-allowed;
  background: linear-gradient(180deg, #f1f1f2 0%, #ebebed 100%);
  color: var(--ink-4);
  border-color: var(--hairline);
  box-shadow: none;
  opacity: 1;
}
.dark .ds-btn:disabled {
  background: linear-gradient(180deg, #1a1a1d 0%, #161618 100%);
  color: var(--ink-4);
  border-color: var(--hairline);
}
.ds-btn[data-variant="tertiary"]:disabled,
.ds-btn[data-variant="plain"]:disabled {
  background: transparent;
  border-color: transparent;
  color: var(--ink-4);
}

/* ---------- DARK MODE ---------- */
.dark .ds-btn[data-variant="primary"][data-tone="default"] {
  background: linear-gradient(180deg, #f4f4f5 0%, #d4d4d6 100%);
  color: #1a1a1a;
  border-color: #b8b8bb;
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.40),
    inset 0 -1px 0 0 rgba(0,0,0,0.10);
}
.dark .ds-btn[data-variant="primary"][data-tone="default"]:hover {
  background: linear-gradient(180deg, #ffffff 0%, #c8c8cc 100%);
  border-color: #a3a3a8;
}
.dark .ds-btn[data-variant="secondary"][data-tone="default"] {
  background: linear-gradient(180deg, #2a2a2e 0%, #1f1f22 100%);
  color: var(--ink);
  border-color: var(--hairline-strong);
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.04),
    inset 0 -1px 0 0 rgba(0,0,0,0.30),
    0 1px 0 0 rgba(0,0,0,0.30);
}
.dark .ds-btn[data-variant="secondary"][data-tone="default"]:hover {
  background: linear-gradient(180deg, #303035 0%, #25252a 100%);
  border-color: var(--ink-3);
}
.dark .ds-btn[data-variant="tertiary"][data-tone="default"]:hover {
  background: rgba(255,255,255,0.06);
  color: var(--ink);
}

/* ---------- SEGMENTED GROUP ----------
 * Selectors live here so they share the cascade with the variant rules above.
 * The ButtonGroup component sets data-segmented on its children. */
.ds-btn[data-segmented] {
  border-radius: 0;
}
.ds-btn[data-segmented]:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.ds-btn[data-segmented]:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.ds-btn[data-segmented] + .ds-btn[data-segmented] {
  margin-left: -1px;
}
/* Bring focused/hovered/pressed cell above its neighbors so its border + ring show */
.ds-btn[data-segmented]:hover,
.ds-btn[data-segmented]:focus-visible,
.ds-btn[data-segmented][aria-pressed="true"] {
  position: relative;
  z-index: 1;
}
/* Selected (pressed) cell: invert insets + flatten gradient (mirrors :active) */
.ds-btn[data-segmented][aria-pressed="true"][data-variant="secondary"][data-tone="default"] {
  background: #ebecee;
  color: var(--ink);
  box-shadow:
    inset 0 1px 2px 0 rgba(0,0,0,0.08),
    inset 0 -1px 0 0 rgba(255,255,255,0.6);
}
.dark .ds-btn[data-segmented][aria-pressed="true"][data-variant="secondary"][data-tone="default"] {
  background: #303035;
  box-shadow:
    inset 0 1px 2px 0 rgba(0,0,0,0.4),
    inset 0 -1px 0 0 rgba(255,255,255,0.04);
}`

let stylesInjected = false
function ensureStyles() {
  if (stylesInjected || typeof document === "undefined") return
  const id = "erp-ds-button-styles"
  if (document.getElementById(id)) {
    stylesInjected = true
    return
  }
  const tag = document.createElement("style")
  tag.id = id
  tag.textContent = styles
  document.head.appendChild(tag)
  stylesInjected = true
}

const buttonVariants = cva(
  [
    "ds-btn", // marker — actual styling in the stylesheet above
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap select-none",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
        plain: "",
      },
      tone: {
        default: "",
        critical: "",
        success: "",
        warning: "",
        info: "",
      },
      size: {
        micro: "px-2 text-[12px]",
        sm: "px-3 text-[12px]",
        md: "px-3 text-[13px]",
        lg: "px-4 text-[14px]",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      tone: "default",
      size: "md",
      block: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      tone = "default",
      size,
      block,
      asChild = false,
      loading = false,
      disabled,
      leading,
      trailing,
      style,
      children,
      ...props
    },
    ref
  ) => {
    React.useEffect(ensureStyles, [])
    const Comp = asChild ? Slot : "button"

    const dataAttrs = {
      "data-variant": variant ?? "primary",
      "data-tone": tone ?? "default",
    } as const

    const spinnerTone =
      variant === "primary"
        ? "inverse"
        : variant === "secondary" && tone !== "default"
          ? (tone as "critical" | "success" | "warning" | "info")
          : "default"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (props.type ?? "button")}
        aria-busy={loading || undefined}
        disabled={disabled ?? loading}
        {...dataAttrs}
        // Density-driven height. Skip for `plain` (text-link buttons render
        // as inline text with `height: auto`). The user's `style` override
        // still wins last.
        style={{
          ...(variant !== "plain" && { height: `var(--density-btn-h-${size ?? "md"})` }),
          ...style,
        }}
        className={cn(buttonVariants({ variant, tone, size, block }), className)}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" tone={spinnerTone} aria-hidden />
        ) : (
          leading
        )}
        {children}
        {!loading && trailing}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { buttonVariants }
