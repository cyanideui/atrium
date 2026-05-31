import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
  Input,
  Label,
  Badge,
} from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function DrawerPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Drawer"
        status="stable"
        description="Right-side detail panel. 480px default. Slide-in from right with overlay fade."
      />

      <Section title="Right (default)">
        <Demo
          code={`<Drawer>
  <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>...</DrawerHeader>
    <DrawerBody>...</DrawerBody>
    <DrawerFooter>...</DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button>View order #1234</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <div>
                  <DrawerTitle>Order #1234</DrawerTitle>
                  <DrawerDescription>Acme Corporation · Jan 12, 2025</DrawerDescription>
                </div>
                <Badge tone="success" className="ml-auto">
                  Paid
                </Badge>
              </DrawerHeader>
              <DrawerBody>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="customer">Customer</Label>
                    <Input id="customer" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" defaultValue="$1,240.00" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      rows={4}
                      className="w-full rounded-sm border border-hairline-strong bg-canvas px-3 py-2 text-[13px] outline-none focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
                      defaultValue="Bulk order — packaged in 4 boxes."
                    />
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="secondary">Close</Button>
                </DrawerClose>
                <Button>Save changes</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Demo>
      </Section>

      <Section title="Left side">
        <Demo code={`<DrawerContent side="left">...`}>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Open from left</Button>
            </DrawerTrigger>
            <DrawerContent side="left">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <p>Drawer can slide in from the left for nav-style usage.</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Demo>
      </Section>

      <Section title="Custom width">
        <Demo code={`<DrawerContent width={640}>...`}>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Wider (640px)</Button>
            </DrawerTrigger>
            <DrawerContent width={640}>
              <DrawerHeader>
                <DrawerTitle>Wider drawer</DrawerTitle>
                <DrawerDescription>For dense forms or split content.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p>You can pass a number (px) or any CSS width string.</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Demo>
      </Section>
    </div>
  )
}
