import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
} from "@cyanideui/ui"
import {
  Add01Icon,
  Download04Icon,
  MoreHorizontalIcon,
  Edit02Icon,
  Copy01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function ToolbarBlock() {
  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Toolbar"
        status="stable"
        description="Compact action bar — title + count on the left, a primary/secondary action cluster and overflow menu on the right. Lighter than PageHeader; sits above a list, panel, or card body."
      />

      <Section title="Preview">
        <div className="rounded-md border border-hairline bg-canvas">
          <div className="flex flex-wrap items-center gap-3 border-b border-hairline px-3 py-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-semibold text-ink">Orders</span>
              <span className="text-[12px] tabular-nums text-ink-3">24 items</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" size="sm" leading={<Icon icon={Download04Icon} size="sm" />}>Export</Button>
              <Button size="sm" leading={<Icon icon={Add01Icon} size="sm" />}>New</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="tertiary" size="sm" aria-label="More actions">
                    <Icon icon={MoreHorizontalIcon} size="sm" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem leading={<Icon icon={Edit02Icon} size="sm" />}>Rename view</DropdownMenuItem>
                  <DropdownMenuItem leading={<Icon icon={Copy01Icon} size="sm" />}>Duplicate view</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem tone="critical" leading={<Icon icon={Delete02Icon} size="sm" />}>Delete view</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="px-3 py-10 text-center text-[13px] text-ink-3">Your content goes here.</div>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add toolbar`} />
      </Section>
    </>
  )
}
