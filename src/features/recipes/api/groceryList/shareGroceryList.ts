import { axios } from "@/lib/axios";
import { WEBSITE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import useNotificationStore from "@/stores/useNotificationStore";

interface IShareData {
  id: number;
  owner: string;
  title: string;
}

const shareGroceryList = (data: IShareData): Promise<string> => {
  return axios.post(`/grocery-lists/${data.id}/permissions`, data);
};

export const useShareGroceryList = () => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: (data) => {
      navigator.clipboard
        .writeText(
          `A grocery list has been shared with you. Follow to link to join: ${WEBSITE_URL}/join/${data}`
        )
        .then(() => {
          addNotification({
            isError: false,
            message: "Share link copied",
          });
        })
        .catch(() => {
          addNotification({
            isError: true,
            message: "Failed to copy link",
          });
        });
    },
    mutationFn: shareGroceryList,
  });
};
