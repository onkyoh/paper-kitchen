import { axios } from "@/lib/axios";
import useModalStore from "@/stores/useModalStore";
import useNotificationStore from "@/stores/useNotificationStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

interface IData {
  path: string;
  id: number;
  editingIds: number[];
  deletingIds: number[];
}

const updatePermissions = (data: IData): Promise<string> => {
  return axios.put(`${data.path}/${data.id}/permissions`, {
    editingIds: data.editingIds,
    deletingIds: data.deletingIds,
  });
};

export const useUpdatePermissions = () => {
  const { addNotification } = useNotificationStore();
  const { resetModals } = useModalStore();

  return useMutation({
    onMutate: async (newPermissions: IData) => {
      const queryKey = ["permissions", newPermissions.path, newPermissions.id];
      await queryClient.cancelQueries({ queryKey });

      const previousPermissions = queryClient.getQueryData<IData>(queryKey);

      queryClient.setQueryData(queryKey, newPermissions);

      return { previousPermissions, queryKey };
    },
    onError: (_, __, context) => {
      if (context?.previousPermissions) {
        queryClient.setQueryData(context.queryKey, context.previousPermissions);
      }
      addNotification({
        isError: true,
        message: "Error updating permissions",
      });
    },
    onSuccess: (_, newPermissions) => {
      queryClient.invalidateQueries({
        queryKey: ["permissions", newPermissions.path, newPermissions.id],
      });

      addNotification({
        isError: false,
        message: "Permissions updated successfully",
      });
      resetModals();
    },
    mutationFn: updatePermissions,
  });
};
