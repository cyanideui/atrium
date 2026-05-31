import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * <MoneyField> — design.md §5.4
 * Currency-formatted numeric input. Locale-aware. Typed numeric value.
 */

export interface MoneyFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value" | "defaultValue" | "type"> {
  size?: "sm" | "md" | "lg"
  /** Currency symbol shown in the prefix (e.g. "$", "€", "Rp"). */
  currency?: string
  locale?: string
  decimals?: number
  /** Numeric value (uncontrolled accepts defaultValue, controlled accepts value). */
  value?: number | null
  defaultValue?: number | null
  onChange?: (value: number | null) => void
  /** Color negative numbers in the error tone. */
  signed?: boolean
}

const sizeClasses: Record<NonNullable<MoneyFieldProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-[13px]",
  lg: "text-sm",
}

function formatNumber(n: number | null | undefined, locale: string, decimals: number) {
  if (n === null || n === undefined || Number.isNaN(n)) return ""
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
}

function parseNumber(str: string): number | null {
  // Strip everything except digits, minus, dot, comma; treat last separator as decimal.
  const cleaned = str.replace(/[^\d.,-]/g, "")
  if (!cleaned) return null
  const lastDot = cleaned.lastIndexOf(".")
  const lastComma = cleaned.lastIndexOf(",")
  const decimalIndex = Math.max(lastDot, lastComma)
  let normalized: string
  if (decimalIndex === -1) {
    normalized = cleaned.replace(/[.,]/g, "")
  } else {
    const intPart = cleaned.slice(0, decimalIndex).replace(/[.,]/g, "")
    const decPart = cleaned.slice(decimalIndex + 1).replace(/[.,]/g, "")
    normalized = `${intPart}.${decPart}`
  }
  const n = Number(normalized)
  return Number.isNaN(n) ? null : n
}

export const MoneyField = React.forwardRef<HTMLInputElement, MoneyFieldProps>(
  (
    {
      className,
      size = "md",
      currency = "$",
      locale = "en-US",
      decimals = 2,
      value: controlledValue,
      defaultValue,
      onChange,
      signed = false,
      placeholder,
      disabled,
      id,
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const initial = isControlled ? controlledValue : (defaultValue ?? null)
    const [numeric, setNumeric] = React.useState<number | null>(initial ?? null)
    const [text, setText] = React.useState<string>(formatNumber(initial ?? null, locale, decimals))
    const [focused, setFocused] = React.useState(false)

    React.useEffect(() => {
      if (!isControlled) return
      setNumeric(controlledValue ?? null)
      if (!focused) setText(formatNumber(controlledValue ?? null, locale, decimals))
    }, [controlledValue, isControlled, focused, locale, decimals])

    const commit = (next: number | null) => {
      setNumeric(next)
      onChange?.(next)
    }

    return (
      <div
        style={{ height: `var(--density-form-h-${size})` }}
        className={cn(
          "flex w-full items-stretch overflow-hidden rounded-md border border-hairline-strong bg-canvas",
          "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
          "transition-[border-color,box-shadow] duration-[var(--dur-base)]",
          "focus-within:border-ink focus-within:ring-1 focus-within:ring-ink",
          "hover:border-ink-3",
          disabled && "cursor-not-allowed bg-surface text-ink-4",
          sizeClasses[size],
          className
        )}
      >
        <span
          className="flex items-center border-r border-hairline px-2.5 text-ink-3 select-none"
          aria-hidden
        >
          {currency}
        </span>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          disabled={disabled}
          placeholder={placeholder ?? "0.00"}
          value={text}
          onFocus={(e) => {
            setFocused(true)
            // On focus show raw editable string
            setText(numeric === null ? "" : String(numeric))
            rest.onFocus?.(e)
          }}
          onChange={(e) => {
            const next = e.target.value
            setText(next)
            const parsed = parseNumber(next)
            if (!isControlled) setNumeric(parsed)
            onChange?.(parsed)
          }}
          onBlur={(e) => {
            setFocused(false)
            const parsed = parseNumber(text)
            commit(parsed)
            setText(formatNumber(parsed, locale, decimals))
            rest.onBlur?.(e)
          }}
          className={cn(
            "w-full flex-1 border-0 bg-transparent px-3 text-right tabular-nums focus:outline-none",
            signed && numeric !== null && numeric < 0 && "text-error"
          )}
          {...rest}
        />
      </div>
    )
  }
)
MoneyField.displayName = "MoneyField"
