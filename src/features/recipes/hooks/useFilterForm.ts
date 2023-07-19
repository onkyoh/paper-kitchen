import React, { useState } from "react";
import { FilterParams } from "../api/getRecipes";

const useFilterForm = () => {
  const defaultFilter = {
    isOwner: false,
    favourite: false,
    maxCost: "",
    maxCookingTime: "",
    serves: "",
    ingredients: [],
  };
  const [newFilter, setNewFilter] = useState<FilterParams>(defaultFilter);

  const [newIngredient, setNewIngredient] = useState("");

  const handleChangeIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(e.target.value);
  };

  const addIngredient = () => {
    const formattedIngredient = newIngredient.trim();
    if (
      !formattedIngredient ||
      newFilter.ingredients?.includes(formattedIngredient)
    )
      return;
    setNewFilter({
      ...newFilter,
      ingredients: [...(newFilter.ingredients || []), formattedIngredient],
    });
    setNewIngredient("");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, value } = e.target;
    if (type === "checkbox") {
      setNewFilter({
        ...newFilter,
        [id]: !newFilter[id as keyof FilterParams],
      });

      return;
    }
    setNewFilter({ ...newFilter, [id]: value });
  };

  return {
    defaultFilter,
    newFilter,
    handleFilterChange,
    newIngredient,
    handleChangeIngredient,
    addIngredient,
  };
};

export default useFilterForm;
