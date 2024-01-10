import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import { IInfiniteRecipeQuery } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const deleteRecipe = (id: number): Promise<string> => {
  return axios.delete(`/recipes/${id}`);
};

export const useDeleteRecipe = () => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();
  return useMutation({
    onMutate: async (deletedRecipe) => {
      await queryClient.cancelQueries({ queryKey: ["recipes"] });

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
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      addNotification({
        isError: false,
        message: "Recipe deleted",
      });
      navigate("/recipes");
    },
    mutationFn: deleteRecipe,
  });
};
