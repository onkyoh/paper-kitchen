import { useState } from "react";

const useNewCard = () => {
  const [newCard, setNewCard] = useState({
    title: "",
    color: "bg-white-400",
  });

  function handleSelectColor(updatedField: any) {
    setNewCard({ ...newCard, ...updatedField });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 30) return;
    setNewCard({ ...newCard, title: e.target.value });
  }

  return {
    newCard,
    handleSelectColor,
    handleChange,
  };
};

export default useNewCard;
