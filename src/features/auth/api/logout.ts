import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import useAuthStore from "../stores/useAuthStore";
import useModalStore from "@/stores/useModalStore";

const logout = () => {
  return axios.post("/users/logout");
};

export const useLogout = () => {
  const { setUser } = useAuthStore();
  const { toggleOpen } = useModalStore();
  return useMutation({
    onSuccess: () => {
      queryClient.clear();
      setUser(null);
      toggleOpen("logout");
    },
    mutationFn: logout,
  });
};
