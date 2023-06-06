import { TagField, IRecipe } from "../../../types";
import useCardStore from "../stores/useCardStore";

const useTags = () => {
  const card = useCardStore((state) => state.card) as IRecipe;
  const updateCard = useCardStore((state) => state.updateCard);

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
    if (!card) return;
    updateCard({ ...card, [e.target.name]: !card[e.target.name as TagField] });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsRegex = /^[0-9]*$/;
    if (digitsRegex.test(e.target.value))
      updateCard({
        ...card,
        [e.target.name]: parseInt(e.target.value) || null,
      });
  }

  return {
    handleToggle,
    handleChange,
  };
};

export default useTags;
