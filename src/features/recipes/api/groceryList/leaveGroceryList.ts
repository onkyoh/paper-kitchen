import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import useNotificationStore from "@/stores/useNotificationStore";
import { useMutation } from "@tanstack/react-query";
import { IGroceryList } from "@/types";
import { useNavigate } from "react-router-dom";
import useModalStore from "@/stores/useModalStore";

const leaveGroceryList = (id: number): Promise<string> => {
  return axios.delete(`/grocery-lists/${id}/permissions`);
};

export const useLeaveGroceryList = () => {
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
        message: "Successfully left grocery list",
      });
      navigate("/grocery-list");
    },
    mutationFn: leaveGroceryList,
  });
};
