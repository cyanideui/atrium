import { useState } from "react"
import { Pagination } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function PaginationPage() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(7)
  const [c, setC] = useState(12)

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Pagination"
        status="stable"
        description="Ghost buttons. Tinted active page. Ellipses appear automatically."
      />

      <Section title="Default">
        <Demo
          code={`const [page, setPage] = useState(1)
<Pagination page={page} total={12} onChange={setPage} />`}
        >
          <Pagination page={a} total={12} onChange={setA} />
        </Demo>
      </Section>

      <Section title="Middle position with ellipses">
        <Demo code={`<Pagination page={7} total={20} onChange={...} />`}>
          <Pagination page={b} total={20} onChange={setB} />
        </Demo>
      </Section>

      <Section title="Last page">
        <Demo code={`<Pagination page={12} total={12} onChange={...} />`}>
          <Pagination page={c} total={12} onChange={setC} />
        </Demo>
      </Section>

      <Section title="Wider window (more siblings)">
        <Demo code={`<Pagination page={10} total={20} siblings={3} />`}>
          <Pagination page={10} total={20} siblings={3} onChange={() => {}} />
        </Demo>
      </Section>
    </div>
  )
}
