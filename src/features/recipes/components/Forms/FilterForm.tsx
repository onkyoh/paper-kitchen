import Button from "@/components/Elements/Button";
import { FilterParams } from "../../api/recipes/getRecipes";
import Input from "@/components/Form/Input";
import Checkbox from "@/components/Form/Checkbox";
import useFilterForm from "../../hooks/useFilterForm";
import Form from "@/components/Form/Form";

interface IFilterFormProps {
  submitFn: (newFilter: FilterParams) => void;
}

interface IFilterRangeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
}

const FilterForm = ({ submitFn }: IFilterFormProps) => {
  const {
    defaultFilter,
    newFilter,
    handleFilterChange,
    newIngredient,
    handleChangeIngredient,
    addIngredient,
  } = useFilterForm();

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

      <hr className="w-full bg-gray-700" />

      <div className="flex justify-between">
        <label htmlFor="favourite">Favourited: </label>
        <Checkbox
          isChecked={newFilter.favourite}
          handleChange={handleFilterChange}
          name="favourite"
          id="favourite"
        />
      </div>

      <hr className="w-full bg-gray-700" />

      <FilterInputContainer
        id="maxCost"
        name="maxCost"
        label="Max. Cost ($):"
        max="300"
        min="0"
        value={newFilter.maxCost || ""}
        onChange={handleFilterChange}
      />

      <hr className="w-full bg-gray-700" />

      <FilterInputContainer
        id="maxCookingTime"
        name="maxCookingTime"
        label="Max. Cooking Time (mins):"
        max="600"
        min="0"
        value={newFilter.maxCookingTime || ""}
        onChange={handleFilterChange}
      />

      <hr className="w-full bg-gray-700" />

      <FilterInputContainer
        id="serves"
        name="serves"
        label="Serves:"
        max="30"
        min="0"
        value={newFilter.serves || ""}
        onChange={handleFilterChange}
      />

      <hr className="w-full bg-gray-700" />

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
        disabled={newFilter == defaultFilter}
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
