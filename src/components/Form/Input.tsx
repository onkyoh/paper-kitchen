interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...rest }: IInputProps) => {
  return (
    <input
      type="text"
      {...rest}
      className={`flex py-1 ps-2 outline-dashed outline-2 outline-black placeholder:text-neutral-500 focus:z-10 focus:placeholder-transparent focus:outline ${className}`}
    />
  );
};

export default Input;
