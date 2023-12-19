import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import { IGroceryList } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import useModalStore from "@/stores/useModalStore";

const deleteGroceryList = (id: number): Promise<string> => {
  return axios.delete(`/grocery-lists/${id}`);
};

export const useDeleteGroceryList = () => {
  const { addNotification } = useNotificationStore();
  const { resetModals } = useModalStore();
  const navigate = useNavigate();
  return useMutation({
    onMutate: async (deletedGroceryList) => {
      await queryClient.cancelQueries({ queryKey: ["grocery-lists"] });

      const previousGroceryLists = queryClient.getQueryData<IGroceryList[]>([
        "grocery-lists",
      ]);

      queryClient.setQueryData(
        ["grocery-lists"],
        previousGroceryLists?.filter(
          (groceryList) => groceryList.id !== deletedGroceryList
        )
      );

      if (!navigator.onLine) {
        navigate("/grocery-lists");
        return resetModals();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grocery-lists"] });
      addNotification({
        isError: false,
        message: "Grocery list deleted",
      });
      navigate("/grocery-lists");
    },
    mutationFn: deleteGroceryList,
  });
};
