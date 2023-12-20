import Button from "@/components/Elements/Button";
import Page from "@/components/Layout/Page";
import Modal from "@/components/Elements/Modal";
import Spinner from "@/components/Elements/Spinner";

import ColorList from "../components/ColorList";
import Title from "../components/Elements/Title";
import IngredientList from "../components/Ingredients/IngredientList";
import Permissions from "../components/Forms/Permissions";

import DeleteCard from "../components/Forms/DeleteCard";
import LeaveForm from "../components/Forms/LeaveForm";

import useCardStore from "../stores/useCardStore";

import useStriking from "../hooks/useStriking";

import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import { useDeleteGroceryList } from "../api/groceryList/deleteGroceryList";
import { useUpdateGroceryList } from "../api/groceryList/updateGroceryList";
import { useLeaveGroceryList } from "../api/groceryList/leaveGroceryList";
import { useGetGroceryListCard } from "../api/groceryList/getGroceryListCard";

const GroceryListCard = () => {
  const deleteGroceryList = useDeleteGroceryList();
  const updateGroceryList = useUpdateGroceryList();
  const leaveGroceryList = useLeaveGroceryList();

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
  const { data } = useGetGroceryListCard(id, shouldFetch);

  useEffect(() => {
    if (state) {
      selectCard(state.card);
    } else if (data) {
      selectCard(data);
    }
  }, [state, data]);

  if (!card || card.type !== "grocery")
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <Link to={"/grocery-lists"} className="text-center underline">
          Oops, there was an error fetching that grocery list. Click here to
          view your grocery lists.
        </Link>
      </div>
    );

  return (
    <>
      <Page
        back={() => {
          navigate("/grocery-lists");
          turnOffEditMode();
        }}
        isChanged={isChanged}
        color={card.color}
        ownerId={card.ownerId}
        cardId={card.id}
        toggleEditMode={toggleEditMode}
        updateFn={async () => await updateGroceryList.mutateAsync(card)}
        path="grocery-lists"
      >
        <div className="flex justify-between">
          <Title editMode={editMode} title={card.title} />
          {!editMode && (
            <Button
              onClick={async () =>
                await updateGroceryList.mutateAsync({
                  ...card,
                  ingredients: card.ingredients.filter(
                    (ingredient) => strikedArray.indexOf(ingredient.id) === -1
                  ),
                })
              }
              disabled={strikedArray.length < 1}
              aria-label="remove selected ingredients"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                <path d="M14 10H3v2h11v-2m0-4H3v2h11V6M3 16h7v-2H3v2m11.4 6l2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6 2.6-2.6-1.4-1.4-2.6 2.6-2.6-2.6-1.4 1.4 2.6 2.6-2.6 2.6 1.4 1.4z" />
              </svg>
            </Button>
          )}
        </div>

        {editMode && (
          <ColorList color={card.color} handleSelectColor={updateCard} />
        )}
        <IngredientList
          ingredients={card.ingredients}
          editMode={editMode}
          strikedArray={strikedArray}
          handleStrike={handleStrike}
        />
      </Page>
      ;
      <>
        <Modal modal="delete" isLoading={deleteGroceryList.isPending}>
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
            cardType="grocery list"
            isLoading={leaveGroceryList.isPending}
            submitFn={() => leaveGroceryList.mutateAsync(card.id)}
          />
        </Modal>
      </>
    </>
  );
};

export default GroceryListCard;
