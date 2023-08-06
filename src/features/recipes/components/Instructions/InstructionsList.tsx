import ListButton from "../Elements/ListButton";
import Input from "@/components/Form/Input";
import HorizontalRule from "@/components/Elements/HorizontalRule";

import useStriking from "../../hooks/useStriking";
import useInstructions from "../../hooks/useInstructions";

import { IInstruction, IRecipe } from "../../../../types";
import { ChangeEvent } from "react";

interface IInstructionInputProps {
  instruction: IInstruction;
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  placeholder?: string;
  name: string;
}

interface IInstructionListProps {
  instructions: IRecipe["instructions"];
  editMode: boolean;
}

export default function InstructionsList({
  instructions,
  editMode,
}: IInstructionListProps) {
  const { strikedArray, handleStrike } = useStriking();

  const { newInstruction, handleChange, handleAdd, handleDelete } =
    useInstructions();

  return (
    <ol className="flex list-inside list-decimal flex-col">
      {instructions.map((instruction) =>
        editMode ? (
          <li key={instruction.id} className="flex">
            <InstructionInput
              instruction={instruction}
              onChange={handleChange}
              name="instruction"
            />
            <ListButton
              onClick={() => handleDelete(instruction.id)}
              aria-label="delete instruction"
            >
              X
            </ListButton>
          </li>
        ) : (
          <li
            key={instruction.id}
            className={` ${
              strikedArray.includes(instruction.id) && "line-through"
            }`}
            onClick={() => handleStrike(instruction.id)}
          >
            {instruction.text}
          </li>
        )
      )}
      {editMode && (
        <>
          <li className="flex">
            <InstructionInput
              instruction={newInstruction}
              onChange={handleChange}
              placeholder="new instruction..."
              name="new instruction"
            />
            <ListButton onClick={handleAdd} aria-label="add instruction">
              +
            </ListButton>
          </li>
          <HorizontalRule />
        </>
      )}
    </ol>
  );
}

const InstructionInput = ({
  instruction,
  onChange,
  placeholder,
  name,
}: IInstructionInputProps) => {
  return (
    <Input
      type="text"
      onChange={onChange}
      id={instruction.id}
      value={instruction.text || ""}
      placeholder={placeholder}
      name={name}
      className="flex-grow"
    />
  );
};
