import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  Button,
  Input,
  Label,
} from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ModalPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Modal"
        status="stable"
        description="Centered overlay with backdrop. 4 sizes. Built on Radix Dialog with full focus management."
      />

      <Section title="Confirm action (small)">
        <Demo
          code={`<Modal>
  <ModalTrigger asChild>
    <Button variant="primary" tone="critical">Delete order</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm action</ModalTitle>
      <ModalDescription>This action cannot be undone.</ModalDescription>
    </ModalHeader>
    <ModalBody>Order #1234 will be permanently removed.</ModalBody>
    <ModalFooter>
      <ModalClose asChild><Button variant="secondary">Cancel</Button></ModalClose>
      <Button variant="primary" tone="critical">Delete</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`}
        >
          <Modal>
            <ModalTrigger asChild>
              <Button variant="primary" tone="critical">
                Delete order
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Confirm action</ModalTitle>
                <ModalDescription>This action cannot be undone.</ModalDescription>
              </ModalHeader>
              <ModalBody>Order #1234 will be permanently removed.</ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </ModalClose>
                <Button variant="primary" tone="critical">
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Demo>
      </Section>

      <Section title="Edit form (medium)">
        <Demo
          code={`<Modal>
  <ModalTrigger asChild><Button>Edit order</Button></ModalTrigger>
  <ModalContent size="md">
    <ModalHeader><ModalTitle>Edit order #1234</ModalTitle></ModalHeader>
    <ModalBody>...</ModalBody>
    <ModalFooter>...</ModalFooter>
  </ModalContent>
</Modal>`}
        >
          <Modal>
            <ModalTrigger asChild>
              <Button>Edit order</Button>
            </ModalTrigger>
            <ModalContent size="md">
              <ModalHeader>
                <ModalTitle>Edit order #1234</ModalTitle>
                <ModalDescription>Update customer details and amount.</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="customer" required>
                      Customer
                    </Label>
                    <Input id="customer" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="amount" required>
                      Amount
                    </Label>
                    <Input id="amount" defaultValue="$1,240.00" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </ModalClose>
                <Button>Save changes</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Demo>
      </Section>
    </div>
  )
}
