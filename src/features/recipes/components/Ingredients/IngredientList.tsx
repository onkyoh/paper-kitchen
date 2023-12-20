import { IIngredient } from "../../../../types";
import ListButton from "../Elements/ListButton";
import useIngredients from "../../hooks/useIngredients";
import IngredientInputContainer from "./IngredientInputContainer";
import HorizontalRule from "@/components/Elements/HorizontalRule";

interface IIngredientListProps {
  ingredients: IIngredient[];
  editMode: boolean;
  strikedArray?: string[];
  handleStrike?: (id: string) => void;
}

interface IIngredientItemProps {
  ingredient: IIngredient;
  isStriked: boolean;
  handleStrike: (id: string) => void;
}

export default function IngredientList({
  ingredients,
  editMode,
  strikedArray = [],
  handleStrike = () => {},
}: IIngredientListProps) {
  const {
    newIngredient,
    handleChange,
    handleAdd,
    handleDelete,
    handleKeyDown,
  } = useIngredients();

  return (
    <ul className="flex flex-col-reverse">
      {ingredients.map((ingredient) =>
        !editMode ? (
          <IngredientItem
            ingredient={ingredient}
            key={ingredient.id}
            isStriked={strikedArray.includes(ingredient.id)}
            handleStrike={handleStrike}
          />
        ) : (
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
        )
      )}
      {editMode && (
        <>
          <HorizontalRule />
          <IngredientInputContainer
            handleChange={handleChange}
            ingredient={newIngredient}
            onKeyDown={handleKeyDown}
          >
            <ListButton onClick={handleAdd} aria-label="add ingredient">
              +
            </ListButton>
          </IngredientInputContainer>
        </>
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
