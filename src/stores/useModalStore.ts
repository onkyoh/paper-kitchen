import { create } from "zustand";

export interface ModalState {
  isOpen: {
    createNew: boolean;
    filter: boolean;
    permissions: boolean;
    delete: boolean;
    logout: boolean;
    leave: boolean;
  };
  toggleOpen: (field: keyof ModalState["isOpen"]) => void;
  resetModals: () => void;
}

const initState = {
  createNew: false,
  filter: false,
  permissions: false,
  delete: false,
  logout: false,
  leave: false,
};

const useModalStore = create<ModalState>((set) => ({
  isOpen: {
    ...initState,
  },
  toggleOpen: (field) =>
    set((state) => ({
      isOpen: {
        ...state.isOpen,
        [field]: !state.isOpen[field],
      },
    })),
  resetModals: () => set({ isOpen: initState }),
}));

export default useModalStore;
