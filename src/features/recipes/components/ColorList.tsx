import { IGroceryList, IRecipe } from "../../../types";
import { BACKGROUND_COLORS } from "../../../utils/constants";

interface IColorListProps {
  color: string;
  handleSelectColor: (
    updatedFields: Partial<IRecipe> | Partial<IGroceryList>
  ) => void;
}

const ColorList = ({ color, handleSelectColor }: IColorListProps) => {
  const updateColor = (color: string) => {
    handleSelectColor({ color });
  };

  return (
    <ul className="flex gap-2">
      {BACKGROUND_COLORS.map((bgColor) => (
        <li
          key={bgColor}
          aria-label={bgColor}
          className={`${bgColor} h-6 w-6 border-2 border-black ${
            color === bgColor ? "border-solid" : "border-dashed"
          } `}
          onClick={() => updateColor(bgColor)}
        ></li>
      ))}
    </ul>
  );
};

export default ColorList;
