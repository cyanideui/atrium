import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  InformationCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  AlertCircleIcon,
  MultiplicationSignIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Banner> — design.md §5.7a
 * Inline persistent alert. 4 tones. Supports title + body + actions + dismiss.
 */

const bannerVariants = cva(
  [
    "flex gap-3 rounded-md p-3 px-4 text-[13px] leading-snug",
    "animate-in fade-in-0 slide-in-from-top-1 duration-[var(--dur-base)] ease-[var(--ease-standard)]",
  ],
  {
    variants: {
      tone: {
        info:     "bg-tone-info-bg text-tone-info-fg",
        success:  "bg-tone-success-bg text-tone-success-fg",
        warning:  "bg-tone-attention-bg text-tone-attention-fg",
        critical: "bg-tone-critical-bg text-tone-critical-fg",
      },
      density: {
        default: "items-start",
        compact: "items-center",
      },
    },
    defaultVariants: {
      tone: "info",
      density: "default",
    },
  }
)

const ICON_MAP: Record<NonNullable<BannerProps["tone"]>, IconSvgElement> = {
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  critical: AlertCircleIcon,
}

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  title?: React.ReactNode
  /** Action buttons rendered to the right of the body. */
  actions?: React.ReactNode
  /** Show the × close button. */
  onDismiss?: () => void
  /** Hide the leading icon. */
  iconless?: boolean
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, tone = "info", density, title, children, actions, onDismiss, iconless, ...rest },
    ref
  ) => {
    const TonalIcon = ICON_MAP[tone ?? "info"]
    return (
      <div
        ref={ref}
        role={tone === "critical" ? "alert" : "status"}
        className={cn(bannerVariants({ tone, density }), className)}
        {...rest}
      >
        {!iconless && (
          <Icon
            icon={TonalIcon}
            size="md"
            className="mt-0.5 shrink-0 opacity-80"
            aria-hidden
          />
        )}
        <div className="min-w-0 flex-1">
          {title && (
            <div className="mb-0.5 font-semibold">{title}</div>
          )}
          {children && <div>{children}</div>}
          {actions && (
            <div className="mt-2 flex flex-wrap gap-2">{actions}</div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className={cn(
              "-mr-1 -mt-1 ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-sm",
              "transition-[background-color,opacity,transform] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
              "opacity-70 hover:opacity-100 hover:bg-black/10 active:scale-95 dark:hover:bg-white/10"
            )}
          >
            <Icon icon={MultiplicationSignIcon} size="sm" />
          </button>
        )}
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { bannerVariants }
