import { create } from "zustand";
import { IUser } from "@/types";

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));

export default useAuthStore;
