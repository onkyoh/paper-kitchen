import Spinner from "@/components/Elements/Spinner";
import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";

import CardList from "../components/Cards/CardList";

import CreateCard from "../components/Forms/CreateCard";

import useModalStore from "@/stores/useModalStore";

import { useGroceryLists } from "../api/groceryList/getGroceryLists";
import { useCreateGroceryList } from "../api/groceryList/createGroceryList";

const GroceryLists = () => {
  const { toggleOpen } = useModalStore();

  const groceryLists = useGroceryLists();
  const createGroceryList = useCreateGroceryList();

  if (groceryLists.isPending) return <Spinner />;

  return (
    <>
      <CardList data={groceryLists.data || []} />

      <div className="fixed bottom-20 right-4 flex flex-col gap-4 md:hidden">
        <Button
          onClick={() => toggleOpen("createNew")}
          aria-label="create new"
          className="border-2 border-dashed border-black bg-white"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>

      <Modal modal="createNew" isLoading={createGroceryList.isPending}>
        <CreateCard
          cardType="grocery list"
          submitFn={createGroceryList.mutateAsync}
        />
      </Modal>
    </>
  );
};

export default GroceryLists;
