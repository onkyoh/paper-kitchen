import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { IUser } from "@/types";

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>
) => StateCreator<AuthStore>;

const useAuthStore = create<AuthStore, []>(
  (persist as MyPersist)(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "paperkitchen-auth",
    }
  )
);

export default useAuthStore;
