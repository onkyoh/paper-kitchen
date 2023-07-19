import useStriking from "../../hooks/useStriking";
import { IInstruction, IRecipe } from "../../../../types";
import { ChangeEvent } from "react";
import ListButton from "../Elements/ListButton";
import useInstructions from "../../hooks/useInstructions";
import Input from "../../../../components/Form/Input";

interface IInstructionInputProps {
  instruction: IInstruction;
  onChange: (e: ChangeEvent<HTMLInputElement>, index?: number) => void;
  placeholder?: string;
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
            />
            <ListButton onClick={() => handleDelete(instruction.id)}>
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
        <li className="flex">
          <InstructionInput
            instruction={newInstruction}
            onChange={handleChange}
            placeholder="new instruction..."
          />
          <ListButton onClick={handleAdd}>+</ListButton>
        </li>
      )}
    </ol>
  );
}

const InstructionInput = ({
  instruction,
  onChange,
  placeholder,
}: IInstructionInputProps) => {
  return (
    <Input
      type="text"
      onChange={onChange}
      id={instruction.id}
      value={instruction.text || ""}
      placeholder={placeholder}
      className="flex-grow"
    />
  );
};
