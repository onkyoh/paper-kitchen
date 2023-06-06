import React, { useState } from "react";
import { IIngredient } from "../../../types";
import useCardStore from "../stores/useCardStore";

const defaultIngredient = {
  id: window.crypto.randomUUID(),
  name: "",
  unit: "",
  amount: "",
};

const useIngredients = () => {
  const [newIngredient, setNewIngredient] = useState({ ...defaultIngredient });

  const card = useCardStore((state) => state.card);
  const updateCard = useCardStore((state) => state.updateCard);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    if (!card?.ingredients) return;
    const ingredients = [...card.ingredients];
    const isOld = ingredients.find((item) => item.id === target.id);
    if (target.name === "amount") {
      const isValid = /^[0-9/.]*$/.test(target.value);
      if (!isValid) return;
    }

    if (isOld) {
      isOld[target.name as keyof IIngredient] = target.value;
      updateCard({ ingredients });
    } else {
      setNewIngredient({ ...newIngredient, [target.name]: target.value });
    }
  }

  function handleAdd() {
    if (!card?.ingredients) return;
    updateCard({
      ingredients: [...card.ingredients, newIngredient],
    });
    setNewIngredient({ ...defaultIngredient });
  }

  function handleDelete(id: string) {
    if (!card?.ingredients) return;
    updateCard({
      ingredients: card.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    });
  }

  return {
    newIngredient,
    handleChange,
    handleAdd,
    handleDelete,
  };
};

export default useIngredients;
