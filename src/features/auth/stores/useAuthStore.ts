import { create } from "zustand";

interface AuthStore {
  user: {
    id: number;
  } | null;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: 1,
  },
  logout: () => set({ user: null }),
}));

export default useAuthStore;
