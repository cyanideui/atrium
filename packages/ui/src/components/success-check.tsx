import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <SuccessCheck> — transitions.dev "Success check" (§motion, variant B)
 *
 * A green disc that pops in while a white checkmark draws over it. Use as the
 * confirmation moment after a save/submit, inside a toast, or on a wizard's
 * finish step.
 *
 * Replay: bump the `playKey` prop (or remount) to re-run the animation — e.g.
 * increment it each time a save succeeds. On first mount it plays once.
 *
 * Reduced motion: the global rule neutralizes the pop, and the draw is
 * pre-completed (stroke-dashoffset 0) so the check simply appears solid.
 *
 * Sizes map to common contexts: sm (toast/inline ~20px), md (button-adjacent
 * ~24px), lg (wizard finish ~40px).
 */

export interface SuccessCheckProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg"
  tone?: "success" | "info"
  /** Change this value to replay the animation (e.g. a success counter). */
  playKey?: React.Key
}

const SIZE_PX = { sm: 20, md: 24, lg: 40 } as const
const TONE_BG = { success: "bg-success", info: "bg-info" } as const

export const SuccessCheck = React.forwardRef<HTMLSpanElement, SuccessCheckProps>(
  ({ className, size = "md", tone = "success", playKey, "aria-label": ariaLabel = "Success", ...rest }, ref) => {
    const px = SIZE_PX[size]

    // Replay by remounting the inner animated node. `runId` advances on every
    // `playKey` change; keying the disc on it gives the CSS pop/draw a fresh
    // element to animate from scratch — robust under React StrictMode (no
    // remove→reflow→add timing dance, which batched renders can swallow).
    const [runId, setRunId] = React.useState(0)
    const firstKey = React.useRef(playKey)
    React.useEffect(() => {
      if (playKey !== firstKey.current) {
        firstKey.current = playKey
        setRunId((n) => n + 1)
      }
    }, [playKey])

    return (
      <span
        key={runId}
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn(
          "ds-check-disc inline-grid place-items-center rounded-pill text-white",
          TONE_BG[tone],
          className,
        )}
        data-go="true"
        style={{ width: px, height: px }}
        {...rest}
      >
        <svg
          width={px * 0.58}
          height={px * 0.58}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden
        >
          <path
            d="M9 16 l5 5 l9 -11"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  },
)
SuccessCheck.displayName = "SuccessCheck"
