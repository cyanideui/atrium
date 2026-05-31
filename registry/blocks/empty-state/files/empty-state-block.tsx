import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Icon } from "@/components/ui/icon"
import { Add01Icon, PackageIcon } from "@hugeicons/core-free-icons"

/**
 * EmptyStateBlock — a full-section zero-data layout. Wraps the EmptyState
 * primitive in a bordered card sized for a page region (between a header and
 * the rest of the screen). Use for first-run, no-results, or empty-collection
 * states.
 *
 * Swap the icon, copy, and actions for your context.
 */

export interface EmptyStateBlockProps {
  onPrimary?: () => void
}

export function EmptyStateBlock({ onPrimary }: EmptyStateBlockProps) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-md border border-dashed border-hairline-strong bg-canvas">
      <EmptyState
        icon={<Icon icon={PackageIcon} size={40} />}
        title="No orders yet"
        description="When customers place orders, they'll show up here. Create your first one to see how it looks."
        action={
          <>
            <Button leading={<Icon icon={Add01Icon} size="sm" />} onClick={onPrimary}>
              New order
            </Button>
            <Button variant="secondary">Import</Button>
          </>
        }
      />
    </div>
  )
}
