interface IInputContainerProps {
  label: string;
  id?: string;
  children: React.ReactNode;
}

const InputContainer = ({ id, label, children }: IInputContainerProps) => {
  return (
    <>
      <label htmlFor={id} className="capitalize">
        {label}
      </label>
      {children}
    </>
  );
};

export default InputContainer;
