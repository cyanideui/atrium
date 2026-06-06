import * as React from "react"
import { Search01Icon, MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"
import { Kbd } from "./kbd"
import { useReducedMotion } from "../lib/use-reduced-motion"

/**
 * <SearchField> — design.md §5.4
 * Promoted from a pattern to a first-class primitive in v3.9.
 * Composition: bordered input + leading search icon + clear button + optional debounce.
 */

export interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "type"> {
  size?: "sm" | "md" | "lg"
  /** Debounce delay in ms. Set 0 to fire on every keystroke. */
  debounceMs?: number
  /** Called with the (debounced) input value. */
  onChange?: (value: string) => void
  /** Called immediately on every keystroke. */
  onInput?: React.FormEventHandler<HTMLInputElement>
  /** Show the trailing `/` keycap to hint at the global search shortcut. */
  showShortcut?: boolean
}

const sizeClasses: Record<NonNullable<SearchFieldProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-[13px]",
  lg: "text-sm",
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ className, size = "md", debounceMs = 250, defaultValue = "", value: controlledValue, onChange, onInput, placeholder = "Search…", showShortcut, disabled, ...rest }, ref) => {
    const reduced = useReducedMotion()
    const isControlled = controlledValue !== undefined
    const [internal, setInternal] = React.useState<string>(String(defaultValue ?? ""))
    const value = isControlled ? String(controlledValue ?? "") : internal

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const debounceRef = React.useRef<number | null>(null)
    const fireChange = React.useCallback(
      (next: string) => {
        if (!onChange) return
        if (debounceMs <= 0) {
          onChange(next)
          return
        }
        if (debounceRef.current) window.clearTimeout(debounceRef.current)
        debounceRef.current = window.setTimeout(() => onChange(next), debounceMs)
      },
      [onChange, debounceMs]
    )

    React.useEffect(() => () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }, [])

    const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
      const next = (e.target as HTMLInputElement).value
      if (!isControlled) setInternal(next)
      fireChange(next)
      onInput?.(e)
    }

    const handleClear = () => {
      const node = inputRef.current
      const clearNow = () => {
        if (!isControlled) setInternal("")
        onChange?.("")
      }
      // #12 Input clear with dissolve: blur+fade the field's text out, then
      // empty it. Can't per-word dissolve a real <input>, so we dissolve the
      // whole field — same intent, input-safe. Skipped entirely under reduced
      // motion (instant clear, no delay).
      if (node && !reduced) {
        node.style.transition =
          "opacity var(--dur-base) var(--ease-standard), filter var(--dur-base) var(--ease-standard)"
        node.style.opacity = "0"
        node.style.filter = "blur(4px)"
        window.setTimeout(() => {
          clearNow()
          node.style.opacity = ""
          node.style.filter = ""
          node.style.transition = ""
          node.focus()
        }, 150)
      } else {
        clearNow()
        node?.focus()
      }
    }

    return (
      <div
        style={{ height: `var(--density-form-h-${size})` }}
        className={cn(
          "group flex w-full items-center gap-2 rounded-md border border-hairline-strong bg-canvas px-3",
          "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
          "transition-[border-color,box-shadow] duration-[var(--dur-base)]",
          "focus-within:border-ink focus-within:ring-1 focus-within:ring-ink",
          "hover:border-ink-3",
          disabled && "cursor-not-allowed bg-surface text-ink-4",
          sizeClasses[size],
          className
        )}
      >
        <Icon icon={Search01Icon} size="sm" className="text-ink-3 transition-colors duration-[var(--dur-base)] group-focus-within:text-ink" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          placeholder={placeholder}
          value={value}
          onInput={handleInput}
          disabled={disabled}
          className="flex-1 border-0 bg-transparent p-0 text-inherit placeholder:text-ink-4 focus:outline-none disabled:cursor-not-allowed"
          {...rest}
        />
        {!disabled && (
          <button
            type="button"
            onClick={handleClear}
            tabIndex={value ? 0 : -1}
            aria-label="Clear search"
            aria-hidden={!value}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-sm text-ink-3 hover:bg-surface hover:text-ink",
              "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
              value
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-90 opacity-0"
            )}
          >
            <Icon icon={MultiplicationSignIcon} size="sm" />
          </button>
        )}
        {showShortcut && !value && (
          <Kbd size="sm" className="hidden sm:inline-flex">/</Kbd>
        )}
      </div>
    )
  }
)
SearchField.displayName = "SearchField"
