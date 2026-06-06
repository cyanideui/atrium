import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * <Input> — design.md §5.4 (bordered style)
 * Bordered surface, 1px hairline-strong, focus → 1px ink + ring.
 */

const inputBase = cva(
  [
    "flex w-full bg-canvas text-ink placeholder:text-ink-4",
    "rounded-md border border-hairline-strong",
    "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
    "transition-[color,box-shadow,border-color] duration-[var(--dur-base)]",
    "focus-visible:outline-none focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink",
    "hover:border-ink-3",
    "disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink-4 disabled:border-hairline",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      size: {
        sm: "px-2.5 text-xs",
        md: "px-3 text-[13px]",
        lg: "px-3.5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputBase> {
  /**
   * Mark the field invalid. Sets `aria-invalid` (red border) AND plays a
   * one-shot shake (#11) each time it transitions false→true — e.g. bump a
   * counter / toggle on every failed submit to re-trigger. Reduced motion →
   * border only, no shake (global rule neutralizes the keyframe).
   */
  invalid?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", size = "md", style, invalid, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

    // Replay the shake on each false→true transition of `invalid`.
    const wasInvalid = React.useRef(false)
    React.useEffect(() => {
      const el = innerRef.current
      if (!el) return
      if (invalid && !wasInvalid.current) {
        el.classList.remove("ds-shake")
        // Force reflow so re-adding the class restarts the animation.
        void el.offsetWidth
        el.classList.add("ds-shake")
        const clear = () => el.classList.remove("ds-shake")
        el.addEventListener("animationend", clear, { once: true })
      }
      wasInvalid.current = !!invalid
    }, [invalid])

    return (
      <input
        ref={innerRef}
        type={type}
        aria-invalid={invalid ?? ariaInvalid}
        style={{ height: `var(--density-form-h-${size})`, ...style }}
        className={cn(inputBase({ size }), className)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { inputBase as inputVariants }
