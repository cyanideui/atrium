import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <FloatingLabelInput> — design.md §5.4
 * Material-style label that sits inside at rest, animates to top-left and
 * cuts a notch in the outline on focus or when filled.
 *
 * Density-aware: the wrapper height flows from `--density-form-h-{sm,md,lg}`
 * like every other form field, so it reflows with the active density mode.
 * The rest-state label is vertically centered via transform (not a fixed
 * top), so it stays centered at any height.
 */

export interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "placeholder"> {
  label: string
  size?: "sm" | "md" | "lg"
  helpText?: React.ReactNode
  error?: React.ReactNode
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  (
    { className, label, size = "md", value, defaultValue, helpText, error, disabled, id: idProp, onFocus, onBlur, ...rest },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const [focused, setFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      value !== undefined && value !== "" && value !== null
        ? true
        : defaultValue !== undefined && defaultValue !== "" && defaultValue !== null
    )
    const floated = focused || hasValue

    React.useEffect(() => {
      if (value !== undefined) setHasValue(value !== "" && value !== null)
    }, [value])

    const errMsg = typeof error === "string" ? error : undefined
    const isError = error !== undefined && error !== false && error !== null

    return (
      <div className={cn("w-full", className)}>
        <div
          style={{ height: `var(--density-form-h-${size})` }}
          className={cn(
            "group relative w-full",
            disabled && "opacity-60"
          )}
        >
          <input
            ref={ref}
            id={id}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder=" "
            aria-invalid={isError || undefined}
            aria-describedby={
              errMsg ? `${id}-err` : helpText ? `${id}-help` : undefined
            }
            onFocus={(e) => {
              setFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              setHasValue(!!e.target.value)
              onBlur?.(e)
            }}
            className={cn(
              "peer h-full w-full rounded-md bg-canvas px-3 text-[14px] text-ink",
              "border transition-[border-color,box-shadow] duration-[var(--dur-base)]",
              "focus-visible:outline-none",
              isError
                ? "border-error focus-visible:ring-1 focus-visible:ring-error"
                : "border-hairline-strong focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink hover:border-ink-3",
              "disabled:cursor-not-allowed disabled:bg-surface"
            )}
            {...rest}
          />
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-2.5 select-none px-1 leading-none",
              "transition-[transform,top,font-size,color] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
              floated
                ? "top-0 -translate-y-1/2 bg-canvas text-[11px]"
                : "top-1/2 -translate-y-1/2 text-[14px]",
              floated
                ? isError
                  ? "text-error"
                  : "text-ink-2 peer-focus:text-ink"
                : "text-ink-3"
            )}
          >
            {label}
          </label>
        </div>
        {errMsg && (
          <p id={`${id}-err`} className="mt-1.5 text-[12px] text-error">
            {errMsg}
          </p>
        )}
        {!errMsg && helpText && (
          <p id={`${id}-help`} className="mt-1.5 text-[12px] text-ink-3">
            {helpText}
          </p>
        )}
      </div>
    )
  }
)
FloatingLabelInput.displayName = "FloatingLabelInput"
