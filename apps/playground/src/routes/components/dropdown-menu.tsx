import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  Button,
  Icon,
} from "@atrium/ui"
import {
  Edit02Icon,
  Copy01Icon,
  Delete02Icon,
  Download02Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function DropdownMenuPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Dropdown Menu"
        status="stable"
        description="Built on Radix Dropdown. Group labels, dividers, danger zone tone, keyboard shortcuts."
      />

      <Section title="Default">
        <Demo
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="secondary">Actions</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Order</DropdownMenuLabel>
    <DropdownMenuItem leading={<Icon icon={Edit02Icon} size={14} />}>Edit
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem leading={<Icon icon={Copy01Icon} size={14} />}>Duplicate</DropdownMenuItem>
    <DropdownMenuItem leading={<Icon icon={Download02Icon} size={14} />}>Export</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
    <DropdownMenuItem tone="critical" leading={<Icon icon={Delete02Icon} size={14} />}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Order</DropdownMenuLabel>
              <DropdownMenuItem leading={<Icon icon={Edit02Icon} size={14} />}>
                Edit
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem leading={<Icon icon={Copy01Icon} size={14} />}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem leading={<Icon icon={Download02Icon} size={14} />}>
                Export
                <DropdownMenuShortcut>⌘⇧E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
              <DropdownMenuItem
                tone="critical"
                leading={<Icon icon={Delete02Icon} size={14} />}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>
    </div>
  )
}
