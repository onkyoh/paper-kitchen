import { useQuery } from "@tanstack/react-query";
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
  const { setUser } = useAuthStore();

  const auth = useQuery<IUser>({
    queryKey: ["users"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (auth.data) {
      setUser(auth.data);
    }
  }, [auth.data]);

  return auth;
};
