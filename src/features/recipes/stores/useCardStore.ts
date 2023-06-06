import { create } from "zustand";
import { IGroceryList, IRecipe } from "../../../types";

interface CardStore {
  card: null | IRecipe | IGroceryList;
  selectCard: (card: IRecipe | IGroceryList) => void;
  back: () => void;
  updateCard: (updatedFields: Partial<IRecipe> | Partial<IGroceryList>) => void;
}

const useCardStore = create<CardStore>((set) => ({
  card: null,
  selectCard: (card) => set(() => ({ card })),
  back: () => set({ card: null }),
  updateCard: (updatedFields) =>
    set((state) => {
      if (state.card === null) {
        return state;
      }
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
}));

export default useCardStore;
