import { useState } from "react";
import { recipeData } from "../../../utils/mockData";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Elements/Spinner";
import useCardStore from "../stores/useCardStore";

import Page from "../../../components/Layout/Page";
import CardList from "../components/CardList";
import ColorList from "../components/ColorList";
import Header from "../components/Elements/Header";
import IngredientList from "../components/Ingredients/IngredientList";
import InstructionsList from "../components/Instructions/InstructionsList";
import TagsContainer from "../components/Tags/TagsContainer";
import Title from "../components/Title";

const RecipeScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const card = useCardStore((state) => state.card);
  const updateCard = useCardStore((state) => state.updateCard);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["groceriesData"],
  //   queryFn: async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     return recipeData;
  //   },
  // });

  // if (isLoading) return <Spinner />;

  const data = recipeData;

  return (
    <>
      <CardList data={data || []} />

      {card?.type === "recipe" && card && (
        <Page setEditMode={setEditMode} editMode={editMode}>
          <Title editMode={editMode} title={card.title} />
          <TagsContainer card={card} editMode={editMode} />
          {editMode && (
            <ColorList color={card.color} handleSelectColor={updateCard} />
          )}
          <Header>Ingredients</Header>
          <IngredientList ingredients={card.ingredients} editMode={editMode} />
          <Header>Ingredients</Header>
          <InstructionsList
            instructions={card.instructions}
            editMode={editMode}
          />
        </Page>
      )}
    </>
  );
};

export default RecipeScreen;
