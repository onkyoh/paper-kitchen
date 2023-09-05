import Spinner from "@/components/Elements/Spinner";
import Button from "@/components/Elements/Button";
import FormError from "@/components/Form/FormError";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useJoinInfo } from "../api/getJoin";
import { useJoin } from "../api/join";

import useAuthStore from "@/features/auth/stores/useAuthStore";

import Header from "@/components/Elements/Header";
import Title from "@/features/recipes/components/Elements/Title";
import IngredientList from "@/features/recipes/components/Ingredients/IngredientList";
import InstructionsList from "@/features/recipes/components/Instructions/InstructionsList";
import TagsContainer from "@/features/recipes/components/Tags/TagsContainer";
import PageList from "@/components/Layout/PageList";
import RainbowBackground from "@/components/Layout/RainbowBackground";
import { AxiosError } from "axios";

const index = () => {
  const { user } = useAuthStore();

  const { url } = useParams();

  const joinInfo = useJoinInfo(url || "");

  const error = joinInfo.error as AxiosError;

  const join = useJoin();

  if (joinInfo.isLoading || !url) return <Spinner />;

  if (!joinInfo.data?.data)
    return (
      <RainbowBackground>
        <div className="border-2 border-black bg-red-400 px-4 py-2">
          <FormError errorMessage={error} className="text-black" />
        </div>
      </RainbowBackground>
    );

  return (
    <>
      <div
        className={`fixed inset-0 z-10 h-full w-full ${joinInfo.data.data.color}`}
      >
        <header className="fixed top-0 z-10 w-full border-b-2 border-black">
          <div className="mx-auto flex h-16 w-full  max-w-2xl items-center  justify-between bg-inherit p-4">
            <Link to="/" className="flex-1 text-lg font-bold">
              PaperKitchen
            </Link>
            {user ? (
              <Button onClick={() => join.mutateAsync(url)} aria-label="join">
                Join
              </Button>
            ) : (
              <Link
                to="/auth/login"
                className="selected relative text-center"
                onClick={() => window.sessionStorage.setItem("join-link", url)}
              >
                Login to join
              </Link>
            )}
          </div>
        </header>
        <PageList>
          <Title editMode={false} title={joinInfo.data.data.title || ""} />
          {joinInfo.data.data.type === "recipe" && (
            <TagsContainer card={joinInfo.data.data} editMode={false} />
          )}
          <Header>Ingredients</Header>
          <IngredientList
            ingredients={joinInfo.data.data.ingredients || []}
            editMode={false}
          />
          {joinInfo.data.data.type === "recipe" && (
            <>
              <Header>Instructions</Header>
              <InstructionsList
                instructions={joinInfo.data.data.instructions}
                editMode={false}
              />
            </>
          )}
        </PageList>
      </div>
    </>
  );
};

export default index;
