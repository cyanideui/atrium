import * as React from "react"
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  Icon,
  Input,
  Label,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  toast,
} from "@cyanideui/ui"
import {
  PlusSignIcon,
  FilterIcon,
  MoreHorizontalIcon,
  Edit02Icon,
  Copy01Icon,
  Download04Icon,
  Delete02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

/**
 * Overlays template — a working "Orders" screen where every interaction is
 * overlay-driven. The canonical recipes for ERP overlays in one page:
 *   • Popover     — anchored filter flyout (status + amount), with Apply/Reset.
 *   • Modal (md)  — create/edit form with a footer action row.
 *   • Modal (sm)  — destructive confirm, isolated tone="critical" action.
 *   • DropdownMenu— per-row action menu with grouped items + danger zone.
 *
 * State lives in the page so the overlays reflect real data: the New/Edit
 * modal is controlled (shared for both create and edit), the confirm modal
 * tracks which row is pending deletion, and the filter popover drives the
 * visible rows.
 */

type Status = "paid" | "pending" | "failed" | "processing"

interface Order {
  id: string
  customer: string
  amount: number
  status: Status
}

const STATUS_TONE: Record<Status, "success" | "warning" | "critical" | "info"> = {
  paid: "success",
  pending: "warning",
  failed: "critical",
  processing: "info",
}

const SEED: Order[] = [
  { id: "#1042", customer: "Acme Corporation", amount: 1240, status: "paid" },
  { id: "#1041", customer: "Globex Inc.", amount: 380, status: "pending" },
  { id: "#1040", customer: "Soylent Co.", amount: 5120, status: "processing" },
  { id: "#1039", customer: "Initech LLC", amount: 96, status: "failed" },
  { id: "#1038", customer: "Umbrella Group", amount: 2310, status: "paid" },
]

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const emptyDraft = { id: "", customer: "", amount: "", status: "pending" as Status }

export function OverlaysTemplate() {
  const [orders, setOrders] = React.useState<Order[]>(SEED)

  // Filter popover state (applied vs. draft so Reset/Cancel work).
  const [statusFilter, setStatusFilter] = React.useState<Status | "all">("all")
  const [minAmount, setMinAmount] = React.useState("")

  // New/Edit modal — one controlled modal serves both create and edit.
  const [formOpen, setFormOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [draft, setDraft] = React.useState(emptyDraft)

  // Destructive confirm modal.
  const [pendingDelete, setPendingDelete] = React.useState<Order | null>(null)

  const visible = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false
    if (minAmount && o.amount < Number(minAmount)) return false
    return true
  })

  const activeFilters =
    (statusFilter !== "all" ? 1 : 0) + (minAmount ? 1 : 0)

  function openCreate() {
    setEditingId(null)
    setDraft(emptyDraft)
    setFormOpen(true)
  }

  function openEdit(order: Order) {
    setEditingId(order.id)
    setDraft({
      id: order.id,
      customer: order.customer,
      amount: String(order.amount),
      status: order.status,
    })
    setFormOpen(true)
  }

  function saveForm() {
    const amount = Number(draft.amount) || 0
    if (editingId) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingId ? { ...o, customer: draft.customer, amount, status: draft.status } : o,
        ),
      )
      toast.success(`Order ${editingId} updated`)
    } else {
      const id = `#${1043 + orders.length}`
      setOrders((prev) => [{ id, customer: draft.customer || "Untitled", amount, status: draft.status }, ...prev])
      toast.success(`Order ${id} created`)
    }
    setFormOpen(false)
  }

  function confirmDelete() {
    if (!pendingDelete) return
    setOrders((prev) => prev.filter((o) => o.id !== pendingDelete.id))
    toast.success(`Order ${pendingDelete.id} deleted`)
    setPendingDelete(null)
  }

  function duplicate(order: Order) {
    const id = `#${1043 + orders.length}`
    setOrders((prev) => [{ ...order, id }, ...prev])
    toast.success(`Duplicated to ${id}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">Orders</h1>
        <p className="m-0 text-[13px] text-ink-3">
          Overlay-driven CRUD — filter via a popover, create/edit in a modal, act on a row via a
          dropdown, and delete behind a confirm dialog.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>
            All orders
            <span className="ml-2 text-[12px] font-normal tabular-nums text-ink-3">
              {visible.length} of {orders.length}
            </span>
          </CardTitle>
          <CardAction>
            <div className="flex items-center gap-2">
              {/* ---- Popover: filter flyout ---- */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    leading={<Icon icon={FilterIcon} size="sm" />}
                  >
                    Filter
                    {activeFilters > 0 && (
                      <span className="ml-1.5 rounded-pill bg-ink px-1.5 text-[11px] font-medium tabular-nums text-canvas">
                        {activeFilters}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[260px] p-0">
                  <div className="border-b border-hairline px-3 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink-3">
                    Filter orders
                  </div>
                  <div className="flex flex-col gap-3 px-3 py-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="f-status">Status</Label>
                      <Select
                        value={statusFilter}
                        onValueChange={(v) => setStatusFilter(v as Status | "all")}
                      >
                        <SelectTrigger id="f-status" size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All statuses</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="f-amount">Min amount</Label>
                      <Input
                        id="f-amount"
                        inputMode="numeric"
                        placeholder="0"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value.replace(/[^0-9]/g, ""))}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-hairline px-3 py-2.5">
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={() => {
                        setStatusFilter("all")
                        setMinAmount("")
                      }}
                    >
                      Reset
                    </Button>
                    <PopoverClose asChild>
                      <Button size="sm" leading={<Icon icon={Tick02Icon} size="sm" />}>
                        Apply
                      </Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>

              {/* ---- Modal trigger: create ---- */}
              <Button size="sm" leading={<Icon icon={PlusSignIcon} size="sm" />} onClick={openCreate}>
                New order
              </Button>
            </div>
          </CardAction>
        </CardHeader>

        <Table fixed>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[96px]">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[120px] text-right">Amount</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[56px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-[12.5px] tabular-nums text-ink-3">
                  {order.id}
                </TableCell>
                <TableCell className="truncate text-ink">{order.customer}</TableCell>
                <TableCell className="text-right tabular-nums">{money(order.amount)}</TableCell>
                <TableCell>
                  <Badge tone={STATUS_TONE[order.status]}>
                    {titleCase(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {/* ---- DropdownMenu: per-row action menu ---- */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="tertiary"
                        size="sm"
                        aria-label={`Actions for order ${order.id}`}
                        className="h-7 w-7 p-0"
                      >
                        <Icon icon={MoreHorizontalIcon} size="sm" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Order {order.id}</DropdownMenuLabel>
                      <DropdownMenuItem
                        leading={<Icon icon={Edit02Icon} size="sm" />}
                        onSelect={() => openEdit(order)}
                      >
                        Edit
                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        leading={<Icon icon={Copy01Icon} size="sm" />}
                        onSelect={() => duplicate(order)}
                      >
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        leading={<Icon icon={Download04Icon} size="sm" />}
                        onSelect={() => toast(`Exporting ${order.id}…`)}
                      >
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        tone="critical"
                        leading={<Icon icon={Delete02Icon} size="sm" />}
                        onSelect={() => setPendingDelete(order)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* ---- Modal: create / edit form (controlled, shared) ---- */}
      <Modal open={formOpen} onOpenChange={setFormOpen}>
        <ModalContent size="md">
          <ModalHeader>
            <ModalTitle>{editingId ? `Edit order ${editingId}` : "New order"}</ModalTitle>
            <ModalDescription>
              {editingId
                ? "Update the customer, amount, and status for this order."
                : "Create an order. It'll appear at the top of the list."}
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="o-customer" required>
                  Customer
                </Label>
                <Input
                  id="o-customer"
                  placeholder="Acme Corporation"
                  value={draft.customer}
                  onChange={(e) => setDraft((d) => ({ ...d, customer: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="o-amount" required>
                  Amount (USD)
                </Label>
                <Input
                  id="o-amount"
                  inputMode="numeric"
                  placeholder="0"
                  value={draft.amount}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, amount: e.target.value.replace(/[^0-9.]/g, "") }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="o-status">Status</Label>
                <Select
                  value={draft.status}
                  onValueChange={(v) => setDraft((d) => ({ ...d, status: v as Status }))}
                >
                  <SelectTrigger id="o-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <Button onClick={saveForm}>{editingId ? "Save changes" : "Create order"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ---- Modal: destructive confirm (controlled by pendingDelete) ---- */}
      <Modal open={pendingDelete !== null} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Delete order {pendingDelete?.id}?</ModalTitle>
            <ModalDescription>This action cannot be undone.</ModalDescription>
          </ModalHeader>
          <ModalBody>
            Order {pendingDelete?.id} for{" "}
            <span className="font-medium text-ink">{pendingDelete?.customer}</span> (
            {pendingDelete ? money(pendingDelete.amount) : ""}) will be permanently removed.
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <Button
              variant="primary"
              tone="critical"
              leading={<Icon icon={Delete02Icon} size="sm" />}
              onClick={confirmDelete}
            >
              Delete order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
