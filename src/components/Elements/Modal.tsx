interface IModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IModalProps) => {
  return (
    <div
      className="fixed inset-0 z-10 m-auto flex h-1/2 w-72 flex-col items-center border-2 border-black bg-slate-200 p-2"
      style={{ boxShadow: "0 0 100vmax 100vmax rgba(0,0,0,0.3)" }}
    >
      {children}
    </div>
  );
};

export default Modal;
