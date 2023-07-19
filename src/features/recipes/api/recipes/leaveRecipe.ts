import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import { useMutation } from "@tanstack/react-query";
import useCardStore from "../../stores/useCardStore";
import { IInfiniteRecipeQuery } from "@/types";

const leaveRecipe = (id: number): Promise<string> => {
  return axios.delete(`/recipes/${id}/permissions`);
};

export const useLeaveRecipe = () => {
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
        message: "Successfully left recipe",
      });
      back();
    },
    mutationFn: leaveRecipe,
  });
};
