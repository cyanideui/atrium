// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Progress } from "@/components/ui/progress"
import * as React from "react"
import {
  File01Icon,
  Image01Icon,
  Pdf01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

/**
 * FileList — a list of uploaded/attached files: type icon, name, size, and
 * either an upload-progress bar (while uploading) or a done check (when
 * complete), plus a remove button. Pairs with <FileUpload>.
 *
 * Swap INITIAL_FILES for your upload state; wire onRemove to your handler.
 */

type FileKind = "image" | "pdf" | "other"

interface FileItem {
  id: string
  name: string
  size: string
  kind: FileKind
  /** 0–100 while uploading; omit/100 when done. */
  progress?: number
}

const KIND_ICON: Record<FileKind, IconSvgElement> = {
  image: Image01Icon,
  pdf: Pdf01Icon,
  other: File01Icon,
}

const INITIAL_FILES: FileItem[] = [
  { id: "1", name: "Q2-forecast.xlsx", size: "248 KB", kind: "other" },
  { id: "2", name: "logo-mark.png", size: "64 KB", kind: "image" },
  { id: "3", name: "contract-acme.pdf", size: "1.2 MB", kind: "pdf", progress: 62 },
]

export function FileList() {
  const [files, setFiles] = React.useState(INITIAL_FILES)
  const remove = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))

  if (files.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-hairline-strong bg-canvas px-4 py-8 text-center text-[13px] text-ink-3">
        No files attached.
      </div>
    )
  }

  return (
    <ul className="m-0 flex list-none flex-col divide-y divide-hairline overflow-hidden rounded-md border border-hairline bg-canvas p-0">
      {files.map((f) => {
        const uploading = typeof f.progress === "number" && f.progress < 100
        return (
          <li key={f.id} className="flex items-center gap-3 px-3 py-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-ink-2" aria-hidden>
              <Icon icon={KIND_ICON[f.kind]} size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13px] text-ink">{f.name}</span>
                <span className="shrink-0 text-[11.5px] tabular-nums text-ink-4">{f.size}</span>
              </div>
              {uploading ? (
                <div className="mt-1.5 flex items-center gap-2">
                  <Progress value={f.progress} size="sm" className="flex-1" />
                  <span className="shrink-0 text-[11px] tabular-nums text-ink-3">{f.progress}%</span>
                </div>
              ) : (
                <div className="mt-0.5 flex items-center gap-1 text-[11.5px] text-success">
                  <Icon icon={CheckmarkCircle02Icon} size={12} aria-hidden />
                  Uploaded
                </div>
              )}
            </div>
            <Button
              variant="tertiary"
              size="sm"
              aria-label={`Remove ${f.name}`}
              onClick={() => remove(f.id)}
            >
              <Icon icon={Delete02Icon} size="sm" />
            </Button>
          </li>
        )
      })}
    </ul>
  )
}
