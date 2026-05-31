import { Button, EmptyState, Icon } from "@cyanideui/ui"
import { Add01Icon, PackageIcon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function EmptyStateBlock() {
  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Empty state section"
        status="stable"
        description="Full-section zero-data layout — the EmptyState primitive in a dashed card sized for a page region. Use for first-run, no-results, or empty-collection states."
      />

      <Section title="Preview">
        <div className="flex min-h-[320px] items-center justify-center rounded-md border border-dashed border-hairline-strong bg-canvas">
          <EmptyState
            icon={<Icon icon={PackageIcon} size={40} />}
            title="No orders yet"
            description="When customers place orders, they'll show up here. Create your first one to see how it looks."
            action={
              <>
                <Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
                <Button variant="secondary">Import</Button>
              </>
            }
          />
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add empty-state`} />
      </Section>
    </>
  )
}
