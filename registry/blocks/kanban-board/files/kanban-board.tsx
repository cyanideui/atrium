// @atrium:if next
"use client"
// @atrium:endif

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import * as React from "react"

/**
 * KanbanBoard — status columns of draggable cards. Uses native HTML5
 * drag-and-drop (no extra dependency), so it's pure copy-paste. Drag a card to
 * another column to move it; the target column highlights while dragging over.
 *
 * Swap COLUMNS for your data; wire the onMove callback to persist changes.
 * For heavy boards (virtualized, multi-drag, touch), reach for dnd-kit.
 */

type CardTone = "default" | "info" | "warning" | "success"

interface KanbanCard {
  id: string
  title: string
  tag?: string
  tone?: CardTone
  assignee?: string
}

interface Column {
  id: string
  title: string
  cards: KanbanCard[]
}

const INITIAL: Column[] = [
  {
    id: "todo",
    title: "To do",
    cards: [
      { id: "c1", title: "Draft Q3 roadmap", tag: "Planning", tone: "info", assignee: "Jane Cooper" },
      { id: "c2", title: "Audit vendor invoices", tag: "Finance", tone: "warning", assignee: "Marcus Lee" },
    ],
  },
  {
    id: "doing",
    title: "In progress",
    cards: [
      { id: "c3", title: "Migrate auth to SSO", tag: "Eng", tone: "default", assignee: "Priya Patel" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "c4", title: "Ship pricing page", tag: "Marketing", tone: "success", assignee: "Jane Cooper" },
      { id: "c5", title: "Close June books", tag: "Finance", tone: "success", assignee: "Marcus Lee" },
    ],
  },
]

export function KanbanBoard({ onMove }: { onMove?: (cardId: string, toColumn: string) => void }) {
  const [columns, setColumns] = React.useState(INITIAL)
  const [dragId, setDragId] = React.useState<string | null>(null)
  const [overCol, setOverCol] = React.useState<string | null>(null)

  const moveCard = (cardId: string, toColId: string) => {
    setColumns((cols) => {
      let moved: KanbanCard | undefined
      const stripped = cols.map((col) => {
        const idx = col.cards.findIndex((c) => c.id === cardId)
        if (idx === -1) return col
        moved = col.cards[idx]
        return { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
      })
      if (!moved) return cols
      return stripped.map((col) =>
        col.id === toColId ? { ...col, cards: [...col.cards, moved as KanbanCard] } : col,
      )
    })
    onMove?.(cardId, toColId)
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={(e) => {
            e.preventDefault()
            setOverCol(col.id)
          }}
          onDragLeave={() => setOverCol((c) => (c === col.id ? null : c))}
          onDrop={(e) => {
            e.preventDefault()
            if (dragId) moveCard(dragId, col.id)
            setDragId(null)
            setOverCol(null)
          }}
          className={cn(
            "flex min-w-[240px] flex-1 flex-col rounded-md border bg-surface/50 transition-colors duration-[var(--dur-fast)]",
            overCol === col.id ? "border-ink-3 bg-info-tint/30" : "border-hairline",
          )}
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-3">{col.title}</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-pill bg-surface-2 px-1 text-[11px] font-medium tabular-nums text-ink-3">
              {col.cards.length}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-2 pt-0">
            {col.cards.map((card) => (
              <article
                key={card.id}
                draggable
                onDragStart={() => setDragId(card.id)}
                onDragEnd={() => {
                  setDragId(null)
                  setOverCol(null)
                }}
                className={cn(
                  "cursor-grab rounded-md border border-hairline bg-canvas p-2.5 shadow-elev-1",
                  "transition-[opacity,box-shadow] duration-[var(--dur-fast)] active:cursor-grabbing",
                  dragId === card.id && "opacity-40",
                )}
              >
                {card.tag && (
                  <Badge tone={card.tone ?? "default"} size="sm" className="mb-1.5">
                    {card.tag}
                  </Badge>
                )}
                <p className="m-0 text-[13px] leading-snug text-ink">{card.title}</p>
                {card.assignee && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Avatar size="sm" name={card.assignee} />
                    <span className="truncate text-[11.5px] text-ink-3">{card.assignee}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
