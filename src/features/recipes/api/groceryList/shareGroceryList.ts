import { axios } from "@/lib/axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { WEBSITE_URL } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";

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
      navigator.clipboard.writeText(`${WEBSITE_URL}/join/${data}`);
      addNotification({
        isError: false,
        message: "Share link copied",
      });
    },
    mutationFn: shareGroceryList,
  });
};
