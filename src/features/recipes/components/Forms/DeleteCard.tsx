import { useState } from "react";
import Input from "@/components/Form/Input";
import Header from "../../../../components/Elements/Header";
import Button from "@/components/Elements/Button";
import Form from "@/components/Form/Form";

interface IDeleteCardProps {
  cardType: "recipe" | "grocery list";
  submitFn: () => Promise<string>;
  cardTitle: string;
}

const DeleteCard = ({ cardType, submitFn, cardTitle }: IDeleteCardProps) => {
  const [confirmInput, setConfirmInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmInput(e.target.value);
  };

  return (
    <Form
      className="text-center"
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitFn();
      }}
    >
      <Header>Delete {cardType}</Header>

      <p>
        Are you sure you want to delete this {cardType}? This action is
        permanent. Confirm via typing this {cardType}'s title:
      </p>

      <strong>{cardTitle}</strong>

      <Input
        value={confirmInput}
        placeholder={cardTitle}
        onChange={handleChange}
        aria-label="delete input"
      />

      <Button
        className="w-full border-2 border-black bg-red-400"
        disabled={confirmInput !== cardTitle}
        aria-label="submit delete"
      >
        Delete
      </Button>
    </Form>
  );
};

export default DeleteCard;
