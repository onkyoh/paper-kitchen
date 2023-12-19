import { axios } from "@/lib/axios";
import { IGroceryList } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getGroceryList = (id: string): Promise<IGroceryList> => {
  return axios.get(`/grocery-lists/${id}`);
};

export const useGetGroceryListCard = (id: string, enabled: boolean) => {
  return useQuery<IGroceryList>({
    queryKey: ["grocery-list", id],
    queryFn: () => getGroceryList(id),
    enabled: enabled,
  });
};
