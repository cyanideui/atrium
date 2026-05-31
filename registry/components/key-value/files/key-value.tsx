import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * <KeyValueList> / <KeyValue> — design.md §5.35
 *
 * The label→value pattern that recurs in every detail panel (customer info,
 * payment summary, metadata). Replaces the ad-hoc `KV` helpers that templates
 * and blocks each re-declared.
 *
 *   <KeyValueList>
 *     <KeyValue label="Customer since" value="Mar 2024" />
 *     <KeyValue label="Total spend" value="$48,210" />
 *   </KeyValueList>
 *
 * Layout: `inline` (default) puts label left, value right on one row;
 * `stacked` puts the label above the value (good for longer values).
 */

export interface KeyValueListProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Row layout for all child KeyValues. Default: inline. */
  layout?: "inline" | "stacked"
}

const KeyValueLayoutContext = React.createContext<"inline" | "stacked">("inline")

export const KeyValueList = React.forwardRef<HTMLDListElement, KeyValueListProps>(
  ({ className, layout = "inline", ...props }, ref) => (
    <KeyValueLayoutContext.Provider value={layout}>
      <dl ref={ref} className={cn("m-0 flex flex-col gap-1.5 text-[12.5px]", className)} {...props} />
    </KeyValueLayoutContext.Provider>
  ),
)
KeyValueList.displayName = "KeyValueList"

export interface KeyValueProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label: React.ReactNode
  value: React.ReactNode
  /** Override the list-level layout for this row. */
  layout?: "inline" | "stacked"
}

export const KeyValue = React.forwardRef<HTMLDivElement, KeyValueProps>(
  ({ className, label, value, layout: layoutProp, ...props }, ref) => {
    const ctxLayout = React.useContext(KeyValueLayoutContext)
    const layout = layoutProp ?? ctxLayout
    return (
      <div
        ref={ref}
        className={cn(
          layout === "inline" ? "flex items-center justify-between gap-3" : "flex flex-col gap-0.5",
          className,
        )}
        {...props}
      >
        <dt className="text-ink-3">{label}</dt>
        <dd className={cn("m-0 font-medium tabular-nums text-ink", layout === "inline" && "text-right")}>
          {value}
        </dd>
      </div>
    )
  },
)
KeyValue.displayName = "KeyValue"
