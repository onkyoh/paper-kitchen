import { useState } from "react";
import { FilterParams } from "../api/getRecipes";

const useFilter = () => {
  const [filter, setFilter] = useState<FilterParams>({});

  const updateFilter = (newFilter: FilterParams) => {
    setFilter(newFilter);
  };

  return {
    filter,
    updateFilter,
  };
};

export default useFilter;
