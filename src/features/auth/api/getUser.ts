import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types";
import { axios } from "@/lib/axios";

export interface UserPromise {
  data: {
    user: IUser;
    token: string;
  };
}

export const getUser = (): Promise<IUser> => {
  return axios.get("/users");
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
};
