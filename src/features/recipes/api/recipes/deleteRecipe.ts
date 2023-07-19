import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import { IInfiniteRecipeQuery } from "@/types";
import { useMutation } from "@tanstack/react-query";
import useCardStore from "../../stores/useCardStore";

const deleteRecipe = (id: number): Promise<string> => {
  return axios.delete(`/recipes/${id}`);
};

export const useDeleteRecipe = () => {
  const { addNotification } = useNotificationStore();
  const { back } = useCardStore();
  return useMutation({
    onMutate: async (deletedRecipe) => {
      await queryClient.cancelQueries(["recipes"]);

      const previousRecipes = queryClient.getQueryData<IInfiniteRecipeQuery>([
        "recipes",
      ]);

      queryClient.setQueryData(["recipes"], {
        pages: previousRecipes?.pages?.filter(
          (recipe) => recipe.id !== deletedRecipe
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
        message: "Recipe deleted",
      });
      back();
    },
    mutationFn: deleteRecipe,
  });
};
