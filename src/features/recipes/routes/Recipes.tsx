import Spinner from "@/components/Elements/Spinner";
import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";

import FilterButton from "../components/FilterButton";
import CardList from "../components/Cards/CardList";

import CreateCard from "../components/Forms/CreateCard";
import FilterForm from "../components/Forms/FilterForm";

import useFilterStore from "../stores/useFilterStore";
import useModalStore from "@/stores/useModalStore";

import { useRecipes } from "../api/recipes/getRecipes";
import { useCreateRecipe } from "../api/recipes/createRecipe";

const Recipes = () => {
  const { filter, updateFilter } = useFilterStore();
  const { toggleOpen } = useModalStore();

  const recipes = useRecipes(filter);
  const createRecipe = useCreateRecipe();

  if (recipes.isPending) return <Spinner />;

  return (
    <>
      <CardList
        data={recipes.data?.pages.flatMap((page) => page) || []}
        loadMoreChild={
          recipes.hasNextPage && (
            <Button
              className="mx-auto w-full"
              onClick={() => recipes.fetchNextPage()}
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Button>
          )
        }
      ></CardList>

      <div className="fixed bottom-20 right-4 flex flex-col gap-4 md:hidden">
        <FilterButton />
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

      <Modal modal={"createNew"} isLoading={createRecipe.isPending}>
        <CreateCard cardType="recipe" submitFn={createRecipe.mutateAsync} />
      </Modal>

      <Modal modal={"filter"} isLoading={recipes.isPending}>
        <FilterForm submitFn={updateFilter} currentFilter={filter} />
      </Modal>
    </>
  );
};

export default Recipes;
