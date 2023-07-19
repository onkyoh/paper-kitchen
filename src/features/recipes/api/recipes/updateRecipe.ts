import { IInfiniteRecipeQuery, IRecipe } from "@/types";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import useCardStore from "../../stores/useCardStore";

const updateRecipe = (data: IRecipe): Promise<IRecipe> => {
  return axios.put(`/recipes/${data.id}`, data);
};

export const useUpdateRecipe = () => {
  const { addNotification } = useNotificationStore();
  const { turnOffEditMode } = useCardStore();
  return useMutation({
    onMutate: async (updatingRecipe: IRecipe) => {
      await queryClient.cancelQueries(["recipes"]);

      const previousRecipes = queryClient.getQueryData<IInfiniteRecipeQuery>([
        "recipes",
      ]);

      queryClient.setQueryData(["recipes"], {
        pages: previousRecipes?.pages?.filter(
          (recipe) => recipe.id !== updatingRecipe.id
        ),
        pageParams: previousRecipes?.pageParams || [],
      });

      return { previousRecipes };
    },
    onError(_, __, context) {
      if (context?.previousRecipes) {
        queryClient.setQueryData(["recipes"], context.previousRecipes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      addNotification({
        isError: false,
        message: "Recipe updated",
      });
      turnOffEditMode();
    },
    mutationFn: updateRecipe,
  });
};
