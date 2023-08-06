import Spinner from "@/components/Elements/Spinner";
import Button from "@/components/Elements/Button";
import Notification from "@/components/Elements/Notification";
import RainbowBackground from "@/components/Layout/RainbowBackground";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useJoinInfo } from "../api/getJoin";
import { useJoin } from "../api/join";

import useAuthStore from "@/features/auth/stores/useAuthStore";

const index = () => {
  const { user } = useAuthStore();

  const { url } = useParams();

  const joinInfo = useJoinInfo(url || "");

  const join = useJoin();

  if (joinInfo.isLoading) return <Spinner />;

  const listType =
    joinInfo.data && "recipeId" in joinInfo.data ? "Recipe" : "Grocery List";

  return (
    <>
      <Notification />

      <RainbowBackground>
        <div className="relative flex w-72 flex-col gap-2 bg-white p-4 outline outline-2 outline-black">
          {joinInfo.isSuccess && url ? (
            <>
              {!user && (
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 backdrop-blur-md">
                  <h2 className="text-lg font-bold">
                    Must be logged in to view
                  </h2>
                  <Link
                    to="/auth/login"
                    className="relative border-2 border-black bg-cyan-400 px-4 py-2 text-center text-lg"
                    onClick={() =>
                      window.sessionStorage.setItem("join-link", url)
                    }
                  >
                    Go to login
                  </Link>
                </div>
              )}
              <h2 className="text-center text-lg font-bold">
                A {listType} has been shared with you.
              </h2>
              <p>Owner: {joinInfo.data.owner}</p>
              <p>Title: {joinInfo.data.title}</p>
              <p>
                Expires: {new Date(joinInfo.data.exp * 1000).toLocaleString()}
              </p>
              <Button
                onClick={() => join.mutateAsync(url || "")}
                className="w-full border-2 border-black bg-green-400"
              >
                Join
              </Button>
            </>
          ) : (
            <p className="text-center">An error occured</p>
          )}
        </div>
      </RainbowBackground>
    </>
  );
};

export default index;
