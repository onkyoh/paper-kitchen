import { axios } from "@/lib/axios";
import { ICreateCard, IGroceryList } from "@/types";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import useModalStore from "@/stores/useModalStore";

const createGroceryList = (data: ICreateCard): Promise<IGroceryList> => {
  return axios.post("/grocery-lists", data);
};

export const useCreateGroceryList = () => {
  const { addNotification } = useNotificationStore();
  const { resetModals } = useModalStore();
  return useMutation({
    onMutate: async (newGroceryList) => {
      await queryClient.cancelQueries({ queryKey: ["grocery-lists"] });

      const previousGroceryLists = queryClient.getQueryData<IGroceryList[]>([
        "grocery-lists",
      ]);

      queryClient.setQueryData(
        ["grocery-lists"],
        [...(previousGroceryLists || []), newGroceryList]
      );

      return { previousGroceryLists };
    },
    onError(_, __, context) {
      if (context?.previousGroceryLists) {
        queryClient.setQueryData(
          ["grocery-lists"],
          context.previousGroceryLists
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grocery-lists"] });
      addNotification({
        isError: false,
        message: "Grocery list created",
      });
      resetModals();
    },
    mutationFn: createGroceryList,
  });
};
