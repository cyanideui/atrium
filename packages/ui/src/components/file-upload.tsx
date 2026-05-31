import * as React from "react"
import {
  CloudUploadIcon,
  File02Icon,
  MultiplicationSignIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <FileUpload> — design.md §5.22
 * Dashed dropzone + file list. Drag-and-drop ready.
 */

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Currently selected/uploaded files (controlled). */
  value?: File[]
  /** Default selected files (uncontrolled). */
  defaultValue?: File[]
  /** Called when files change (added or removed). */
  onChange?: (files: File[]) => void
  /** Accept attribute, e.g. ".csv,.xlsx" or "image/*". */
  accept?: string
  /** Allow multiple files. */
  multiple?: boolean
  /** Max bytes per file. Files above are rejected and an error is surfaced. */
  maxSize?: number
  /** Helper line under the primary copy. */
  hint?: React.ReactNode
  disabled?: boolean
}

function formatSize(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      value: controlled,
      defaultValue,
      onChange,
      accept,
      multiple = false,
      maxSize,
      hint,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isControlled = controlled !== undefined
    const [internal, setInternal] = React.useState<File[]>(defaultValue ?? [])
    const files = isControlled ? (controlled as File[]) : internal
    const [dragActive, setDragActive] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const setFiles = (next: File[]) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    }

    const accept_ = accept

    const handleFiles = (incoming: FileList | null) => {
      if (!incoming) return
      const arr: File[] = []
      const errors: string[] = []
      for (const f of Array.from(incoming)) {
        if (maxSize && f.size > maxSize) {
          errors.push(`${f.name} exceeds ${formatSize(maxSize)}`)
          continue
        }
        arr.push(f)
      }
      setError(errors.length ? errors.join(" · ") : null)
      const next = multiple ? [...files, ...arr] : arr.slice(0, 1)
      setFiles(next)
    }

    const removeAt = (i: number) => {
      const next = files.slice()
      next.splice(i, 1)
      setFiles(next)
    }

    const browse = () => inputRef.current?.click()

    return (
      <div ref={ref} className={cn("w-full", className)} {...rest}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          onClick={() => !disabled && browse()}
          onKeyDown={(e) => {
            if (disabled) return
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              browse()
            }
          }}
          onDragOver={(e) => {
            if (disabled) return
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            if (disabled) return
            e.preventDefault()
            setDragActive(false)
            handleFiles(e.dataTransfer.files)
          }}
          className={cn(
            "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed px-6 py-8 text-center",
            "transition-[border-color,background-color] duration-[var(--dur-base)]",
            dragActive
              ? "border-ink bg-surface"
              : "border-hairline-strong bg-canvas hover:border-ink-3 hover:bg-surface",
            disabled && "cursor-not-allowed opacity-60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          )}
        >
          <Icon icon={CloudUploadIcon} size="xl" className="text-ink-3" aria-hidden />
          <div className="text-[13px] text-ink-2">
            <span className="font-medium text-ink">Click to upload</span> or drag &amp; drop
          </div>
          {hint && <div className="text-[12px] text-ink-3">{hint}</div>}
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={accept_}
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {error && (
          <p className="mt-2 text-[12px] text-error" role="alert">
            {error}
          </p>
        )}

        {files.length > 0 && (
          <ul className="mt-3 space-y-1">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center gap-3 rounded-sm border border-hairline bg-canvas px-3 py-2"
              >
                <Icon icon={File02Icon} size="md" className="shrink-0 text-ink-3" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] text-ink">{f.name}</div>
                  <div className="text-[11px] text-ink-3 tabular-nums">{formatSize(f.size)}</div>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => removeAt(i)}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm text-ink-3 transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-error"
                >
                  <Icon icon={MultiplicationSignIcon} size="sm" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"
