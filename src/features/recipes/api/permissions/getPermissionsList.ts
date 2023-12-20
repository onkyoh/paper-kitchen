import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Users {
  name: string;
  userId: number;
  canEdit: boolean;
}

const getPermissions = (path: string, id: number): Promise<Users[]> => {
  return axios.get(`${path}/${id}/permissions`);
};

export const usePermissionsList = (path: string, id: number) => {
  return useQuery({
    queryKey: ["permissions", path, id],
    queryFn: () => getPermissions(path, id),
  });
};
