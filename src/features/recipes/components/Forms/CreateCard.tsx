import InputContainer from "@/components/Form/InputContainer";
import ColorList from "../ColorList";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Header from "@/components/Elements/Header";
import Button from "@/components/Elements/Button";
import useNewCard from "../../hooks/useNewCard";
import { ICreateCard, IGroceryList, IRecipe } from "@/types";

interface ICreateCardProps {
  cardType: "recipe" | "grocery list";
  submitFn: (data: ICreateCard) => Promise<IRecipe | IGroceryList>;
}

const CreateCard = ({ cardType, submitFn }: ICreateCardProps) => {
  const { newCard, handleSelectColor, handleChange } = useNewCard();

  return (
    <Form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitFn(newCard);
      }}
    >
      <Header>New {cardType}</Header>
      <InputContainer label="Title" id="title">
        <Input onChange={handleChange} value={newCard.title} id="title" />
      </InputContainer>
      <InputContainer label="Color">
        <ColorList
          color={newCard.color}
          handleSelectColor={handleSelectColor}
        />
      </InputContainer>
      <Button
        className={`w-full border-2 border-black ${newCard.color || "white"}`}
        disabled={!newCard.color || !newCard.title}
      >
        Create
      </Button>
    </Form>
  );
};

export default CreateCard;
