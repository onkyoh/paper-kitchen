import Page from "../../components/Layout/Page";
import { IGroceryList } from "../../types";
import IngredientList from "./IngredientList";

interface IProps {
  back: () => void;
  currentCard: IGroceryList;
}

const GroceryPage = ({ back, currentCard }: IProps) => {
  return (
    <Page back={back} currentCard={currentCard}>
      <IngredientList ingredients={currentCard.ingredients} />
    </Page>
  );
};

export default GroceryPage;
