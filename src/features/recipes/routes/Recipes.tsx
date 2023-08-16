import Page from "@/components/Layout/Page";
import Spinner from "@/components/Elements/Spinner";
import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";

import CardList from "../components/Cards/CardList";
import ColorList from "../components/ColorList";
import Header from "../../../components/Elements/Header";
import IngredientList from "../components/Ingredients/IngredientList";
import InstructionsList from "../components/Instructions/InstructionsList";
import TagsContainer from "../components/Tags/TagsContainer";
import Title from "../components/Elements/Title";

import CreateCard from "../components/Forms/CreateCard";
import DeleteCard from "../components/Forms/DeleteCard";
import FilterForm from "../components/Forms/FilterForm";
import LeaveForm from "../components/Forms/LeaveForm";
import Permissions from "../components/Forms/Permissions";

import { useEffect } from "react";
import useFilter from "../hooks/useFilter";
import useCardStore from "../stores/useCardStore";
import useModalStore from "@/stores/useModalStore";
import useAuthStore from "@/features/auth/stores/useAuthStore";

import { useRecipes } from "../api/recipes/getRecipes";
import { useCreateRecipe } from "../api/recipes/createRecipe";
import { useDeleteRecipe } from "../api/recipes/deleteRecipe";
import { useUpdateRecipe } from "../api/recipes/updateRecipe";
import { useShareRecipe } from "../api/recipes/shareRecipe";
import { useLeaveRecipe } from "../api/recipes/leaveRecipe";

const Recipes = () => {
  const { card, updateCard, back, isChanged, editMode, toggleEditMode } =
    useCardStore();
  const { user } = useAuthStore();
  const { isOpen, toggleOpen } = useModalStore();
  const { filter, updateFilter } = useFilter();

  const recipes = useRecipes(filter);

  const createRecipe = useCreateRecipe();
  const deleteRecipe = useDeleteRecipe();
  const updateRecipe = useUpdateRecipe();
  const shareRecipe = useShareRecipe();
  const leaveRecipe = useLeaveRecipe();

  useEffect(() => {
    if (recipes.status === "success" && isOpen.filter) {
      toggleOpen("filter");
      return;
    }
    back();
  }, [recipes.status]);

  if (recipes.isLoading) return <Spinner />;

  return (
    <>
      <CardList
        data={recipes.data?.pages.flatMap((page) => page) || []}
        clearFilterChild={
          Object.keys(filter).length > 0 && (
            <Button className="mx-auto w-full" onClick={() => updateFilter({})}>
              Clear Filter
            </Button>
          )
        }
        loadMoreChild={
          recipes.hasNextPage && (
            <Button
              className="mx-auto w-full"
              onClick={() => recipes.fetchNextPage()}
            >
              ...
            </Button>
          )
        }
      ></CardList>

      {card?.type === "recipe" && card && user && (
        <Page
          back={back}
          color={card.color}
          isChanged={isChanged}
          toggleEditMode={toggleEditMode}
          ownerId={card.ownerId}
          updateFn={() => updateRecipe.mutateAsync(card)}
          shareFn={() =>
            shareRecipe.mutateAsync({
              id: card.id,
              owner: user.name,
              title: card.title,
            })
          }
          shareLoading={shareRecipe.isLoading}
        >
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

      <Modal modal={"createNew"} isLoading={createRecipe.isLoading}>
        <CreateCard cardType="recipe" submitFn={createRecipe.mutateAsync} />
      </Modal>

      <Modal modal={"filter"} isLoading={recipes.isLoading}>
        <FilterForm submitFn={updateFilter} currentFilter={filter} />
      </Modal>

      {/* modals activated within page header */}

      {card && (
        <>
          <Modal modal={"delete"} isLoading={deleteRecipe.isLoading}>
            <DeleteCard
              cardTitle={card.title}
              cardType="recipe"
              submitFn={() => deleteRecipe.mutateAsync(card.id)}
            />
          </Modal>

          <Modal modal={"permissions"}>
            <Permissions id={card.id} path={"recipes"} />
          </Modal>

          <Modal modal={"leave"}>
            <LeaveForm
              cardTitle={card.title}
              cardType="recipe"
              isLoading={leaveRecipe.isLoading}
              submitFn={() => leaveRecipe.mutateAsync(card.id)}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Recipes;
