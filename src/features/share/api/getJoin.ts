import axios from "axios";
import { IGroceryList, IRecipe } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { API_URL } from "@/utils/constants";

const getJoinInfo = (url: string): Promise<IRecipe | IGroceryList> => {
  return axios.get(`${API_URL}/join/${url}`);
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
