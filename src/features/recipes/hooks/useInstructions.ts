import React, { useState } from "react";
import useCardStore from "../stores/useCardStore";
import { IRecipe } from "../../../types";

const defaultInstruction = {
  id: window.crypto.randomUUID(),
  text: "",
};

const useInstructions = () => {
  const [newInstruction, setNewInstruction] = useState({
    ...defaultInstruction,
  });

  const card = useCardStore((state) => state.card) as IRecipe;
  const updateCard = useCardStore((state) => state.updateCard);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
  }

  function handleAdd() {
    if (!card?.instructions) return;
    updateCard({
      instructions: [...card.instructions, newInstruction],
    });
    setNewInstruction({ ...defaultInstruction });
  }

  function handleDelete(id: string) {
    if (!card?.instructions) return;
    updateCard({
      instructions: card.instructions.filter(
        (instruction) => instruction.id !== id
      ),
    });
  }

  return {
    newInstruction,
    handleChange,
    handleAdd,
    handleDelete,
  };
};

export default useInstructions;
