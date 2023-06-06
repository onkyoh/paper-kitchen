import { IGroceryList, IRecipe } from "../../../types";
import useCardStore from "../stores/useCardStore";
import TagList from "./Tags/TagList";

interface IListProps {
  data: IRecipe[] | IGroceryList[];
}

interface ICardProps {
  card: IRecipe | IGroceryList;
}

export default function CardList({ data }: IListProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data && data.map((card) => <Card card={card} key={card.id} />)}
    </ul>
  );
}

export function Card({ card }: ICardProps) {
  const selectCard = useCardStore((state) => state.selectCard);

  return (
    <li
      key={card.id}
      className={`flex h-fit min-h-full cursor-pointer flex-col justify-between gap-2 overflow-hidden text-ellipsis border-2 border-black p-2 ${card.color}`}
      tabIndex={0}
      onClick={() => selectCard(card)}
    >
      <p>{card.title}</p>
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
          ...
        </ul>
      )}
    </li>
  );
}
