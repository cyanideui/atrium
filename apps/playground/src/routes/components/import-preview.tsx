import { ImportPreview, ImportRowStatusBadge, Button } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const ROWS = [
  { id: 1, name: "Wireless Mouse", sku: "WM-001", price: "$29.00", status: "ready" as const, note: null },
  { id: 2, name: "USB-C Cable", sku: "UC-042", price: "$12.50", status: "ready" as const, note: null },
  { id: 3, name: "Old Stock Item", sku: "OS-99", price: "$0.00", status: "warning" as const, note: "Check price" },
  { id: 4, name: "Missing SKU", sku: "—", price: "$45.00", status: "error" as const, note: "No SKU" },
  { id: 5, name: "Mechanical Keyboard", sku: "KB-103", price: "$149.00", status: "ready" as const, note: null },
  { id: 6, name: "Duplicate SKU", sku: "WM-001", price: "$29.00", status: "warning" as const, note: "Duplicate of #1" },
]

export function ImportPreviewPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Import Preview"
        status="stable"
        description="Summary tiles + preview table + import CTA. CTA auto-disables when errors > 0; pass importWithErrors to override."
      />

      <Section title="With errors (CTA disabled)">
        <Demo
          code={`<ImportPreview
  summary={{ total: 6, valid: 3, warnings: 2, errors: 1 }}
  onImport={() => doImport()}
>
  <table>...</table>
</ImportPreview>`}
        >
          <ImportPreview
            summary={{ total: ROWS.length, valid: 3, warnings: 2, errors: 1 }}
            onImport={() => alert("Importing…")}
            secondaryAction={<Button variant="secondary">Cancel</Button>}
          >
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-surface text-[11px] uppercase tracking-wider text-ink-3">
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-left">SKU</th>
                  <th className="px-3 py-2 text-right">Price</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.id} className="border-t border-hairline">
                    <td className="px-3 py-2 text-ink">{r.name}</td>
                    <td className="px-3 py-2 text-ink-3 tabular-nums">{r.sku}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.price}</td>
                    <td className="px-3 py-2">
                      <ImportRowStatusBadge status={r.status}>
                        {r.note ?? (r.status === "ready" ? "Ready" : undefined)}
                      </ImportRowStatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ImportPreview>
        </Demo>
      </Section>

      <Section title="No errors (CTA enabled)">
        <Demo code={`<ImportPreview summary={{ total: 240, valid: 240, warnings: 0, errors: 0 }} onImport={...} />`}>
          <ImportPreview
            summary={{ total: 240, valid: 240, warnings: 0, errors: 0 }}
            onImport={() => alert("Importing 240 rows…")}
          />
        </Demo>
      </Section>
    </div>
  )
}
