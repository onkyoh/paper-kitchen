import { render, fireEvent } from "@testing-library/react";
import Modal from "../Modal";
import useModalStore, { ModalState } from "@/stores/useModalStore";
import { StoreApi } from "zustand";
import React from "react";

jest.mock("@/stores/useModalStore");

const mockToggleOpen = jest.fn();

(useModalStore as jest.MockedFunction<typeof useModalStore>).mockReturnValue({
  isOpen: { logout: false },
  toggleOpen: mockToggleOpen,
} as unknown as StoreApi<ModalState>);

describe("Modal", () => {
  it("should open and close the modal when toggleOpen is called", () => {
    const { getByText, queryByText, rerender } = render(
      <Modal modal="logout">
        <div>Test Content</div>
      </Modal>
    );

    expect(queryByText("Test Content")).not.toBeInTheDocument();

    (
      useModalStore as jest.MockedFunction<typeof useModalStore>
    ).mockReturnValue({
      isOpen: { logout: true },
      toggleOpen: mockToggleOpen,
    } as unknown as StoreApi<ModalState>);

    rerender(
      <Modal modal="logout">
        <div>Test Content</div>
      </Modal>
    );

    expect(getByText("Test Content")).toBeInTheDocument();

    fireEvent.click(getByText("Close"));

    expect(mockToggleOpen).toHaveBeenCalledWith("logout");
  });
});
