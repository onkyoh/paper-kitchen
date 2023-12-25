import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types";
import { axios } from "@/lib/axios";
import useAuthStore from "../stores/useAuthStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/react-query";

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
    networkMode: "always",
    initialData: queryClient.getQueryData<IUser>(["users"]),
  });

  useEffect(() => {
    setUser(auth.data ?? queryClient.getQueryData<IUser>(["users"]) ?? null);
    if (location.pathname.includes("/auth/")) {
      navigate("/grocery-lists");
    }
  }, [auth.status]);

  return auth;
};
