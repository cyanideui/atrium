import { useLocation } from "react-router-dom"
import { Banner } from "@cyanideui/ui"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function TodoPage() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\/components\//, "")
  const componentName = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title={componentName}
        status="todo"
        description="This component is scaffolded but not yet built. Drop into the matching file below to implement it."
      />

      <Banner tone="info" title="How to add this component">
        <ol className="ml-4 list-decimal space-y-1 text-[13px]">
          <li>
            Open the design spec in <code>design.md</code> and find this component's section.
          </li>
          <li>
            Create <code>packages/ui/src/components/{slug}.tsx</code> following the patterns
            from existing components (e.g. <code>button.tsx</code>, <code>badge.tsx</code>).
          </li>
          <li>
            Export it from <code>packages/ui/src/index.ts</code>.
          </li>
          <li>
            Replace this stub by adding a route in <code>apps/playground/src/App.tsx</code> and
            creating the page at{" "}
            <code>apps/playground/src/routes/components/{slug}.tsx</code>.
          </li>
        </ol>
      </Banner>

      <Section title="Recommended starter">
        <CodeBlock
          language="tsx"
          code={`import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const ${componentName.replace(/\s+/g, "")}Variants = cva(
  "your base classes here",
  {
    variants: {
      // ...
    },
    defaultVariants: {},
  }
)

export interface ${componentName.replace(/\s+/g, "")}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${componentName.replace(/\s+/g, "")}Variants> {}

export const ${componentName.replace(/\s+/g, "")} = React.forwardRef<HTMLDivElement, ${componentName.replace(/\s+/g, "")}Props>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={cn(${componentName.replace(/\s+/g, "")}Variants(), className)} {...rest} />
  )
)
${componentName.replace(/\s+/g, "")}.displayName = "${componentName.replace(/\s+/g, "")}"`}
        />
      </Section>
    </div>
  )
}
