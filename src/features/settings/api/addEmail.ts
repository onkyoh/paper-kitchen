import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { queryClient } from "@/lib/react-query";
import { IUser } from "@/types";

const addEmail = (email: string): Promise<string> => {
  return axios.post("/users/add-email", { email });
};

export const useAddEmail = () => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newEmail: string) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUser = queryClient.getQueryData<IUser[]>(["users"]);

      queryClient.setQueryData(["users"], { ...previousUser, email: newEmail });

      return { previousUser };
    },
    onError(_, __, context) {
      if (context?.previousUser) {
        queryClient.setQueryData(["users"], context.previousUser);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      addNotification({
        isError: false,
        message: "An authentication link has been emailed",
      });
    },
    mutationFn: addEmail,
  });
};
