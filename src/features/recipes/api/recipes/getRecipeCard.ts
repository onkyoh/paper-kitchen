import { axios } from "@/lib/axios";
import { IRecipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getRecipeCard = (id: string): Promise<IRecipe> => {
  return axios.get(`/recipes/${id}`);
};

export const useGetRecipeCard = (id: string, enabled: boolean) => {
  return useQuery<IRecipe>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeCard(id),
    enabled: enabled,
  });
};
