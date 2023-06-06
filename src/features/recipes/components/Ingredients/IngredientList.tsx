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
}

export default function IngredientList({
  ingredients,
  editMode,
}: IIngredientListProps) {
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
            <ListButton onClick={() => handleDelete(ingredient.id)}>
              X
            </ListButton>
          </IngredientInputContainer>
        ) : (
          <IngredientItem ingredient={ingredient} key={ingredient.id} />
        )
      )}
      {editMode && (
        <IngredientInputContainer
          handleChange={handleChange}
          ingredient={newIngredient}
        >
          <ListButton onClick={handleAdd}>+</ListButton>
        </IngredientInputContainer>
      )}
    </ul>
  );
}

function IngredientItem({ ingredient }: IIngredientItemProps) {
  const { strikedArray, handleStrike } = useStriking();
  return (
    <li>
      <p
        onClick={() => handleStrike(ingredient.name)}
        className={`w-10/12  ${
          strikedArray.includes(ingredient.name) && "line-through"
        }`}
      >
        {ingredient.amount} {ingredient.unit}
        {(ingredient.amount || ingredient.unit) && ` - `}
        {ingredient.name}
      </p>
    </li>
  );
}
