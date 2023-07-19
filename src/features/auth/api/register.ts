import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";
import { UserPromise } from "./getUser";

interface IData {
  name: string;
  username: string;
  password: string;
}

const register = (data: IData): Promise<UserPromise> => {
  return axios.post(`${BASE_URL}/users/register`, data, {
    withCredentials: true,
  });
};

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    onError(error: AxiosError) {
      return error.response?.data || error.message;
    },
    onSuccess: (res) => {
      const url = sessionStorage.getItem("url");
      if (url) {
        sessionStorage.removeItem("url");
        navigate(`/join/${url}`);
      } else {
        navigate("/recipes");
      }
      setUser(res.data);
    },
    mutationFn: register,
  });
};
