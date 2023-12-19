import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { IUser } from "@/types";
import { axios } from "@/lib/axios";
import useAuthStore from "../stores/useAuthStore";
import { useEffect } from "react";

export interface UserPromise {
  data: {
    user: IUser;
    token: string;
  };
}

export const getUser = (): Promise<IUser> => {
  return axios.get("/users");
};

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const auth = useQuery<IUser>({
    queryKey: ["users"],
    queryFn: getUser,
  });

  useEffect(() => {
    const cachedUser = queryClient.getQueryCache().find({ queryKey: ["users"] })
      ?.state.data as IUser | null;

    if (cachedUser && auth.isPending) {
      setUser(cachedUser);
    }
    if (auth.isSuccess) {
      setUser(auth.data);
    }
  }, [auth.data, auth.isSuccess]);

  return auth;
};
