import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "../lib/cn"

/**
 * <Icon> — locked-down wrapper around hugeicons.
 * Enforces the Stroke Rounded variant + 1.75 stroke weight defined in design.md §3.
 *
 * Usage:
 *   import { DashboardSquare01Icon } from "@hugeicons/core-free-icons"
 *   <Icon icon={DashboardSquare01Icon} size="md" />
 */

export const ICON_SIZES = {
  sm: 14,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const

export type IconSize = keyof typeof ICON_SIZES

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "color"> {
  icon: IconSvgElement
  size?: IconSize | number
  /** Override stroke width. Defaults to 1.75 to match the design system. */
  strokeWidth?: number
}

export function Icon({
  icon,
  size = "md",
  strokeWidth = 1.75,
  className,
  ...rest
}: IconProps) {
  const px = typeof size === "number" ? size : ICON_SIZES[size]
  return (
    <HugeiconsIcon
      icon={icon}
      size={px}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...rest}
    />
  )
}
