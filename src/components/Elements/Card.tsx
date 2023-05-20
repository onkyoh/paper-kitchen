import { useMemo } from "react";
import { IRecipe } from "../../types";

interface IProps extends IRecipe {
  userId: number;
  handleCard: () => void;
}

const Card = ({
  id,
  userId,
  color,
  title,
  favourite,
  ownerId,
  cost,
  cookingTime,
  serves,
  handleCard,
}: IProps) => {
  const formattedTag = useMemo(() => {
    const personIcon = "👤";
    const ownerIcon = "👑";
    const favIcon = "★";
    const timeIcon = "🕗";

    const tag = `
          ${ownerId === userId ? ownerIcon + " \u2022" : ""} 
          ${favourite ? favIcon + " \u2022" : ""} 
          ${cookingTime ? timeIcon + cookingTime + " \u2022" : ""} 
          ${cost ? "$" + cost + " \u2022" : ""} 
          ${serves ? personIcon + serves + " \u2022" : ""} 
        `;

    return tag.trim().slice(0, -2);
  }, [ownerId, favourite, cookingTime, cost, serves]);

  return (
    <li
      key={id}
      className={`flex h-fit min-h-full cursor-pointer flex-col justify-between gap-2 overflow-hidden text-ellipsis border-2 border-black p-2 ${color}`}
      tabIndex={0}
      onClick={handleCard}
    >
      <p>{title}</p>
      <p>{formattedTag}</p>
    </li>
  );
};

export default Card;
