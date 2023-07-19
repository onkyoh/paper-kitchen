import Axios from "axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { BASE_URL } from "@/utils/constants";

export const axios = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data || error.message;
    useNotificationStore.getState().addNotification({
      isError: true,
      message,
    });

    return Promise.reject(error);
  }
);
