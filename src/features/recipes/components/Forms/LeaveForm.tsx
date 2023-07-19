import Button from "@/components/Elements/Button";
import Header from "@/components/Elements/Header";
import Spinner from "@/components/Elements/Spinner";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { useState } from "react";

interface ILeaveFormProps {
  cardTitle: string;
  cardType: "recipe" | "grocery list";
  submitFn: () => Promise<string>;
  isLoading: boolean;
}
const LeaveForm = ({
  cardType,
  submitFn,
  isLoading,
  cardTitle,
}: ILeaveFormProps) => {
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  if (isLoading) return <Spinner />;

  return (
    <Form
      className="text-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await submitFn();
      }}
    >
      <Header>Leave Confirmation</Header>
      <p>
        Are you sure you would like to revoke your access for this {cardType}.
        You will not be able to undo this action. Confirm by entering the{" "}
        {cardType}'s title.
      </p>

      <strong>{cardTitle}</strong>
      <Input value={input} onChange={handleChange} placeholder={cardTitle} />
      <Button
        className="w-full border-2 border-black bg-red-400"
        disabled={input !== cardTitle}
      >
        Leave
      </Button>
    </Form>
  );
};

export default LeaveForm;
