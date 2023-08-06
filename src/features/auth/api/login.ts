import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { API_URL } from "@/utils/constants";
import { UserPromise } from "./getUser";
import { useNavigate, useLocation } from "react-router-dom";
import storage from "@/utils/storage";

interface IData {
  username: string;
  password: string;
}
const login = (data: IData): Promise<UserPromise> => {
  return axios.post(`${API_URL}/users/login`, data);
};

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    onError(error: AxiosError) {
      return error.response?.data || error.message;
    },
    onSuccess: (res) => {
      setUser(res.data.user);
      storage.setToken(res.data.token);
    },
    mutationFn: login,
  });
};
