import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * <Avatar> — design.md §5.29
 * Single-user primitive. Image > initials > generic icon fallback.
 */

const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-pill font-semibold uppercase",
  {
    variants: {
      size: {
        xs: "h-5 w-5 text-[10px]",
        sm: "h-6 w-6 text-[11px]",
        md: "h-8 w-8 text-[12px]",
        lg: "h-10 w-10 text-[14px]",
        xl: "h-14 w-14 text-[18px]",
      },
      tone: {
        ink:       "bg-ink text-canvas",
        new:       "bg-tone-new-bg text-tone-new-fg",
        info:      "bg-tone-info-bg text-tone-info-fg",
        success:   "bg-tone-success-bg text-tone-success-fg",
        warning:   "bg-tone-warning-bg text-tone-warning-fg",
        attention: "bg-tone-attention-bg text-tone-attention-fg",
        critical:  "bg-tone-critical-bg text-tone-critical-fg",
        readonly:  "bg-tone-readonly-bg text-tone-readonly-fg",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "ink",
    },
  }
)

export interface AvatarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, "children">,
    VariantProps<typeof avatarVariants> {
  src?: string
  name?: string
  alt?: string
  /** Optional indicator dot in the bottom-right corner. */
  status?: "success" | "warning" | "critical" | "info" | "attention" | "default"
}

function getInitials(name?: string): string {
  if (!name) return ""
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("")
}

const STATUS_TONE: Record<NonNullable<AvatarProps["status"]>, string> = {
  success: "bg-success",
  warning: "bg-warning",
  critical: "bg-error",
  info: "bg-info",
  attention: "bg-warning",
  default: "bg-ink-3",
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, tone, src, name, alt, status, ...rest }, ref) => {
  const initials = getInitials(name)
  const ariaLabel = alt ?? name
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, tone }), className)}
      role="img"
      aria-label={ariaLabel}
      {...rest}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={ariaLabel ?? ""}
          className="h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center">
        {initials || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-[55%] w-[55%]" aria-hidden>
            <circle cx="12" cy="9" r="3.5" />
            <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
          </svg>
        )}
      </AvatarPrimitive.Fallback>
      {status && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 right-0 h-2 w-2 rounded-pill ring-2 ring-canvas",
            STATUS_TONE[status]
          )}
        />
      )}
    </AvatarPrimitive.Root>
  )
})
Avatar.displayName = "Avatar"

export { avatarVariants }
