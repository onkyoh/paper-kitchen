import { axios } from "@/lib/axios";
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
  return useMutation({
    mutationFn: shareGroceryList,
  });
};
