import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
  const query = useQuery({
    queryKey: ["join-link"],
    queryFn: () => getJoinInfo(url),
  });

  useEffect(() => {
    if (query.isSuccess) {
      sessionStorage.setItem("join-link", url);
    }
  }, []);

  return query;
};
