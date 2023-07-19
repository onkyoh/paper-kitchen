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
                onClick={() => {
                  updateCard({ ingredients: [] });
                  updateGroceryList.mutateAsync(card);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
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

      {card && (
        <>
          <Modal modal={"delete"} isLoading={deleteGroceryList.isLoading}>
            <DeleteCard
              cardTitle={card.title}
              cardType="grocery list"
              submitFn={() => deleteGroceryList.mutateAsync(card.id)}
            />
          </Modal>

          <Modal modal={"permissions"}>
            <Permissions id={card.id} path={"grocery-lists"} />
          </Modal>

          <Modal modal={"leave"}>
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
