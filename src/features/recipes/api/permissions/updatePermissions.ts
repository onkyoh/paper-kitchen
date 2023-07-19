import { axios } from "@/lib/axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    onSuccess: () => {
      addNotification({
        isError: false,
        message: "Permissions updated successfully",
      });
    },
    mutationFn: updatePermissions,
  });
};
