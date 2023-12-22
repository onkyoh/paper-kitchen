import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types";
import { axios } from "@/lib/axios";
import useAuthStore from "../stores/useAuthStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useQuery<IUser>({
    queryKey: ["users"],
    queryFn: getUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (auth.data) {
      setUser(auth.data);
      if (location.pathname.includes("/auth/")) {
        navigate("/grocery-lists");
      }
    }
  }, [auth.data]);

  return auth;
};
