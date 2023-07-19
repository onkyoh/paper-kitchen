import { axios } from "@/lib/axios";
import { IRecipe } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface IQueryParams {
  isOwner?: boolean;
  maxCookingTime?: string;
  maxCost?: string;
  serves?: string;
  favourite?: boolean;
  ingredients?: string[];
  page: number;
}

export type FilterParams = Omit<IQueryParams, "page">;

const PAGE_SIZE = 15;

const getRecipes = (queryParams: IQueryParams): Promise<IRecipe[]> => {
  return axios.get("/recipes", {
    params: { ...queryParams, pageSize: PAGE_SIZE },
  });
};

export const useRecipes = (filter: FilterParams) => {
  return useInfiniteQuery<IRecipe[]>({
    queryKey: ["recipes", filter],
    queryFn: ({ pageParam = 1 }) => getRecipes({ page: pageParam, ...filter }),
    getNextPageParam: (lastPage, allPages) => {
      const totalRecipes = allPages.flatMap((page) => page).length;

      if (totalRecipes % PAGE_SIZE === 0 && lastPage.length > 0) {
        return totalRecipes / PAGE_SIZE + 1;
      } else {
        return undefined;
      }
    },
  });
};
