import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <Skeleton> family — design.md §5.12
 *   • <Skeleton>          base block, shimmer or pulse
 *   • <SkeletonText>      multi-line paragraph stub
 *   • <SkeletonAvatar>    matches Avatar sizes
 *   • <SkeletonButton>    matches Button sizes
 *   • <SkeletonTable>     rows × cols data-grid stub
 *   • <SkeletonList>      icon + text + meta rows
 *   • <SkeletonCard>      avatar + title + lines + action row
 */

const styleId = "erp-ds-skeleton-styles"
const styles = `
@keyframes ds-skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes ds-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.55; }
}
.ds-skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--surface) 0%,
    var(--surface-2) 50%,
    var(--surface) 100%
  );
  background-size: 200% 100%;
  animation: ds-skeleton-shimmer 1.5s linear infinite;
}
.ds-skeleton-pulse {
  background: var(--surface);
  animation: ds-skeleton-pulse 1.6s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .ds-skeleton-shimmer,
  .ds-skeleton-pulse {
    animation: none;
    background: var(--surface);
  }
}
`

let injected = false
function ensureStyles() {
  if (injected || typeof document === "undefined") return
  if (document.getElementById(styleId)) {
    injected = true
    return
  }
  const tag = document.createElement("style")
  tag.id = styleId
  tag.textContent = styles
  document.head.appendChild(tag)
  injected = true
}

export type SkeletonAnimation = "shimmer" | "pulse"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rect" | "circle" | "pill"
  animation?: SkeletonAnimation
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape = "rect", animation = "shimmer", ...rest }, ref) => {
    React.useEffect(ensureStyles, [])
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          animation === "pulse" ? "ds-skeleton-pulse" : "ds-skeleton-shimmer",
          shape === "rect" && "rounded-sm",
          shape === "pill" && "rounded-pill",
          shape === "circle" && "rounded-pill",
          className
        )}
        {...rest}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

/* ---------- TEXT ---------- */
export interface SkeletonTextProps extends Omit<SkeletonProps, "shape"> {
  lines?: number
  /** Width of the last line — default 60% so it reads as a paragraph. */
  lastLineWidth?: string | number
}

export const SkeletonText = ({
  lines = 3,
  lastLineWidth = "60%",
  animation,
  className,
  ...rest
}: SkeletonTextProps) => (
  <div className={cn("flex flex-col gap-2", className)} {...rest}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        animation={animation}
        className="h-3"
        style={i === lines - 1 ? { width: lastLineWidth } : undefined}
      />
    ))}
  </div>
)
SkeletonText.displayName = "SkeletonText"

/* ---------- AVATAR ---------- */
const avatarSizePx = { xs: 20, sm: 24, md: 32, lg: 40, xl: 56 } as const
export type SkeletonAvatarSize = keyof typeof avatarSizePx

export interface SkeletonAvatarProps extends Omit<SkeletonProps, "shape"> {
  size?: SkeletonAvatarSize
}

export const SkeletonAvatar = ({
  size = "md",
  className,
  style,
  ...rest
}: SkeletonAvatarProps) => {
  const px = avatarSizePx[size]
  return (
    <Skeleton
      shape="circle"
      style={{ width: px, height: px, ...style }}
      className={className}
      {...rest}
    />
  )
}
SkeletonAvatar.displayName = "SkeletonAvatar"

/* ---------- BUTTON ---------- */
const buttonSize = {
  micro: { h: 24, w: 64 },
  sm: { h: 28, w: 72 },
  md: { h: 32, w: 88 },
  lg: { h: 40, w: 104 },
} as const
export type SkeletonButtonSize = keyof typeof buttonSize

export interface SkeletonButtonProps extends Omit<SkeletonProps, "shape"> {
  size?: SkeletonButtonSize
  block?: boolean
}

export const SkeletonButton = ({
  size = "md",
  block,
  className,
  style,
  ...rest
}: SkeletonButtonProps) => {
  const s = buttonSize[size]
  return (
    <Skeleton
      style={{
        height: s.h,
        width: block ? "100%" : s.w,
        borderRadius: 8,
        ...style,
      }}
      className={className}
      {...rest}
    />
  )
}
SkeletonButton.displayName = "SkeletonButton"

/* ---------- TABLE ---------- */
export interface SkeletonTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  rows?: number
  cols?: number
  showHeader?: boolean
  animation?: SkeletonAnimation
}

export const SkeletonTable = ({
  rows = 5,
  cols = 4,
  showHeader = true,
  animation,
  className,
  ...rest
}: SkeletonTableProps) => (
  <div
    role="presentation"
    className={cn(
      "w-full overflow-hidden rounded-md border border-hairline bg-canvas",
      className
    )}
    {...rest}
  >
    {showHeader && (
      <div className="flex h-9 items-center gap-4 border-b border-hairline bg-surface px-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton
            key={`h-${i}`}
            animation={animation}
            className="h-2.5 flex-1"
            style={{ maxWidth: i === 0 ? 80 : i === cols - 1 ? 64 : undefined }}
          />
        ))}
      </div>
    )}
    <div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={`r-${r}`}
          className="flex h-11 items-center gap-4 border-b border-hairline px-4 last:border-0"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={`c-${r}-${c}`}
              animation={animation}
              className="h-3 flex-1"
              // Vary widths so rows don't look identical.
              style={{
                maxWidth:
                  c === 0 ? 80 + ((r * 13) % 40)
                  : c === cols - 1 ? 60 + ((r * 7) % 30)
                  : undefined,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
)
SkeletonTable.displayName = "SkeletonTable"

/* ---------- LIST ---------- */
export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number
  /** Show a leading avatar/icon circle on each row. */
  leading?: boolean
  /** Show a trailing meta block on each row. */
  trailing?: boolean
  animation?: SkeletonAnimation
}

export const SkeletonList = ({
  items = 5,
  leading = true,
  trailing = false,
  animation,
  className,
  ...rest
}: SkeletonListProps) => (
  <div className={cn("flex w-full flex-col gap-1", className)} {...rest}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 px-2 py-2.5">
        {leading && <SkeletonAvatar size="sm" animation={animation} />}
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton animation={animation} className="h-3" style={{ width: `${50 + ((i * 11) % 30)}%` }} />
          <Skeleton animation={animation} className="h-2.5" style={{ width: `${30 + ((i * 7) % 25)}%` }} />
        </div>
        {trailing && <Skeleton animation={animation} className="h-3 w-12" />}
      </div>
    ))}
  </div>
)
SkeletonList.displayName = "SkeletonList"

/* ---------- CARD ---------- */
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: SkeletonAnimation
}

export const SkeletonCard = ({
  animation,
  className,
  ...rest
}: SkeletonCardProps) => (
  <div
    className={cn(
      "w-full max-w-sm rounded-md border border-hairline bg-canvas p-4",
      className
    )}
    {...rest}
  >
    <div className="mb-3 flex items-center gap-3">
      <SkeletonAvatar size="md" animation={animation} />
      <div className="flex-1">
        <Skeleton animation={animation} className="mb-1.5 h-3 w-2/3" />
        <Skeleton animation={animation} className="h-2.5 w-1/3" />
      </div>
    </div>
    <SkeletonText lines={3} animation={animation} />
    <div className="mt-4 flex justify-end gap-2">
      <SkeletonButton size="sm" animation={animation} />
      <SkeletonButton size="sm" animation={animation} />
    </div>
  </div>
)
SkeletonCard.displayName = "SkeletonCard"
