import { IGroceryList, IRecipe } from "../../../../types";
import TagList from "../Tags/TagList";
import { Link } from "react-router-dom";

interface ICardListProps {
  data: IRecipe[] | IGroceryList[];
  loadMoreChild?: React.ReactNode;
}

interface ICardProps {
  card: IRecipe | IGroceryList;
}

export default function CardList({ data, loadMoreChild }: ICardListProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data && data.map((card) => <Card card={card} key={card.id} />)}
      </ul>
      {loadMoreChild}
    </div>
  );
}

export function Card({ card }: ICardProps) {
  return (
    <Link
      to={`${card.id}`}
      state={{ card }}
      key={card.id}
      className={`flex h-fit cursor-pointer flex-col justify-between gap-2 border-2 border-black p-2 ${card.color}`}
      tabIndex={0}
    >
      <p className="overflow-hidden text-ellipsis">{card.title}</p>
      {card.type === "recipe" && <TagList card={card} />}
      {card.type === "grocery" && (
        <ul className="text-sm">
          {card.ingredients.slice(0, 5).map((ingredient, index) => (
            <p key={index}>{ingredient.name}</p>
          ))}
          {card.ingredients.length > 5 && "..."}
        </ul>
      )}
    </Link>
  );
}
