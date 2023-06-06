import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ListButton = ({ children, className, ...rest }: IButtonProps) => {
  return (
    <button className={`w-1/12 ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default ListButton;
