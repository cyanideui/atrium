import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  Label,
} from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SelectPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Select"
        status="stable"
        description="Same surface as Input. Trailing chevron. Built on Radix Select with full keyboard navigation."
      />

      <Section title="Default">
        <Demo
          code={`<Select>
  <SelectTrigger><SelectValue placeholder="Choose status..." /></SelectTrigger>
  <SelectContent>
    <SelectItem value="paid">Paid</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="failed">Failed</SelectItem>
  </SelectContent>
</Select>`}
        >
          <div className="w-full max-w-xs">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose status…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Demo>
      </Section>

      <Section title="With label & default value">
        <Demo
          code={`<Label htmlFor="x">Currency</Label>
<Select defaultValue="USD">
  <SelectTrigger id="x"><SelectValue /></SelectTrigger>
  ...
</Select>`}
        >
          <div className="w-full max-w-xs space-y-1.5">
            <Label htmlFor="cur">Currency</Label>
            <Select defaultValue="USD">
              <SelectTrigger id="cur">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="EUR">EUR — Euro</SelectItem>
                <SelectItem value="GBP">GBP — British Pound</SelectItem>
                <SelectItem value="JPY">JPY — Japanese Yen</SelectItem>
                <SelectItem value="IDR">IDR — Indonesian Rupiah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Demo>
      </Section>

      <Section title="Grouped">
        <Demo
          code={`<SelectGroup><SelectLabel>...</SelectLabel><SelectItem>...</SelectItem></SelectGroup>`}
        >
          <div className="w-full max-w-xs">
            <Select defaultValue="orders">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sales</SelectLabel>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Inventory</SelectLabel>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="warehouses">Warehouses</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo code={`<SelectTrigger size="sm" />`}>
          <div className="w-full max-w-xs space-y-3">
            <Select defaultValue="a">
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Small (28px)</SelectItem>
                <SelectItem value="b">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="a">
              <SelectTrigger size="md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Medium (36px) — default</SelectItem>
                <SelectItem value="b">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="a">
              <SelectTrigger size="lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Large (40px)</SelectItem>
                <SelectItem value="b">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
