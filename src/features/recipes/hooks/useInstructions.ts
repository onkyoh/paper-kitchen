import React, { useState, useCallback } from "react";
import useCardStore from "../stores/useCardStore";
import { IRecipe } from "@/types";

const useInstructions = () => {
  const defaultInstruction = {
    id: window.crypto.randomUUID(),
    text: "",
  };

  const [newInstruction, setNewInstruction] = useState({
    ...defaultInstruction,
  });

  const card = useCardStore((state) => state.card) as IRecipe;
  const updateCard = useCardStore((state) => state.updateCard);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      if (!card.instructions) return;
      let instructions = [...card.instructions];
      const isOld = instructions.find((item) => item.id === target.id);
      if (isOld) {
        isOld.text = target.value;
        updateCard({ instructions });
      } else {
        setNewInstruction({ ...newInstruction, text: target.value });
      }
    },
    [card, newInstruction, updateCard]
  );

  const handleAdd = useCallback(() => {
    if (!card?.instructions) return;
    updateCard({
      instructions: [...card.instructions, newInstruction],
    });
    setNewInstruction({ ...defaultInstruction });
  }, [card, newInstruction, updateCard]);

  const handleDelete = useCallback(
    (id: string) => {
      if (!card?.instructions) return;
      updateCard({
        instructions: card.instructions.filter(
          (instruction) => instruction.id !== id
        ),
      });
    },
    [card, updateCard]
  );

  return {
    newInstruction,
    handleChange,
    handleAdd,
    handleDelete,
  };
};

export default useInstructions;
