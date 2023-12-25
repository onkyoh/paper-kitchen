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
  const { resetModals } = useModalStore();
  return useMutation({
    onMutate: async (newRecipe) => {
      await queryClient.cancelQueries({ queryKey: ["recipes"] });

      const previousRecipes = queryClient.getQueryData<IInfiniteRecipeQuery>([
        "recipes",
      ]);

      queryClient.setQueryData(["recipes"], {
        pages: [...(previousRecipes?.pages || []), newRecipe],
        pageParams: previousRecipes?.pageParams || [],
      });

      if (!navigator.onLine) {
        resetModals();
      }

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
        message: "Recipe created",
      });
      resetModals();
    },
    mutationFn: createRecipe,
  });
};
