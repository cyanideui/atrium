import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Skeleton,
  SkeletonText,
  SkeletonTable,
  SkeletonCard,
  SkeletonList,
  type SkeletonAnimation,
} from "@/components/ui/skeleton"

/**
 * <RouteLoading> — design.md §5.12
 *
 * Drop-in skeleton scaffolds for the main route patterns. Picks the right
 * shape based on the `pattern` prop so consumers don't have to compose
 * skeleton primitives by hand for the common cases.
 *
 *   pattern="dashboard" — KPI tile row + chart placeholder + table
 *   pattern="list"      — header row + table
 *   pattern="detail"    — title + description + 2-column form
 *   pattern="form"      — section header + 3-4 form rows
 *   pattern="card"      — single card scaffold (avatar + title + lines)
 *
 * Pair with `pulseKey` on `<DocContent>` (same value as your route key)
 * so the scrollbar pulses on transition.
 *
 *   <DocContent pulseKey={pathname}>
 *     <PageShell …>
 *       {isLoading ? <RouteLoading pattern="list" /> : <Outlet />}
 *     </PageShell>
 *   </DocContent>
 */

export type RouteLoadingPattern =
  | "dashboard"
  | "list"
  | "detail"
  | "form"
  | "card"

export interface RouteLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  pattern?: RouteLoadingPattern
  animation?: SkeletonAnimation
}

export function RouteLoading({
  pattern = "list",
  animation,
  className,
  ...rest
}: RouteLoadingProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className={cn("flex w-full flex-col gap-6", className)}
      {...rest}
    >
      {pattern === "dashboard" && <DashboardLoading animation={animation} />}
      {pattern === "list" && <ListLoading animation={animation} />}
      {pattern === "detail" && <DetailLoading animation={animation} />}
      {pattern === "form" && <FormLoading animation={animation} />}
      {pattern === "card" && <SkeletonCard animation={animation} />}
    </div>
  )
}
RouteLoading.displayName = "RouteLoading"

function DashboardLoading({ animation }: { animation?: SkeletonAnimation }) {
  return (
    <>
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Skeleton animation={animation} className="h-7 w-48" />
          <Skeleton animation={animation} className="h-4 w-72" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton animation={animation} className="h-9 w-24" />
          <Skeleton animation={animation} className="h-9 w-28" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-md border border-hairline bg-canvas p-4"
          >
            <Skeleton animation={animation} className="h-3 w-24" />
            <Skeleton animation={animation} className="h-7 w-32" />
            <Skeleton animation={animation} className="h-8 w-full" />
          </div>
        ))}
      </div>
      <SkeletonTable animation={animation} rows={5} cols={5} />
    </>
  )
}

function ListLoading({ animation }: { animation?: SkeletonAnimation }) {
  return (
    <>
      <div className="flex items-end justify-between gap-3">
        <Skeleton animation={animation} className="h-7 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton animation={animation} className="h-8 w-32" />
          <Skeleton animation={animation} className="h-8 w-24" />
        </div>
      </div>
      <SkeletonTable animation={animation} rows={8} cols={6} />
    </>
  )
}

function DetailLoading({ animation }: { animation?: SkeletonAnimation }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton animation={animation} className="h-3 w-24" />
        <Skeleton animation={animation} className="h-7 w-64" />
        <SkeletonText animation={animation} lines={2} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-md border border-hairline bg-canvas p-5">
          <Skeleton animation={animation} className="h-4 w-32" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton animation={animation} className="h-3 w-20" />
              <Skeleton animation={animation} className="h-9 w-full" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-md border border-hairline bg-canvas p-5">
          <Skeleton animation={animation} className="h-4 w-28" />
          <SkeletonList animation={animation} items={4} leading trailing />
        </div>
      </div>
    </>
  )
}

function FormLoading({ animation }: { animation?: SkeletonAnimation }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Skeleton animation={animation} className="h-7 w-48" />
        <Skeleton animation={animation} className="h-4 w-80" />
      </div>
      <div className="flex flex-col gap-4 rounded-md border border-hairline bg-canvas p-6">
        <Skeleton animation={animation} className="h-4 w-32" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton animation={animation} className="h-3 w-24" />
            <Skeleton animation={animation} className="h-9 w-full" />
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <Skeleton animation={animation} className="h-9 w-24" />
          <Skeleton animation={animation} className="h-9 w-28" />
        </div>
      </div>
    </>
  )
}
