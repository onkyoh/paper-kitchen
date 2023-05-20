import { useState, useContext } from "react";
import Card from "../Elements/Card";
import { UserContext } from "../../App";
import { IGroceryList, IRecipe } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { recipeData } from "../../utils/mockData";
import RecipePage from "../../features/recipes/RecipePage";
import GroceryPage from "../../features/groceries/GroceryPage";

interface IProps {
  screen: string;
  filter?: string;
}

const Screen = ({ screen }: IProps) => {
  const user = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["recipesData"],
    queryFn: () => {
      return recipeData;
    },
  });

  const [currentCard, setCurrentCard] = useState<IRecipe | IGroceryList | null>(
    null
  );

  function handleCard(currentData: IRecipe | IGroceryList) {
    setCurrentCard({
      ...currentData,
    });
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data &&
          data.map((card) => (
            <Card
              {...card}
              userId={user!.id}
              handleCard={() => handleCard({ ...card })}
              key={card.id}
            />
          ))}
      </ul>
      {currentCard && (
        <>
          {screen === "Recipes" ? (
            <RecipePage
              back={() => setCurrentCard(null)}
              currentCard={currentCard}
            />
          ) : (
            <GroceryPage
              back={() => setCurrentCard(null)}
              currentCard={currentCard}
            />
          )}
        </>
      )}
    </>
  );
};

export default Screen;
