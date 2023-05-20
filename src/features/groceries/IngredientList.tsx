import useStriking from "../../hooks/useStriking";
import { IIngredient } from "../../types";

interface IProps {
  ingredients: IIngredient[];
}

const IngredientList = ({ ingredients }: IProps) => {
  const { strikedArray, handleStrike } = useStriking();

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li
          key={ingredient.name}
          className={`indent-2 ${
            strikedArray.includes(ingredient.name) && "line-through"
          }`}
          onClick={() => handleStrike(ingredient.name)}
        >
          {ingredient.amount} {ingredient.unit} - {ingredient.name}
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
