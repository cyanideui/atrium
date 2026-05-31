import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Label,
} from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function PopoverPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Popover"
        status="stable"
        description="Generic anchored overlay. Powers tooltips, menus, custom flyouts."
      />

      <Section title="Default">
        <Demo
          code={`<Popover>
  <PopoverTrigger asChild><Button variant="secondary">Open</Button></PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-3">
                <h3 className="text-[13px] font-semibold text-ink">Profile</h3>
                <p className="text-[12px] text-ink-3">
                  Anything you can put in a div, you can put in a popover.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </Demo>
      </Section>

      <Section title="Inline form">
        <Demo
          code={`<Popover>
  <PopoverTrigger asChild><Button>Edit name</Button></PopoverTrigger>
  <PopoverContent>
    <Label>Name</Label>
    <Input defaultValue="John Doe" />
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button>Edit name</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <Label htmlFor="popover-name">Name</Label>
                <Input id="popover-name" defaultValue="John Doe" size="sm" />
                <div className="flex justify-end gap-2 pt-1">
                  <Button size="sm" variant="secondary">
                    Cancel
                  </Button>
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Demo>
      </Section>

      <Section title="With arrow">
        <Demo
          code={`<PopoverContent arrow>...</PopoverContent>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">With arrow</Button>
            </PopoverTrigger>
            <PopoverContent arrow>
              <p className="text-[13px] text-ink-2">Pointing at the trigger.</p>
            </PopoverContent>
          </Popover>
        </Demo>
      </Section>
    </div>
  )
}
