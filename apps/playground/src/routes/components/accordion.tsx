import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function AccordionPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Accordion"
        status="stable"
        description="Borderless. Only inner hairline dividers. Smooth height transition on open/close."
      />

      <Section title="Single (default)">
        <Demo
          code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is your return policy?</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns within 30 days of purchase. Items must be in
                  original condition with tags attached. Refunds are processed
                  within 5–7 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you will receive an email with a tracking
                  number. You can also view tracking information in your account
                  under Order History.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to over 50 countries. International shipping rates
                  and delivery times vary by location. Duties and taxes may apply.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Demo>
      </Section>

      <Section title="Multiple open">
        <Demo
          code={`<Accordion type="multiple" defaultValue={["a", "b"]}>...`}
        >
          <div className="w-full">
            <Accordion type="multiple" defaultValue={["a", "b"]}>
              <AccordionItem value="a">
                <AccordionTrigger>Section A</AccordionTrigger>
                <AccordionContent>Both A and B are open by default.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Section B</AccordionTrigger>
                <AccordionContent>Click any header to toggle.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="c">
                <AccordionTrigger>Section C</AccordionTrigger>
                <AccordionContent>Closed by default.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
