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
  const { user, setUser } = useAuthStore();

  const cachedUser = queryClient.getQueryCache().find({ queryKey: ["users"] })
    ?.state.data as IUser | null;

  useEffect(() => {
    if (cachedUser && !user) {
      setUser(cachedUser);
    }
  }, [cachedUser, user, setUser]);

  const auth = useQuery<IUser>({
    queryKey: ["users"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (auth.isSuccess) {
      setUser(auth.data);
    }
  }, [auth.isSuccess]);

  return auth;
};
