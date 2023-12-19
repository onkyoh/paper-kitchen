import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";

const forgotPassword = (email: string): Promise<string> => {
  return axios.post(`${API_URL}/users/forgot-password`, { email });
};

export const useForgotPassword = () => {
  return useMutation({
    onError(error: AxiosError) {
      return error.response?.data || error.message;
    },
    mutationFn: forgotPassword,
  });
};
