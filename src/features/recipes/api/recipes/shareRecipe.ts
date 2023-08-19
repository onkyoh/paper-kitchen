import { axios } from "@/lib/axios";
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
  return useMutation({
    mutationFn: shareRecipe,
  });
};
