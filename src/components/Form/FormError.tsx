import { AxiosError } from "axios";
import { useMemo } from "react";

interface IErrorProps {
  errorMessage: AxiosError | null;
  className?: string;
}
const FormError = ({ errorMessage, className }: IErrorProps) => {
  const error = useMemo(() => {
    const err = errorMessage?.response?.data || errorMessage?.message;
    return err || "";
  }, [errorMessage]);

  return (
    error && (
      <span className={`text-center capitalize ${className}`}>
        {String(error)}
      </span>
    )
  );
};

export default FormError;
