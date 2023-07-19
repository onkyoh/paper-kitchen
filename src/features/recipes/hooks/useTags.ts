import { useCallback } from "react";
import { TagField, IRecipe } from "../../../types";
import useCardStore from "../stores/useCardStore";

const useTags = () => {
  const card = useCardStore((state) => state.card) as IRecipe;
  const updateCard = useCardStore((state) => state.updateCard);

  const handleToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!card) return;
      updateCard({ [e.target.name]: !card[e.target.name as TagField] });
    },
    [card, updateCard]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const parsedValue = parseInt(value) || null;

      // Set specific max values based on the input name
      if (name === "serves" && parsedValue && parsedValue > 30) return;
      if (name === "cookingTime" && parsedValue && parsedValue > 600) return;
      if (name === "cost" && parsedValue && parsedValue > 300) return;

      updateCard({
        [name]: parsedValue,
      });
    },
    [updateCard]
  );

  return {
    handleToggle,
    handleChange,
  };
};

export default useTags;
