import { axios } from "@/lib/axios";
import { IGroceryList } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getGroceryLists = (): Promise<IGroceryList[]> => {
  return axios.get("/grocery-lists");
};

export const useGroceryLists = () => {
  return useQuery<IGroceryList[]>({
    queryKey: ["grocery-lists"],
    queryFn: () => getGroceryLists(),
  });
};
