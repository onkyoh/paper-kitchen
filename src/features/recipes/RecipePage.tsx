import Page from "../../components/Layout/Page";
import { IRecipe } from "../../types";
import IngredientList from "../groceries/IngredientList";
import InstructionsList from "./InstructionsList";

interface IProps {
  back: () => void;
  currentCard: IRecipe;
}

const RecipePage = ({ back, currentCard }: IProps) => {
  return (
    <Page back={back} currentCard={currentCard}>
      <h3 className="text-lg font-bold">Ingredients</h3>
      <IngredientList ingredients={currentCard.ingredients} />
      <h3 className="text-lg font-bold">Instructions</h3>
      <InstructionsList instructions={currentCard.instructions} />
    </Page>
  );
};

export default RecipePage;
