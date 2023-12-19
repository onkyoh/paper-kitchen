import { axios } from "@/lib/axios";
import useNotificationStore from "@/stores/useNotificationStore";
import { useMutation } from "@tanstack/react-query";
import { WEBSITE_URL } from "@/utils/constants";

interface ShareLinkParams {
  id: number;
  path: "recipes" | "grocery-lists";
}

const shareLink = (data: ShareLinkParams): Promise<string> => {
  return axios.post(`/${data.path}/${data.id}/permissions`);
};

export const useShareLink = () => {
  const { addNotification } = useNotificationStore();

  const mutation = useMutation({
    onMutate: () => {
      if (!navigator.onLine) {
        addNotification({
          isError: true,
          message: "Requires internet connection",
        });
        return;
      }
    },
    mutationFn: shareLink,
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${WEBSITE_URL}/join/${mutation.data}`
      );
      addNotification({
        isError: false,
        message: "Link copied",
      });
    } catch (err) {
      addNotification({
        isError: true,
        message: "Error copying link",
      });
    }
  };

  return { ...mutation, copy };
};
