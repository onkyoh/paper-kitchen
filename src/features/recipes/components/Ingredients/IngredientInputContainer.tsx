import Input from "../../../../components/Form/Input";
import { IIngredient } from "../../../../types";
import { ChangeEvent } from "react";

interface IIngredientInputProps {
  value: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  className: string;
  id: string;
  placeholder?: string;
}

interface IIngredientRowProps {
  ingredient: IIngredient;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export default function IngredientInputContainer({
  ingredient,
  handleChange,
  children,
}: IIngredientRowProps) {
  return (
    <li className="flex">
      <IngredientInput
        name="amount"
        value={ingredient.amount}
        id={ingredient.id}
        onChange={handleChange}
        className="w-2/12"
        placeholder="amount"
      />
      <IngredientInput
        name="unit"
        value={ingredient.unit}
        id={ingredient.id}
        onChange={handleChange}
        className="w-2/12"
        placeholder="unit"
      />
      <IngredientInput
        name="name"
        value={ingredient.name}
        id={ingredient.id}
        onChange={handleChange}
        className="flex-grow"
        placeholder="name"
      />
      {children}
    </li>
  );
}

const IngredientInput = ({
  value,
  onChange,
  name,
  id,
  className,
  placeholder,
}: IIngredientInputProps) => {
  return (
    <Input
      value={value || ""}
      id={id}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className={className}
    />
  );
};
