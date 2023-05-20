import useStriking from "../../hooks/useStriking";
import { IRecipe } from "../../types";

interface IProps {
  instructions: IRecipe["instructions"];
}

const InstructionsList = ({ instructions }: IProps) => {
  const { strikedArray, handleStrike } = useStriking();
  return (
    <ol className="list-inside list-decimal">
      {instructions.map((instruction) => (
        <li
          key={instruction}
          className={`indent-2 ${
            strikedArray.includes(instruction) && "line-through"
          }`}
          onClick={() => handleStrike(instruction)}
        >
          {instruction}
        </li>
      ))}
    </ol>
  );
};

export default InstructionsList;
