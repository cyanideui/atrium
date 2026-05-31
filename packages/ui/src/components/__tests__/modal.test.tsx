import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "../modal"

describe("<Modal>", () => {
  it("does not render content when closed", () => {
    render(
      <Modal open={false} onOpenChange={() => {}}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>X</ModalTitle>
          </ModalHeader>
        </ModalContent>
      </Modal>,
    )
    expect(screen.queryByText("X")).not.toBeInTheDocument()
  })

  it("renders title + description when open", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirm delete</ModalTitle>
            <ModalDescription>This cannot be undone.</ModalDescription>
          </ModalHeader>
        </ModalContent>
      </Modal>,
    )
    expect(screen.getByText("Confirm delete")).toBeInTheDocument()
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument()
  })

  it("fires onOpenChange when the close button is clicked", async () => {
    const onOpenChange = vi.fn()
    render(
      <Modal open onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>X</ModalTitle>
          </ModalHeader>
        </ModalContent>
      </Modal>,
    )
    // The close button is rendered automatically by ModalContent.
    const close = screen.getByRole("button", { name: /close/i })
    await userEvent.click(close)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
