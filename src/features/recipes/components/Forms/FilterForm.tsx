import Button from "@/components/Elements/Button";
import Input from "@/components/Form/Input";
import Checkbox from "@/components/Form/Checkbox";
import Form from "@/components/Form/Form";
import HorizontalRule from "@/components/Elements/HorizontalRule";

import { FilterParams } from "../../api/recipes/getRecipes";

import useFilterForm from "../../hooks/useFilterForm";

interface IFilterFormProps {
  submitFn: (newFilter: FilterParams) => void;
  currentFilter: FilterParams | null;
}

interface IFilterRangeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
}

const FilterForm = ({ submitFn, currentFilter }: IFilterFormProps) => {
  const {
    newFilter,
    handleFilterChange,
    newIngredient,
    handleChangeIngredient,
    addIngredient,
  } = useFilterForm(currentFilter);

  return (
    <Form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitFn(newFilter);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div className="flex justify-between">
        <label htmlFor="isOwner">Owned: </label>
        <Checkbox
          isChecked={newFilter.isOwner}
          handleChange={handleFilterChange}
          name="isOwner"
          id="isOwner"
        />
      </div>

      <HorizontalRule />

      <div className="flex justify-between">
        <label htmlFor="favourite">Favourited: </label>
        <Checkbox
          isChecked={newFilter.favourite}
          handleChange={handleFilterChange}
          name="favourite"
          id="favourite"
        />
      </div>

      <HorizontalRule />

      <FilterInputContainer
        id="maxCost"
        name="maxCost"
        label="Max. Cost ($):"
        max="300"
        min="0"
        value={newFilter.maxCost || ""}
        onChange={handleFilterChange}
      />

      <HorizontalRule />

      <FilterInputContainer
        id="maxCookingTime"
        name="maxCookingTime"
        label="Max. Cooking Time (mins):"
        max="600"
        min="0"
        value={newFilter.maxCookingTime || ""}
        onChange={handleFilterChange}
      />

      <HorizontalRule />

      <FilterInputContainer
        id="serves"
        name="serves"
        label="Min. Servings:"
        max="30"
        min="0"
        value={newFilter.serves || ""}
        onChange={handleFilterChange}
      />

      <HorizontalRule />

      <div className="flex flex-col">
        <label htmlFor="ingredients">Includes Ingredient:</label>
        <div className="flex gap-2">
          <Input
            className="flex-grow"
            id="ingredients"
            value={newIngredient}
            onChange={handleChangeIngredient}
            placeholder="apple "
            aria-label="ingredient filter input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addIngredient();
              }
            }}
          />
          <Button
            type="button"
            onClick={addIngredient}
            disabled={!newIngredient}
            aria-label="add ingredient filter"
          >
            +
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          Ingredients:&nbsp;
          {newFilter.ingredients?.map((ingredient: string) => (
            <span key={ingredient}>{ingredient}, </span>
          ))}
        </p>
      </div>

      <Button
        className="w-full border-2 border-black bg-blue-400"
        disabled={newFilter == currentFilter}
        aria-label="submit filtered search"
      >
        Search
      </Button>
    </Form>
  );
};

export default FilterForm;

const FilterInputContainer = ({
  label,
  value,
  id,
  ...rest
}: IFilterRangeInputProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex justify-between">
        <label htmlFor={id}>{label}</label>
        <span>{value}</span>
      </div>
      <div className="flex gap-1">
        <input
          type="range"
          value={value}
          id={id}
          {...rest}
          className="flex-grow accent-black"
        />
      </div>
    </div>
  );
};
