import Spinner from "@/components/Elements/Spinner";
import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";
import Page from "@/components/Layout/Page";

import CardList from "../components/Cards/CardList";
import ColorList from "../components/ColorList";
import IngredientList from "../components/Ingredients/IngredientList";
import Title from "../components/Elements/Title";

import CreateCard from "../components/Forms/CreateCard";
import DeleteCard from "../components/Forms/DeleteCard";
import Permissions from "../components/Forms/Permissions";
import LeaveForm from "../components/Forms/LeaveForm";

import useCardStore from "../stores/useCardStore";
import useAuthStore from "@/features/auth/stores/useAuthStore";

import { useGroceryLists } from "../api/groceryList/getGroceryLists";
import { useCreateGroceryList } from "../api/groceryList/createGroceryList";
import { useDeleteGroceryList } from "../api/groceryList/deleteGroceryList";
import { useUpdateGroceryList } from "../api/groceryList/updateGroceryList";
import { useShareGroceryList } from "../api/groceryList/shareGroceryList";
import { useLeaveGroceryList } from "../api/groceryList/leaveGroceryList";

const GroceryLists = () => {
  const { card, updateCard, back, isChanged, editMode, toggleEditMode } =
    useCardStore();
  const { user } = useAuthStore();

  const groceryLists = useGroceryLists();
  const createGroceryList = useCreateGroceryList();
  const deleteGroceryList = useDeleteGroceryList();
  const updateGroceryList = useUpdateGroceryList();
  const shareGroceryList = useShareGroceryList();
  const leaveGroceryList = useLeaveGroceryList();

  if (groceryLists.isLoading) return <Spinner />;

  return (
    <>
      <CardList data={groceryLists.data || []} />

      {card?.type === "grocery" && card && user && (
        <Page
          back={back}
          isChanged={isChanged}
          color={card.color}
          ownerId={card.ownerId}
          toggleEditMode={toggleEditMode}
          updateFn={() => updateGroceryList.mutateAsync(card)}
          shareFn={() =>
            shareGroceryList.mutateAsync({
              id: card.id,
              owner: user.name,
              title: card.title,
            })
          }
          shareLoading={shareGroceryList.isLoading}
        >
          <div className="flex justify-between">
            <Title editMode={editMode} title={card.title} />
            {!editMode && (
              <Button
                onClick={() =>
                  updateGroceryList.mutateAsync({ ...card, ingredients: [] })
                }
                aria-label="clear ingredients"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  viewBox="0 -960 960 960"
                  width="48"
                >
                  <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-129h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q83 0 152-47.5T728-393h62q-29 105-115 169t-195 64Z" />
                </svg>
              </Button>
            )}
          </div>

          {editMode && (
            <ColorList color={card.color} handleSelectColor={updateCard} />
          )}
          <IngredientList ingredients={card.ingredients} editMode={editMode} />
        </Page>
      )}

      <Modal modal="createNew" isLoading={createGroceryList.isLoading}>
        <CreateCard
          cardType="grocery list"
          submitFn={createGroceryList.mutateAsync}
        />
      </Modal>

      {/* modals activated within page header */}

      {card && (
        <>
          <Modal modal="delete" isLoading={deleteGroceryList.isLoading}>
            <DeleteCard
              cardTitle={card.title}
              cardType="grocery list"
              submitFn={() => deleteGroceryList.mutateAsync(card.id)}
            />
          </Modal>

          <Modal modal="permissions">
            <Permissions id={card.id} path={"grocery-lists"} />
          </Modal>

          <Modal modal="leave">
            <LeaveForm
              cardTitle={card.title}
              cardType="recipe"
              isLoading={leaveGroceryList.isLoading}
              submitFn={() => leaveGroceryList.mutateAsync(card.id)}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default GroceryLists;
