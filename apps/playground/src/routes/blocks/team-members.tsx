import * as React from "react"
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@cyanideui/ui"
import { Add01Icon, MoreHorizontalIcon, Mail01Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

type Role = "admin" | "editor" | "viewer"
interface Member { id: string; name: string; email: string; role: Role; pending?: boolean }
const INITIAL: Member[] = [
  { id: "1", name: "Jane Cooper", email: "jane@acme.com", role: "admin" },
  { id: "2", name: "Marcus Lee", email: "marcus@acme.com", role: "editor" },
  { id: "3", name: "Priya Patel", email: "priya@acme.com", role: "viewer" },
  { id: "4", name: "Sam Rivera", email: "sam@contractor.io", role: "viewer", pending: true },
]

export function TeamMembersBlock() {
  const [members, setMembers] = React.useState(INITIAL)
  const setRole = (id: string, role: Role) => setMembers((p) => p.map((m) => (m.id === id ? { ...m, role } : m)))
  const remove = (id: string) => setMembers((p) => p.filter((m) => m.id !== id))

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Team members"
        status="stable"
        description="Member roster — avatar, name + email, a role Select, pending/active badge, and a per-row actions menu, with an Invite action in the header. Use in settings / workspace admin."
      />
      <Section title="Preview" description="Change a role or remove a member.">
        <div className="max-w-[520px]">
          <Card>
            <CardHeader>
              <CardTitle>Members ({members.length})</CardTitle>
              <CardAction>
                <Button size="sm" leading={<Icon icon={Add01Icon} size="sm" />}>Invite</Button>
              </CardAction>
            </CardHeader>
            <ul className="m-0 flex list-none flex-col divide-y divide-hairline p-0">
              {members.map((m) => (
                <li key={m.id} className="flex items-center gap-3 px-4 py-2.5">
                  <Avatar size="sm" name={m.name} className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[13px] font-medium text-ink">{m.name}</span>
                      {m.pending && <Badge tone="warning" size="sm">Pending</Badge>}
                    </div>
                    <span className="block truncate text-[12px] text-ink-3">{m.email}</span>
                  </div>
                  <Select value={m.role} onValueChange={(v) => setRole(m.id, v as Role)}>
                    <SelectTrigger size="sm" className="w-[120px] shrink-0"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="tertiary" size="sm" aria-label={`Actions for ${m.name}`}>
                        <Icon icon={MoreHorizontalIcon} size="sm" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem leading={<Icon icon={Mail01Icon} size="sm" />}>{m.pending ? "Resend invite" : "Email"}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem tone="critical" leading={<Icon icon={Delete02Icon} size="sm" />} onSelect={() => remove(m.id)}>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
      <Section title="Install"><CodeBlock language="bash" code={`npx cyanideui add team-members`} /></Section>
    </>
  )
}
