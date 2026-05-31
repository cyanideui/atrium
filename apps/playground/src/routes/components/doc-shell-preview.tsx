import { Link } from "react-router-dom"
import { Button, Banner, Icon, Kbd, KbdGroup } from "@atrium/ui"
import { ArrowRight02Icon, Sun02Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function DocShellPreviewPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Doc Shell (App Layout)"
        status="stable"
        description="Notion-style app shell — sidebar merged with the page background, content card on the right with sticky header and centered/full-width body modes."
      />

      <Banner tone="info" title="This component takes over the viewport">
        Open the live demo to interact with the shell. The page below shows the API and a static preview of the structure.
      </Banner>

      <Section title="Open the live demo">
        <Link to="/preview/doc-shell">
          <Button trailing={<Icon icon={ArrowRight02Icon} size={14} />}>
            Launch full-screen preview
          </Button>
        </Link>
      </Section>

      <Section title="API surface">
        <CodeBlock
          language="tsx"
          code={`<DocShell>
  <DocSidebar>
    <DocSidebarBrand logo="A" name="Acme Corp" meta="john@acme.com" />
    <DocSidebarSearch onClick={openCommandPalette} />

    <DocSidebarNav>
      <SidebarNav>
        <SidebarNavSection title="Pinned" action={<AddButton />}>
          <SidebarNavItem leading={<Icon icon={Analytics01Icon} />} trailing={<PinAction />}>
            Inventory overview
          </SidebarNavItem>
          <SidebarNavItem active leading={<Icon icon={ShoppingBag01Icon} />} badge={12}>
            Orders pipeline
          </SidebarNavItem>
        </SidebarNavSection>

        <SidebarNavSection title="Sales">
          <SidebarNavParent title="Sales" leading={<Icon icon={ShoppingBag01Icon} />} defaultOpen>
            <SidebarNavItem leading={<Icon icon={Invoice03Icon} />} indent>Orders</SidebarNavItem>
            <SidebarNavItem leading={<Icon icon={UserMultiple02Icon} />} indent>Customers</SidebarNavItem>
          </SidebarNavParent>
        </SidebarNavSection>
      </SidebarNav>
    </DocSidebarNav>

    <DocSidebarFooter>
      <DocSidebarUser avatar={<Avatar name="John Doe" />} name="John Doe" meta="Admin" />
      <DocSidebarBellAction dot />
      <DocSidebarHelpAction />
    </DocSidebarFooter>
  </DocSidebar>

  <DocContent>
    <DocPageHeader
      breadcrumb={<Breadcrumbs items={[…]} />}
      title="Orders pipeline"
      subtitle="…"
      metadata={<AutoSaveStatus state="saved" />}
      actions={<><Button variant="secondary">Export</Button><Button>+ New order</Button></>}
    />
    <DocBody>
      {/* page content here */}
    </DocBody>
  </DocContent>
</DocShell>`}
        />
      </Section>

      <Section title="Behaviour" description="Highlights:">
        <ul className="ml-5 list-disc space-y-2 text-[13px] text-ink-2">
          <li>
            <strong>Sidebar bg = page bg</strong> (<code>var(--surface)</code>) so the content card is the only "lifted" element with elev-1 shadow.
          </li>
          <li>
            <strong>Collapsible to 56px</strong> via <code>B</code> key or the toggle button in the page header. Items show tooltips on hover when collapsed.
          </li>
          <li>
            <strong>Body width</strong>: <code>centered</code> (720px max-w, 12pt top spacing) for prose / forms; <code>full</code> for tables and dashboards. Toggle via <code>W</code> key.
          </li>
          <li>
            <strong>Sticky page header</strong> — gets a fading hairline + soft elev-1 shadow once the body scrolls past 8px.
          </li>
          <li>
            <strong>Brand & user dropdowns</strong> — both wired through the existing <code>&lt;Popover&gt;</code> primitive so behaviour matches every other dropdown in the system.
          </li>
          <li>
            <strong>Workspace icons</strong> — all hugeicons Stroke Rounded, 1.75 stroke. Same vocabulary as <code>&lt;SidebarNav&gt;</code>.
          </li>
        </ul>
      </Section>

      <Section title="Keyboard shortcuts">
        <div className="space-y-1.5 rounded-md border border-hairline bg-canvas p-3 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-ink-2">Toggle sidebar</span>
            <Kbd>B</Kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-2">Toggle body width (centered ↔ full)</span>
            <Kbd>W</Kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-2">Open command palette (consumer-wired)</span>
            <KbdGroup>
              <Kbd mod />
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </div>
      </Section>

      <Section title="Note on theme">
        <p className="text-[13px] text-ink-2">
          Dark mode works automatically — every token is theme-aware. Try clicking the <Icon icon={Sun02Icon} size={14} className="inline align-baseline" /> in the playground sidebar to see the shell adapt.
        </p>
      </Section>
    </div>
  )
}
