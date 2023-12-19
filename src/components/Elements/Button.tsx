import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: IButtonProps) => {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center border-dashed
      hover:border-2 hover:border-solid hover:border-black hover:brightness-95
      disabled:cursor-not-allowed disabled:opacity-50 
      ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
