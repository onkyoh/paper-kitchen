import Input from "../../../../components/Form/Input";
import { IIngredient } from "../../../../types";
import { ChangeEvent } from "react";

interface IIngredientRowProps {
  ingredient: IIngredient;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export default function IngredientInputContainer({
  ingredient,
  handleChange,
  onKeyDown,
  children,
}: IIngredientRowProps) {
  return (
    <li className="flex">
      <Input
        name="amount"
        value={ingredient.amount || ""}
        id={ingredient.id}
        onChange={handleChange}
        className="w-2/12"
        placeholder="amt"
      />
      <Input
        name="unit"
        value={ingredient.unit || ""}
        id={ingredient.id}
        onChange={handleChange}
        className="w-2/12"
        placeholder="unit"
      />
      <Input
        name="name"
        value={ingredient.name || ""}
        id={ingredient.id}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className="flex-grow"
        placeholder="name"
      />
      {children}
    </li>
  );
}
