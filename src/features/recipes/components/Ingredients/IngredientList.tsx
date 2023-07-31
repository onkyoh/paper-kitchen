import useStriking from "../../hooks/useStriking";
import { IIngredient } from "../../../../types";
import ListButton from "../Elements/ListButton";
import useIngredients from "../../hooks/useIngredients";
import IngredientInputContainer from "./IngredientInputContainer";

interface IIngredientListProps {
  ingredients: IIngredient[];
  editMode: boolean;
}

interface IIngredientItemProps {
  ingredient: IIngredient;
  isStriked: boolean;
  handleStrike: (id: string) => void;
}

export default function IngredientList({
  ingredients,
  editMode,
}: IIngredientListProps) {
  const { strikedArray, handleStrike } = useStriking();

  const { newIngredient, handleChange, handleAdd, handleDelete } =
    useIngredients();

  return (
    <ul className="flex flex-col">
      {ingredients.map((ingredient) =>
        editMode ? (
          <IngredientInputContainer
            key={ingredient.id}
            ingredient={ingredient}
            handleChange={handleChange}
          >
            <ListButton
              onClick={() => handleDelete(ingredient.id)}
              aria-label="delete ingredient"
            >
              X
            </ListButton>
          </IngredientInputContainer>
        ) : (
          <IngredientItem
            ingredient={ingredient}
            key={ingredient.id}
            isStriked={strikedArray.includes(ingredient.id)}
            handleStrike={handleStrike}
          />
        )
      )}
      {editMode && (
        <IngredientInputContainer
          handleChange={handleChange}
          ingredient={newIngredient}
        >
          <ListButton onClick={handleAdd} aria-label="add ingredient">
            +
          </ListButton>
        </IngredientInputContainer>
      )}
    </ul>
  );
}

function IngredientItem({
  ingredient,
  isStriked,
  handleStrike,
}: IIngredientItemProps) {
  return (
    <li>
      <p
        onClick={() => handleStrike(ingredient.id)}
        className={`w-10/12  ${isStriked && "line-through"}`}
      >
        {ingredient.amount} {ingredient.unit}
        {(ingredient.amount || ingredient.unit) && ` - `}
        {ingredient.name}
      </p>
    </li>
  );
}
