import React, { useState } from "react";
import InputContainer from "../../../components/Form/InputContainer";
import ColorList from "./ColorList";
import Input from "../../../components/Form/Input";
import Header from "./Elements/Header";
import Button from "../../../components/Elements/Button";
import useNewCard from "../hooks/useNewCard";

interface INewCardFormProps {
  screen: string;
}

const NewCardForm = ({ screen }: INewCardFormProps) => {
  const { newCard, handleSelectColor, handleChange, handleSubmit } =
    useNewCard();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Header>New {screen === "Recipes" ? "Recipe" : "Grocery List"}</Header>
      <InputContainer label="Title" id="title">
        <Input onChange={handleChange} value={newCard.title} id="title" />
      </InputContainer>
      <InputContainer label="Color">
        <ColorList
          color={newCard.color}
          handleSelectColor={handleSelectColor}
        />
      </InputContainer>
      <Button>Create</Button>
    </form>
  );
};

export default NewCardForm;
