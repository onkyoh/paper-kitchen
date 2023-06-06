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
    setNewCard({ ...newCard, title: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return {
    newCard,
    handleSelectColor,
    handleChange,
    handleSubmit,
  };
};

export default useNewCard;
