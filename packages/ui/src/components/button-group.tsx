import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

/**
 * <ButtonGroup> — design.md §5.1a
 * Two layouts:
 *   • spaced (default) — 8px gap between children
 *   • segmented        — children join edge-to-edge, share borders, single outer 8px radius
 *
 * For segmented, we tag each Button child with data-segmented so the Button's
 * own stylesheet can apply the joined-cell radii, negative-margin overlap, and
 * z-index lift on hover/focus. Doing it via data-attribute (instead of Tailwind
 * utility overrides) keeps the cascade single-sourced inside button.tsx and
 * avoids specificity wars with the variant gradients.
 */

const groupVariants = cva("inline-flex", {
  variants: {
    layout: {
      spaced: "gap-2",
      segmented: "isolate",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    layout: "spaced",
    align: "start",
  },
})

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupVariants> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, layout, align, children, ...rest }, ref) => {
    const segmented = layout === "segmented"
    const decorated = segmented
      ? React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          const existing = (child.props as { "data-segmented"?: string })[
            "data-segmented"
          ]
          if (existing !== undefined) return child
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            "data-segmented": "",
          })
        })
      : children

    return (
      <div
        ref={ref}
        role="group"
        className={cn(groupVariants({ layout, align }), className)}
        {...rest}
      >
        {decorated}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"
