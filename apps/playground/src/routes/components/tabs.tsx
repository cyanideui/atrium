import { Tabs, TabsList, TabsTrigger, TabsContent, Badge } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function TabsPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Tabs"
        status="stable"
        description="Underline style. Active indicator scales in/out. 38px tall row."
      />

      <Section title="Default">
        <Demo
          code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="orders">Orders</TabsTrigger>
    <TabsTrigger value="customers">Customers</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  ...
</Tabs>`}
        >
          <div className="w-full">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="text-[13px] text-ink-2">
                  Overview tab content. Active underline indicates selection.
                </p>
              </TabsContent>
              <TabsContent value="orders">
                <p className="text-[13px] text-ink-2">Orders tab content.</p>
              </TabsContent>
              <TabsContent value="customers">
                <p className="text-[13px] text-ink-2">Customers tab content.</p>
              </TabsContent>
              <TabsContent value="settings">
                <p className="text-[13px] text-ink-2">Settings tab content.</p>
              </TabsContent>
            </Tabs>
          </div>
        </Demo>
      </Section>

      <Section title="With badges">
        <Demo
          code={`<TabsTrigger value="orders">
  Orders <Badge tone="warning" size="sm">12</Badge>
</TabsTrigger>`}
        >
          <div className="w-full">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending" className="gap-2">
                  Pending <Badge tone="warning" size="sm" dotless>12</Badge>
                </TabsTrigger>
                <TabsTrigger value="failed" className="gap-2">
                  Failed <Badge tone="critical" size="sm" dotless>3</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
