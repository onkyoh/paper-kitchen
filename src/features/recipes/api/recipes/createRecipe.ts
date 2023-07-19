import { axios } from "@/lib/axios";
import { ICreateCard, IInfiniteRecipeQuery, IRecipe } from "@/types";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import useModalStore from "@/stores/useModalStore";

const createRecipe = (data: ICreateCard): Promise<IRecipe> => {
  return axios.post("/recipes", data);
};

export const useCreateRecipe = () => {
  const { addNotification } = useNotificationStore();
  const resetModals = useModalStore((state) => state.resetModals);
  return useMutation({
    onMutate: async (newRecipe) => {
      await queryClient.cancelQueries(["recipes"]);

      const previousRecipes = queryClient.getQueryData<IInfiniteRecipeQuery>([
        "recipes",
      ]);

      queryClient.setQueryData(["recipes"], {
        pages: [...(previousRecipes?.pages || []), newRecipe],
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
        message: "Recipe created",
      });
      resetModals();
    },
    mutationFn: createRecipe,
  });
};
