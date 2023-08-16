import React, { useCallback, useState } from "react";
import { IIngredient } from "../../../types";
import useCardStore from "../stores/useCardStore";
import useNotificationStore from "@/stores/useNotificationStore";

const useIngredients = () => {
  const { addNotification } = useNotificationStore();

  const defaultIngredient = {
    id: window.crypto.randomUUID(),
    name: "",
    unit: "",
    amount: "",
  };
  const [newIngredient, setNewIngredient] = useState({ ...defaultIngredient });

  const { card, updateCard } = useCardStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [card, newIngredient, updateCard]
  );

  const handleAdd = useCallback(() => {
    if (!card?.ingredients) return;
    const ingredientName = newIngredient.name.trim();
    if (
      card.ingredients.findIndex(
        (ingredient) => ingredient.name === ingredientName
      ) >= 0
    ) {
      addNotification({
        isError: true,
        message: "Ingredient already included",
      });
      return;
    }
    updateCard({
      ingredients: [
        ...card.ingredients,
        { ...newIngredient, name: ingredientName },
      ],
    });
    setNewIngredient({ ...defaultIngredient });
  }, [card, newIngredient, updateCard]);

  const handleDelete = useCallback(
    (id: string) => {
      if (!card?.ingredients) return;
      updateCard({
        ingredients: card.ingredients.filter(
          (ingredient) => ingredient.id !== id
        ),
      });
    },
    [card, updateCard]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleAdd();
      }
    },
    [handleAdd]
  );

  return {
    newIngredient,
    handleChange,
    handleAdd,
    handleDelete,
    handleKeyDown,
  };
};

export default useIngredients;
