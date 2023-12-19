import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { API_URL } from "@/utils/constants";
import { UserPromise } from "./getUser";
import storage from "@/utils/storage";

const authenticateEmail = (url: string): Promise<UserPromise> => {
  return axios.patch(`${API_URL}/users/authenticate-email/${url}`);
};
export const useAuthenticateEmail = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    onError(error: AxiosError) {
      return error.response?.data || error.message;
    },
    onSuccess: (res) => {
      setUser(res.data.user);
      storage.setToken(res.data.token);
    },
    mutationFn: authenticateEmail,
  });
};
