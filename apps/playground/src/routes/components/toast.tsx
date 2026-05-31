import { Button, toast } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ToastPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Toast"
        status="stable"
        description="Sonner-backed transient notifications. Mount <Toaster /> once at the app root, trigger via toast()."
      />

      <Section title="Tones">
        <Demo
          code={`toast.success("Order saved", { description: "Order #1234 was saved successfully." })
toast.info("New customer signup")
toast.warning("Low stock — only 3 left")
toast.error("Failed to sync", { description: "Server returned 500. Try again." })`}
        >
          <Button onClick={() => toast.success("Order saved", { description: "Order #1234 was saved successfully." })}>
            Success
          </Button>
          <Button variant="secondary" onClick={() => toast.info("New customer signup")}>
            Info
          </Button>
          <Button variant="primary" tone="warning" onClick={() => toast.warning("Low stock — only 3 left")}>
            Warning
          </Button>
          <Button variant="primary" tone="critical" onClick={() => toast.error("Failed to sync", { description: "Server returned 500. Try again." })}>
            Error
          </Button>
        </Demo>
      </Section>

      <Section title="With actions">
        <Demo
          code={`toast("Items archived", {
  action: { label: "Undo", onClick: () => toast("Restored") }
})`}
        >
          <Button onClick={() => toast("3 items archived", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Restored"),
            },
          })}>
            Show toast with action
          </Button>
        </Demo>
      </Section>

      <Section title="Promise toast" description="Sonner natively handles loading → success/error states.">
        <Demo
          code={`toast.promise(saveOrder(), {
  loading: "Saving order...",
  success: "Order saved",
  error: "Save failed",
})`}
        >
          <Button onClick={() => {
            const promise = new Promise((resolve, reject) => {
              setTimeout(() => Math.random() > 0.5 ? resolve("ok") : reject("fail"), 1500)
            })
            toast.promise(promise, {
              loading: "Saving order...",
              success: "Order saved",
              error: "Save failed",
            })
          }}>
            Trigger promise
          </Button>
        </Demo>
      </Section>
    </div>
  )
}
