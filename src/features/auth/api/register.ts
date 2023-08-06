import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/utils/constants";
import { UserPromise } from "./getUser";
import storage from "@/utils/storage";

interface IData {
  name: string;
  username: string;
  password: string;
}

const register = (data: IData): Promise<UserPromise> => {
  return axios.post(`${API_URL}/users/register`, data);
};

export const useRegister = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    onError(error: AxiosError) {
      return error.response?.data || error.message;
    },
    onSuccess: (res) => {
      setUser(res.data.user);
      storage.setToken(res.data.token);
    },
    mutationFn: register,
  });
};
