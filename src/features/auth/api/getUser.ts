import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types";
import { axios } from "@/lib/axios";
import useAuthStore from "../stores/useAuthStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const getUser = (): Promise<IUser> => {
  return axios.get("/users", { timeout: 5000 });
};

export const useAuth = () => {
  const { setUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useQuery<IUser>({
    queryKey: ["users"],
    queryFn: getUser,
    retry: 2,
  });

  useEffect(() => {
    if (auth.data) {
      setUser(auth.data);
    }
  }, [auth.isSuccess]);

  return auth;
};
