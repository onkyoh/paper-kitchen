import { axios } from "@/lib/axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { WEBSITE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";

interface IShareData {
  id: number;
  owner: string;
  title: string;
}

const shareRecipe = (data: IShareData): Promise<string> => {
  return axios.post(`/recipes/${data.id}/permissions`, data);
};

export const useShareRecipe = () => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onSuccess: (data) => {
      navigator.clipboard
        .writeText(
          `A recipe has been shared with you. Follow to link to join: ${WEBSITE_URL}/join/${data}`
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
    mutationFn: shareRecipe,
  });
};
