import { create } from "zustand";

export interface INotification {
  isError: boolean;
  message?: string;
}

interface NotificationsStore {
  notification: INotification | null;
  addNotification: (notification: INotification) => void;
  dismissNotification: () => void;
}

const useNotificationStore = create<NotificationsStore>((set) => ({
  notification: null,
  addNotification: (notification) => {
    set({ notification });
    setTimeout(() => {
      set({ notification: null });
    }, 2000);
  },
  dismissNotification: () => set({ notification: null }),
}));

export default useNotificationStore;
