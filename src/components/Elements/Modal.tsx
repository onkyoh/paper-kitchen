import React from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import useModalStore, { ModalState } from "@/stores/useModalStore";

interface IModalProps {
  modal: keyof ModalState["isOpen"];
  isLoading?: boolean;
  children: React.ReactNode;
}

const Modal = ({ modal, isLoading, children }: IModalProps) => {
  const { isOpen, toggleOpen } = useModalStore();

  return (
    <>
      {isOpen[modal] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50" />

          <div className="fixed z-20 flex h-fit w-72 flex-col items-center gap-2 border-2 border-black bg-white p-4 shadow-md">
            {isLoading && <Spinner />}
            {children}
            <Button onClick={() => toggleOpen(modal)} className="w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
