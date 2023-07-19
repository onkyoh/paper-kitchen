import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import { useMutation } from "@tanstack/react-query";
import useCardStore from "../../stores/useCardStore";
import { IGroceryList } from "@/types";

const leaveGroceryList = (id: number): Promise<string> => {
  return axios.delete(`/grocery-lists/${id}/permissions`);
};

export const useLeaveGroceryList = () => {
  const { addNotification } = useNotificationStore();
  const { back } = useCardStore();
  return useMutation({
    onMutate: async (deletedGroceryList) => {
      await queryClient.cancelQueries(["grocery-lists"]);

      const previousGroceryLists = queryClient.getQueryData<IGroceryList[]>([
        "grocery-lists",
      ]);

      queryClient.setQueryData(
        ["grocery-lists"],
        previousGroceryLists?.filter(
          (groceryList) => groceryList.id !== deletedGroceryList
        )
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
      queryClient.invalidateQueries(["grocery-lists"]);
      addNotification({
        isError: false,
        message: "Successfully left grocery list",
      });
      back();
    },
    mutationFn: leaveGroceryList,
  });
};
