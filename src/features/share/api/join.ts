import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const join = (url: string): Promise<"/grocery-lists" | "/recipes"> => {
  return axios.post(`/join/${url}`);
};

export const useJoin = () => {
  const navigate = useNavigate();
  return useMutation({
    onSuccess: (path) => {
      navigate(path);
    },
    mutationFn: join,
  });
};
