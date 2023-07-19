import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface JoinData {
  owner: string;
  title: string;
  recipeId?: number;
  groceryListId?: number;
  iat: number;
  exp: number;
}

const getJoinInfo = (url: string): Promise<JoinData> => {
  return axios.get(`/join/${url}`);
};

export const useJoinInfo = (url: string) => {
  return useQuery({
    queryKey: ["join-link"],
    queryFn: () => getJoinInfo(url),
  });
};
