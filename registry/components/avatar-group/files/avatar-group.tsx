import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, type AvatarProps } from "@/components/ui/avatar"

/**
 * <AvatarGroup> — design.md §5.29a
 * Overlapping circles with -8px overlap and a +N counter for overflow.
 */

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarProps["size"]
  /** Maximum number of avatars to render before collapsing the rest into +N. */
  max?: number
  /** Override how the +N counter is rendered. */
  renderOverflow?: (count: number) => React.ReactNode
}

const overlapBySize: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "-space-x-1",
  sm: "-space-x-1.5",
  md: "-space-x-2",
  lg: "-space-x-2.5",
  xl: "-space-x-3",
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size = "md", max, renderOverflow, children, ...rest }, ref) => {
    const items = React.Children.toArray(children).filter(React.isValidElement)
    const visible = max ? items.slice(0, max) : items
    const overflow = max ? items.length - max : 0
    const sz = size ?? "md"

    return (
      <div
        ref={ref}
        className={cn(
          "group/avatars flex flex-row-reverse items-center justify-end",
          overlapBySize[sz],
          className
        )}
        {...rest}
      >
        {overflow > 0 && (
          <div
            className={cn(
              "ring-2 ring-canvas",
              "transition-transform duration-[var(--dur-base)] ease-[var(--ease-emphasis)]",
              "hover:-translate-y-0.5 hover:z-10",
              "group-hover/avatars:[&:not(:hover)]:translate-x-0"
            )}
          >
            {renderOverflow ? (
              renderOverflow(overflow)
            ) : (
              <Avatar size={sz} tone="readonly" name={`+${overflow}`} />
            )}
          </div>
        )}
        {/* Render in reverse so first child sits on top via flex-row-reverse */}
        {[...visible].reverse().map((child, i) => (
          <div
            key={(child as React.ReactElement<{ key?: string }>).key ?? i}
            className={cn(
              "ring-2 ring-canvas rounded-pill",
              // Lift on hover and bring above neighbors. Subtle, Polaris-style.
              "transition-transform duration-[var(--dur-base)] ease-[var(--ease-emphasis)]",
              "hover:-translate-y-0.5 hover:z-10 cursor-pointer"
            )}
          >
            {React.cloneElement(child as React.ReactElement<AvatarProps>, {
              size: sz,
            })}
          </div>
        ))}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"
