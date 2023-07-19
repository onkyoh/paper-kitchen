import React from "react";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

const Form = ({ children, className, ...rest }: IFormProps) => {
  return (
    <form className={`flex w-full flex-col gap-2 ${className}`} {...rest}>
      {children}
    </form>
  );
};

export default Form;
