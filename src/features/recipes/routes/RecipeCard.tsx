import Page from "@/components/Layout/Page";
import Modal from "@/components/Elements/Modal";
import Spinner from "@/components/Elements/Spinner";

import ColorList from "../components/ColorList";
import Title from "../components/Elements/Title";
import IngredientList from "../components/Ingredients/IngredientList";

import TagsContainer from "../components/Tags/TagsContainer";
import Header from "@/components/Elements/Header";
import InstructionsList from "../components/Instructions/InstructionsList";

import DeleteCard from "../components/Forms/DeleteCard";
import LeaveForm from "../components/Forms/LeaveForm";
import Permissions from "../components/Forms/Permissions";

import useCardStore from "../stores/useCardStore";
import useStriking from "../hooks/useStriking";

import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import { useDeleteRecipe } from "../api/recipes/deleteRecipe";
import { useUpdateRecipe } from "../api/recipes/updateRecipe";
import { useLeaveRecipe } from "../api/recipes/leaveRecipe";
import { useGetRecipeCard } from "../api/recipes/getRecipeCard";

const RecipeCard = () => {
  const deleteRecipe = useDeleteRecipe();
  const updateRecipe = useUpdateRecipe();
  const leaveRecipe = useLeaveRecipe();

  const {
    card,
    selectCard,
    updateCard,
    isChanged,
    editMode,
    toggleEditMode,
    turnOffEditMode,
  } = useCardStore();
  const { strikedArray, handleStrike } = useStriking();

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!id) return <Spinner />;

  const shouldFetch = !state;
  const { data } = useGetRecipeCard(id, shouldFetch);

  useEffect(() => {
    if (state) {
      selectCard(state.card);
    } else if (data) {
      selectCard(data);
    }
  }, [state, data]);

  if (!card || card.type !== "recipe")
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <Link to={"/recipes"} className="text-center underline">
          Oops, there was an error fetching that recipe. Click here to view your
          recipes.
        </Link>
      </div>
    );

  return (
    <>
      <Page
        back={() => {
          navigate("/recipes");
          turnOffEditMode();
        }}
        color={card.color}
        isChanged={isChanged}
        toggleEditMode={toggleEditMode}
        ownerId={card.ownerId}
        cardId={card.id}
        updateFn={() => updateRecipe.mutateAsync(card)}
        path="recipes"
      >
        <Title editMode={editMode} title={card.title} />
        <TagsContainer card={card} editMode={editMode} />
        {editMode && (
          <ColorList color={card.color} handleSelectColor={updateCard} />
        )}
        <Header>Ingredients</Header>
        <IngredientList
          ingredients={card.ingredients}
          editMode={editMode}
          strikedArray={strikedArray}
          handleStrike={handleStrike}
        />
        <Header>Instructions</Header>
        <InstructionsList
          instructions={card.instructions}
          editMode={editMode}
        />
      </Page>

      <>
        <Modal modal="delete" isLoading={deleteRecipe.isPending}>
          <DeleteCard
            cardTitle={card.title}
            cardType="recipe"
            submitFn={() => deleteRecipe.mutateAsync(card.id)}
          />
        </Modal>

        <Modal modal="permissions">
          <Permissions id={card.id} path={"recipes"} />
        </Modal>

        <Modal modal="leave">
          <LeaveForm
            cardTitle={card.title}
            cardType="recipe"
            isLoading={leaveRecipe.isPending}
            submitFn={() => leaveRecipe.mutateAsync(card.id)}
          />
        </Modal>
      </>
    </>
  );
};

export default RecipeCard;
