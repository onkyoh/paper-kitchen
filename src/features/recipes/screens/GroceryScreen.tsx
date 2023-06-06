import Page from "../../../components/Layout/Page";
import { groceriesData } from "../../../utils/mockData";
import { useQuery } from "@tanstack/react-query";
import CardList from "../components/CardList";
import IngredientList from "../components/Ingredients/IngredientList";
import Spinner from "../../../components/Elements/Spinner";
import useCardStore from "../stores/useCardStore";
import { useState } from "react";
import Title from "../components/Title";
import ColorList from "../components/ColorList";

const GroceryScreen = () => {
  const card = useCardStore((state) => state.card);
  const updateCard = useCardStore((state) => state.updateCard);
  const [editMode, setEditMode] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["groceriesData"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return groceriesData;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <CardList data={data || []} />

      {card?.type === "grocery" && card && (
        <Page setEditMode={setEditMode} editMode={editMode}>
          <Title editMode={editMode} title={card.title} />
          {editMode && (
            <ColorList color={card.color} handleSelectColor={updateCard} />
          )}
          <IngredientList ingredients={card.ingredients} editMode={editMode} />
        </Page>
      )}
    </>
  );
};

export default GroceryScreen;
