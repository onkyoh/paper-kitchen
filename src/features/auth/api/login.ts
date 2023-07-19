import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { BASE_URL } from "@/utils/constants";
import { UserPromise } from "./getUser";
import { useNavigate, useLocation } from "react-router-dom";

interface IData {
  username: string;
  password: string;
}
const login = (data: IData): Promise<UserPromise> => {
  return axios.post(`${BASE_URL}/users/login`, data, {
    withCredentials: true,
  });
};

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    onError(error: AxiosError) {
      return error.response?.data || error.message;
    },
    onSuccess: (res) => {
      const { state } = location;
      if (state && state.fromJoin) {
        navigate(state.fromJoin);
      } else {
        navigate("/recipes");
      }
      setUser(res.data);
    },
    mutationFn: login,
  });
};
