import { EmptyState, Button } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function EmptyStatePage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Empty State"
        status="stable"
        description="Centered card for zero-data screens. Title + description + optional CTA."
      />

      <Section title="Default">
        <Demo
          code={`<EmptyState
  icon="📭"
  title="No orders yet"
  description="Create your first order to get started."
  action={<Button>Create order</Button>}
/>`}
        >
          <EmptyState
            icon="📭"
            title="No orders yet"
            description="Create your first order to get started."
            action={<Button>Create order</Button>}
          />
        </Demo>
      </Section>

      <Section title="Without icon">
        <Demo
          code={`<EmptyState
  title="No results"
  description="Try a different search term."
/>`}
        >
          <EmptyState
            title="No results"
            description="Try a different search term."
          />
        </Demo>
      </Section>

      <Section title="With multiple actions">
        <Demo
          code={`<EmptyState
  icon="🔍"
  title="No customers match"
  description="Try clearing filters or invite a new customer."
  action={<><Button variant="primary">Invite customer</Button><Button variant="secondary">Clear filters</Button></>}
/>`}
        >
          <EmptyState
            icon="🔍"
            title="No customers match"
            description="Try clearing filters or invite a new customer."
            action={
              <>
                <Button variant="primary">Invite customer</Button>
                <Button variant="secondary">Clear filters</Button>
              </>
            }
          />
        </Demo>
      </Section>
    </div>
  )
}
