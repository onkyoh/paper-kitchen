import Axios, { InternalAxiosRequestConfig } from "axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { API_URL } from "@/utils/constants";
import storage from "@/utils/storage";

function networkCheckInterceptor(config: InternalAxiosRequestConfig) {
  if (!navigator.onLine) {
    const error = new Error("Internet Connection Required");
    return Promise.reject(error);
  }
  return config;
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";

  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axios.interceptors.request.use(networkCheckInterceptor);
axios.interceptors.request.use(authRequestInterceptor);
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
