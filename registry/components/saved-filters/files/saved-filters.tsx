import * as React from "react"
import {
  ArrowDown01Icon,
  Tick02Icon,
  FilterIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

/**
 * <SavedFilters> — design.md §5.25
 * Compact dropdown with the active preset shown as the trigger label.
 */

export interface SavedFilter {
  id: string
  label: React.ReactNode
}

export interface SavedFiltersProps {
  filters: SavedFilter[]
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  /** Optional "save current as preset" handler. Renders the footer when provided. */
  onSaveCurrent?: () => void
  className?: string
}

export const SavedFilters = React.forwardRef<HTMLButtonElement, SavedFiltersProps>(
  ({ filters, value: controlled, defaultValue, onChange, onSaveCurrent, className }, ref) => {
    const isControlled = controlled !== undefined
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue)
    const value = isControlled ? controlled : internal
    const active = filters.find((f) => f.id === value)

    const select = (id: string) => {
      if (!isControlled) setInternal(id)
      onChange?.(id)
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            style={{ height: "var(--density-form-h-sm)" }}
            className={cn(
              "ds-trigger",
              "inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-[13px] text-ink",
              "transition-[background,border-color,box-shadow] duration-[var(--dur-fast)]",
              className
            )}
          >
            <Icon icon={FilterIcon} size="sm" className="text-ink-3" aria-hidden />
            <span className="font-medium">{active?.label ?? "All"}</span>
            <Icon icon={ArrowDown01Icon} size="sm" className="text-ink-3" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[220px] p-1" align="start">
          {filters.map((f) => {
            const isActive = f.id === value
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => select(f.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px]",
                  "transition-colors duration-[var(--dur-fast)]",
                  "hover:bg-surface",
                  isActive ? "text-ink" : "text-ink-2"
                )}
              >
                <span className="flex h-4 w-4 items-center justify-center text-ink">
                  {isActive && <Icon icon={Tick02Icon} size={12} strokeWidth={2.5} />}
                </span>
                <span className="flex-1">{f.label}</span>
              </button>
            )
          })}
          {onSaveCurrent && (
            <>
              <div className="my-1 h-px bg-hairline" />
              <button
                type="button"
                onClick={onSaveCurrent}
                className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-info transition-colors hover:bg-info-tint"
              >
                <span className="flex h-4 w-4 items-center justify-center" />
                Save current…
              </button>
            </>
          )}
        </PopoverContent>
      </Popover>
    )
  }
)
SavedFilters.displayName = "SavedFilters"
