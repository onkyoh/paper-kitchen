import { useIsRestoring } from "@tanstack/react-query";
import Spinner from "../Elements/Spinner";

interface IPersistGate {
  children: React.ReactNode;
}

export function PersistGate({ children }: IPersistGate) {
  const isRestoring = useIsRestoring();

  return isRestoring ? <Spinner /> : <>{children}</>;
}
