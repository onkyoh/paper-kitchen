import { IGroceryList, IRecipe } from "../../../../types";
import useCardStore from "../../stores/useCardStore";
import TagList from "../Tags/TagList";

interface ICardListProps {
  data: IRecipe[] | IGroceryList[];
  clearFilterChild?: React.ReactNode;
  loadMoreChild?: React.ReactNode;
}

interface ICardProps {
  card: IRecipe | IGroceryList;
}

export default function CardList({
  data,
  clearFilterChild,
  loadMoreChild,
}: ICardListProps) {
  return (
    <div className="flex flex-col gap-4 p-4 pt-20">
      {clearFilterChild}
      <ul className="grid min-h-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data && data.map((card) => <Card card={card} key={card.id} />)}
      </ul>
      {loadMoreChild}
    </div>
  );
}

export function Card({ card }: ICardProps) {
  const selectCard = useCardStore((state) => state.selectCard);

  return (
    <li
      key={card.id}
      className={`flex h-fit cursor-pointer flex-col justify-between gap-2 border-2 border-black p-2 ${card.color}`}
      tabIndex={0}
      onClick={() => selectCard(card)}
    >
      <p className="overflow-hidden text-ellipsis">{card.title}</p>
      {card.type === "recipe" && (
        <ul className="flex flex-wrap gap-2">
          <TagList card={card} />
        </ul>
      )}
      {card.type === "grocery" && (
        <ul className="text-sm">
          {card.ingredients.slice(0, 5).map((ingredient, index) => (
            <p key={index}>{ingredient.name}</p>
          ))}
          {card.ingredients.length > 5 && "..."}
        </ul>
      )}
    </li>
  );
}
