import { create } from "zustand";
import { IGroceryList, IRecipe } from "@/types";
import useModalStore from "../../../stores/useModalStore";

interface CardStore {
  card: null | IRecipe | IGroceryList;
  isChanged: boolean;
  selectCard: (card: IRecipe | IGroceryList) => void;
  resetIsChanged: () => void;
  back: () => void;
  updateCard: (updatedFields: Partial<IRecipe> | Partial<IGroceryList>) => void;
  editMode: boolean;
  toggleEditMode: () => void;
  turnOffEditMode: () => void;
}

const useCardStore = create<CardStore>((set) => {
  return {
    card: null,
    isChanged: false,
    selectCard: (card) => set(() => ({ card })),
    back: () => {
      set({ card: null });
      set({ editMode: false });
      set({ isChanged: false });
      useModalStore.getState().resetModals();
    },
    resetIsChanged: () => {
      set({ isChanged: false });
    },
    updateCard: (updatedFields) =>
      set((state) => {
        if (state.card === null) {
          return state;
        }
        set({ isChanged: true });
        if (state.card.type === "recipe") {
          return {
            card: {
              ...(state.card as IRecipe),
              ...(updatedFields as Partial<IRecipe>),
            },
          };
        }
        return {
          card: {
            ...(state.card as IGroceryList),
            ...(updatedFields as Partial<IGroceryList>),
          },
        };
      }),
    editMode: false,
    toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
    turnOffEditMode: () => {
      set({ editMode: false });
      set({ isChanged: false });
    },
  };
});

export default useCardStore;
