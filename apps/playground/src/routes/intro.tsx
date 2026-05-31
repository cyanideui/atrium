import { Badge, Banner } from "@atrium/ui"
import { PageHeader, Section } from "../components/page-shell"
import { CodeBlock } from "../components/code-block"

export function IntroPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="ERP Design System"
        title="Welcome"
        description="A compact, content-first component library for ERP applications. Built with shadcn/ui patterns + Tailwind v4 + hugeicons."
      />

      <Banner tone="info" title="This is the playground.">
        Edit components in <code>packages/ui/src/components/*</code>. Pages auto-reload on save.
      </Banner>

      <Section title="What's in here">
        <p>
          The sidebar lists every component in the system. Items marked{" "}
          <Badge tone="readonly" size="sm">
            todo
          </Badge>{" "}
          are scaffolded but not yet built — drop into the matching file in{" "}
          <code>packages/ui/src/components</code> to fill them in.
        </p>
      </Section>

      <Section title="Stack">
        <p>
          Vite + React + TypeScript · Tailwind v4 (CSS-first config via <code>@theme</code>) ·
          shadcn/ui patterns · hugeicons (Stroke Rounded only) · Shiki for code blocks.
        </p>
      </Section>

      <Section title="How to use the library in your next project">
        <p>From inside the monorepo:</p>
        <CodeBlock
          language="tsx"
          code={`import { Button, Badge, Modal } from "@atrium/ui"
import "@atrium/ui/styles/globals.css" // tokens + base styles

function App() {
  return <Button variant="primary" tone="critical">Delete</Button>
}`}
        />
        <p>
          To consume from a separate project, build the package
          (<code>pnpm --filter @atrium/ui build</code>) and either link via{" "}
          <code>file:</code>, publish to a private registry, or copy{" "}
          <code>packages/ui/src/components</code> directly.
        </p>
      </Section>

      <Section title="Theme">
        <p>
          Click the <code>☾ / ☀</code> icon in the sidebar to toggle dark mode.
          Theme is persisted in <code>localStorage</code> and applied before paint.
        </p>
      </Section>
    </div>
  )
}
