import React from "react";

interface IModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: IModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50" />

          <div className="fixed z-20 flex h-fit w-72 flex-col items-center border-2 border-black bg-white p-2 shadow-md">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
