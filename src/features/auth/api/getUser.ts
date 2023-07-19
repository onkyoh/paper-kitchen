import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types";
import { BASE_URL } from "@/utils/constants";

export interface UserPromise {
  data: IUser;
}

export const getUser = (): Promise<UserPromise> => {
  return axios.get(`${BASE_URL}/users`, {
    withCredentials: true,
  });
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
};
