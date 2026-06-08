import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <SegmentedControl> — design.md §5.2
 *
 * Linear-style sliding-pill selector. The active pill is a single absolutely
 * positioned element that animates between cells via `transform: translateX()
 * scaleX()`, instead of restyling the items themselves. This keeps the
 * animation buttery and avoids any restyle-flash.
 *
 * Sizes (density-aware — heights flow from `--density-seg-h-{sm,md,lg}`, so
 * the control reflows with the active density mode; the values below are the
 * default `compact` scale):
 *   - sm:  22px tall (compact toolbars)
 *   - md:  30px tall (default)
 *   - lg:  38px tall (form headers)
 *
 * Anatomy:
 *   container: bg-surface, radius-lg, p-1
 *   pill:      bg-canvas (flat), radius-md, elev-1, position: absolute
 *   item:      flex-1 text-ink-3, hover text-ink-2, aria-selected text-ink
 *
 * Reduced motion: instant snap (no transform animation) + 80ms text fade.
 */

const sizeMap = {
  sm: { text: "text-[11px]", px: "px-2" },
  md: { text: "text-[12.5px]", px: "px-3" },
  lg: { text: "text-[13.5px]", px: "px-4" },
} as const

export type SegmentedSize = keyof typeof sizeMap

export interface SegmentedOption<V extends string = string> {
  value: V
  label: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Optional badge (number / dot). */
  badge?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps<V extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: SegmentedOption<V>[]
  /** Controlled selected value. */
  value?: V
  /** Initial value when uncontrolled. */
  defaultValue?: V
  onChange?: (value: V) => void
  size?: SegmentedSize
  /** Make the control take the full width of its container. Default: true. */
  block?: boolean
  /** Accessibility label for the radiogroup. */
  ariaLabel?: string
}

/**
 * Internal: pill geometry hook. Given a refs map and the active value, returns
 * `{ left, width }` of the matching cell (relative to the container).
 */
function usePillGeometry<V extends string>(
  containerRef: React.RefObject<HTMLDivElement | null>,
  itemRefs: React.MutableRefObject<Map<V, HTMLButtonElement>>,
  active: V | undefined
) {
  const [geometry, setGeometry] = React.useState<{ left: number; width: number } | null>(null)

  const compute = React.useCallback(() => {
    const container = containerRef.current
    if (!container || !active) return
    const item = itemRefs.current.get(active)
    if (!item) return
    const cRect = container.getBoundingClientRect()
    const iRect = item.getBoundingClientRect()
    setGeometry({ left: iRect.left - cRect.left, width: iRect.width })
  }, [active, containerRef, itemRefs])

  React.useLayoutEffect(() => {
    compute()
  }, [compute])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const obs = new ResizeObserver(() => compute())
    obs.observe(container)
    itemRefs.current.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [compute, containerRef, itemRefs])

  return geometry
}

export function SegmentedControl<V extends string = string>({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  block = true,
  ariaLabel = "Selection",
  className,
  ...rest
}: SegmentedControlProps<V>) {
  // Uncontrolled state if value not provided.
  const [internal, setInternal] = React.useState<V | undefined>(
    defaultValue ?? options[0]?.value
  )
  const isControlled = value !== undefined
  const active = (isControlled ? value : internal) as V | undefined

  const setActive = React.useCallback(
    (v: V) => {
      if (!isControlled) setInternal(v)
      onChange?.(v)
    },
    [isControlled, onChange]
  )

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const itemRefs = React.useRef<Map<V, HTMLButtonElement>>(new Map())

  // Track whether the user has interacted yet — first paint should not animate.
  const [interacted, setInteracted] = React.useState(false)

  const geometry = usePillGeometry(containerRef, itemRefs, active)
  const s = sizeMap[size]

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!active) return
    const idx = options.findIndex((o) => o.value === active)
    if (idx === -1) return
    let next = idx
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % options.length
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (idx - 1 + options.length) % options.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = options.length - 1
    else return
    e.preventDefault()
    let cursor = next
    // Skip disabled items in the chosen direction.
    while (options[cursor]?.disabled) {
      cursor = (cursor + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + options.length) % options.length
      if (cursor === idx) return
    }
    setInteracted(true)
    const opt = options[cursor]
    if (opt) {
      setActive(opt.value)
      itemRefs.current.get(opt.value)?.focus()
    }
  }

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        // Radius matches the playground customizer's segmented control:
        // rounded-lg (12px) track, rounded-md (8px) pill + items.
        "relative inline-flex items-center rounded-lg bg-surface p-1",
        block && "w-full",
        className
      )}
      {...rest}
    >
      {/* Sliding pill — flat fill (bg-canvas + elev-1, set in .ds-segmented-pill)
          so the active segment matches the customizer's pill rather than the
          Polaris button gradient. */}
      {geometry && (
        <span
          aria-hidden
          className={cn(
            "ds-segmented-pill pointer-events-none absolute rounded-md",
            interacted
              ? "transition-[transform,width] duration-[var(--dur-slide)] ease-[var(--ease-emphasis)]"
              : "transition-none",
            // Reduced motion: snap (no transform transition).
            "motion-reduce:transition-none"
          )}
          style={{
            // Container has p-1 = 4px → place pill at top:4px, height = container - 8px.
            top: 4,
            bottom: 4,
            left: 0,
            width: geometry.width,
            transform: `translateX(${geometry.left}px)`,
          }}
        />
      )}

      {options.map((opt) => {
        const isActive = active === opt.value
        return (
          <button
            key={opt.value}
            ref={(el) => {
              if (el) itemRefs.current.set(opt.value, el)
              else itemRefs.current.delete(opt.value)
            }}
            type="button"
            role="radio"
            tabIndex={isActive ? 0 : -1}
            aria-checked={isActive}
            aria-disabled={opt.disabled || undefined}
            disabled={opt.disabled}
            onClick={() => {
              if (opt.disabled) return
              setInteracted(true)
              setActive(opt.value)
            }}
            style={{ height: `var(--density-seg-h-${size})` }}
            className={cn(
              "relative z-[1] inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md",
              "font-medium",
              "transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1 focus-visible:ring-offset-surface",
              s.text,
              s.px,
              isActive
                ? "text-ink"
                : "text-ink-3 hover:text-ink-2",
              opt.disabled && "cursor-not-allowed text-ink-4 hover:text-ink-4"
            )}
          >
            {opt.icon && <span className="flex shrink-0 items-center">{opt.icon}</span>}
            <span className="min-w-0 truncate">{opt.label}</span>
            {opt.badge && <span className="shrink-0">{opt.badge}</span>}
          </button>
        )
      })}
    </div>
  )
}
SegmentedControl.displayName = "SegmentedControl"
