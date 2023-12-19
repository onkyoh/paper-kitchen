import { IGroceryList } from "@/types";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import useCardStore from "../../stores/useCardStore";
import useModalStore from "@/stores/useModalStore";

const updateGroceryList = (data: IGroceryList): Promise<IGroceryList> => {
  return axios.put(`/grocery-lists/${data.id}`, data);
};

export const useUpdateGroceryList = () => {
  const { addNotification } = useNotificationStore();
  const { turnOffEditMode, selectCard } = useCardStore();

  return useMutation({
    onMutate: async (updatingGroceryList: IGroceryList) => {
      await queryClient.cancelQueries({ queryKey: ["grocery-lists"] });

      const previousGroceryLists = queryClient.getQueryData<IGroceryList[]>([
        "grocery-lists",
      ]);

      queryClient.setQueryData(
        ["grocery-lists"],
        [
          ...(previousGroceryLists?.filter(
            (lists) => lists.id !== updatingGroceryList.id
          ) || []),
          updatingGroceryList,
        ]
      );

      if (!navigator.onLine) {
        return turnOffEditMode();
      }

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
    onSuccess: (card) => {
      queryClient.invalidateQueries({ queryKey: ["grocery-lists"] });
      selectCard(card);
      addNotification({
        isError: false,
        message: "Grocery list updated",
      });
      turnOffEditMode();
    },
    mutationFn: updateGroceryList,
  });
};
