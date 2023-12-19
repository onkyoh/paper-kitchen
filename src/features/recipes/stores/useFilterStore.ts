import { create } from "zustand";
import { FilterParams } from "../api/recipes/getRecipes";
import useModalStore from "@/stores/useModalStore";

interface FilterStore {
  filter: FilterParams;
  updateFilter: (newFilter: FilterParams) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filter: {},
  updateFilter: (newFilter) => {
    if (useModalStore.getState().isOpen.filter) {
      useModalStore.getState().toggleOpen("filter");
    }
    set({ filter: newFilter });
  },
}));

export default useFilterStore;
