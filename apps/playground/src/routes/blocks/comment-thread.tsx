import * as React from "react"
import { Avatar, Button, Textarea } from "@cyanideui/ui"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

interface Comment { id: string; author: string; at: string; body: string }
const INITIAL: Comment[] = [
  { id: "1", author: "Jane Cooper", at: "2 days ago", body: "Customer asked to split this into two shipments — flagging for ops." },
  { id: "2", author: "Marcus Lee", at: "1 day ago", body: "Done. First shipment goes out today, second once the backorder clears." },
  { id: "3", author: "Priya Patel", at: "3 hours ago", body: "Confirmed with the warehouse. Tracking numbers attached to the order." },
]

export function CommentThreadBlock() {
  const [comments, setComments] = React.useState(INITIAL)
  const [draft, setDraft] = React.useState("")
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    setComments((p) => [...p, { id: String(Date.now()), author: "You", at: "just now", body }])
    setDraft("")
  }
  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Comment thread"
        status="stable"
        description="A list of comments (avatar, author, timestamp, body) with a reply composer at the bottom. Use for record discussions, review threads, activity comments."
      />
      <Section title="Preview" description="Type a comment and submit to append it.">
        <div className="max-w-[560px]">
          <section className="flex flex-col gap-4">
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <Avatar size="sm" name={c.author} className="mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13px] font-semibold text-ink">{c.author}</span>
                      <span className="text-[11.5px] text-ink-4">{c.at}</span>
                    </div>
                    <p className="m-0 mt-0.5 text-[13px] leading-relaxed text-ink-2">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <form onSubmit={submit} className="flex gap-3">
              <Avatar size="sm" name="You" className="mt-0.5 shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col items-end gap-2">
                <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2} placeholder="Add a comment…" aria-label="Add a comment" className="min-h-[64px]" />
                <Button type="submit" size="sm" disabled={!draft.trim()}>Comment</Button>
              </div>
            </form>
          </section>
        </div>
      </Section>
      <Section title="Install"><CodeBlock language="bash" code={`npx cyanideui add comment-thread`} /></Section>
    </>
  )
}
