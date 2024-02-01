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
  });

  useEffect(() => {
    if (auth.data) {
      setUser(auth.data);
    }

    if (location.pathname.includes("/auth/")) {
      navigate("/grocery-lists");
    }
  }, [auth.isSuccess]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (auth.isFetching) {
        await queryClient.cancelQueries({ queryKey: ["users"] });
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [auth.isFetching]);

  return auth;
};
