import {
  PageShell,
  PageShellAction,
  PageShellDivider,
  Breadcrumbs,
  Button,
  ButtonGroup,
  AutoSaveStatus,
  Tabs,
  TabsList,
  TabsTrigger,
  Badge,
  Banner,
  Icon,
} from "@atrium/ui"
import {
  Moon02Icon,
  HelpCircleIcon,
  GithubIcon,
  Notification03Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

/**
 * The unified <PageShell> showcase.
 *
 * The library's <PageShell> renders both:
 *   - the shell-level **app bar** (sticky top, sidebar toggle + breadcrumb + actions)
 *   - the page-level **page header** (title + subtitle + metadata + actions)
 *   - optional **banner** (non-sticky) and **tabs** (sticky)
 *
 * It auto-detects whether it sits inside <DocShell>: outside, only the page
 * header renders. Inside, both bars render and the built-in sidebar/width
 * toggles are wired automatically.
 *
 * The previews below are deliberately scoped — they sit inside fake content
 * cards so the sticky bars stick to the demo container, not the page itself.
 */
export function PageShellComponentPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Page Shell"
        status="stable"
        description="The single page-header component. Renders an optional sticky app bar (when inside <DocShell>) plus a sticky page header with title, subtitle, metadata, banner, primary/secondary actions, and tabs."
      />

      <Section
        title="Anatomy"
        description="Title + subtitle + metadata on the left, secondary actions + primary action on the right. Banner above, tabs below."
      >
        <Demo
          code={`<PageShell
  breadcrumb={<Breadcrumbs items={...} />}     // appears in the app bar
  appBarActions={<>                            // appears in the app bar
    <PageShellAction icon={...} label="Theme" onClick={...} />
    <PageShellAction icon={...} label="Help" onClick={...} />
  </>}
  banner={<Banner ... />}                      // non-sticky, scrolls away
  title="Edit SKU"
  subtitle="Update product details"
  metadata={<AutoSaveStatus state="saved" />}
  secondaryActions={<Button variant="secondary">Discard</Button>}
  primaryAction={<Button>Save</Button>}
  tabs={<Tabs>...</Tabs>}                      // sticky just below header
>
  {pageBody}
</PageShell>`}
        >
          <div className="relative h-[420px] w-full overflow-hidden rounded-md border border-hairline bg-canvas">
            <PageShell
              title="Edit SKU"
              subtitle="Update product details and stock levels for WM-001."
              metadata={<AutoSaveStatus state="saved" savedAt="2 minutes ago" />}
              secondaryActions={<Button variant="secondary" size="sm">Discard</Button>}
              primaryAction={<Button size="sm">Save changes</Button>}
              tabs={
                <Tabs defaultValue="general">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="pricing" className="gap-2">
                      Pricing <Badge tone="warning" size="sm" dotless>2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            >
              <div className="px-8 py-8 text-[13px] text-ink-3">
                Page body goes here. Scrolls under the sticky tabs row.
              </div>
            </PageShell>
          </div>
        </Demo>
      </Section>

      <Section
        title="With banner"
        description="The banner sits above the page header and is non-sticky — it scrolls away with the body."
      >
        <Demo>
          <div className="relative h-[420px] w-full overflow-hidden rounded-md border border-hairline bg-canvas">
            <PageShell
              banner={
                <Banner tone="warning" title="Reorder needed">
                  12 SKUs are below their reorder threshold.
                </Banner>
              }
              title="Inventory"
              subtitle="3,420 SKUs across 4 warehouses"
              secondaryActions={
                <ButtonGroup>
                  <Button variant="secondary" size="sm">Export</Button>
                  <Button variant="secondary" size="sm">Filters</Button>
                </ButtonGroup>
              }
              primaryAction={<Button size="sm">+ New SKU</Button>}
            >
              <div className="px-8 py-8 text-[13px] text-ink-3">
                Page body. Scroll up to see the banner peel off; the page header pins.
              </div>
            </PageShell>
          </div>
        </Demo>
      </Section>

      <Section
        title="Minimal"
        description="Just a title and a primary action. The simplest valid invocation."
      >
        <Demo>
          <div className="relative w-full overflow-hidden rounded-md border border-hairline bg-canvas">
            <PageShell
              title="Dashboard"
              primaryAction={<Button size="sm">+ New order</Button>}
            >
              <div className="px-8 py-6 text-[13px] text-ink-3">Body…</div>
            </PageShell>
          </div>
        </Demo>
      </Section>

      <Section
        title="App-bar slot reference"
        description="The app-bar slot only renders when <PageShell> is used inside <DocShell>. Outside the shell (e.g. the previews above), the slot is omitted automatically. Within DocShell, you get a built-in sidebar toggle on the left, your breadcrumb in the middle, the built-in width toggle, then your appBarActions cluster."
      >
        <Demo
          code={`// Inside <DocShell>:
<PageShell
  breadcrumb={<Breadcrumbs items={[
    { label: "Sales" },
    { label: "Orders" },
    { label: "Pipeline" },
  ]} />}
  appBarActions={
    <>
      <PageShellAction icon={...} label="Notifications" dot />
      <PageShellAction icon={...} label="Help" onClick={openCheatsheet} />
      <PageShellDivider />
      <PageShellAction icon={...} label="GitHub" href="https://github.com" />
    </>
  }
  title="Orders pipeline"
/>`}
        >
          {/* Visual sketch (not functional outside DocShell) */}
          <div className="flex h-11 w-full items-center gap-2 rounded-md border border-hairline bg-canvas px-4">
            <div className="text-[13px] text-ink-3">
              ⇤ <span className="text-ink-3">Sales › Orders ›</span>{" "}
              <span className="font-medium text-ink">Pipeline</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-0.5">
              <PageShellAction icon={<Icon icon={Notification03Icon} size={14} />} label="Notifications" dot />
              <PageShellAction icon={<Icon icon={Moon02Icon} size={14} />} label="Theme" />
              <PageShellAction icon={<Icon icon={HelpCircleIcon} size={14} />} label="Help" />
              <PageShellDivider />
              <PageShellAction icon={<Icon icon={GithubIcon} size={14} />} label="GitHub" href="https://github.com" />
            </div>
          </div>
          <p className="mt-3 text-[12.5px] text-ink-3">
            Open the <a href="/preview/doc-shell" className="text-info underline">/preview/doc-shell</a> page to see the real, fully-functional app bar.
          </p>
        </Demo>
      </Section>
    </div>
  )
}
