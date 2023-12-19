import Button from "@/components/Elements/Button";
import HorizontalRule from "@/components/Elements/HorizontalRule";
import Input from "@/components/Form/Input";
import Detail from "../components/Detail";
import Logout from "@/features/auth/routes/Logout";

import { useAddEmail } from "../api/addEmail";
import useEmail from "../hooks/useEmail";

import useModalStore from "@/stores/useModalStore";

import { IUser } from "@/types";

const Info = ({ user }: { user: IUser }) => {
  const toggleOpen = useModalStore((state) => state.toggleOpen);
  const { email, handleChangeEmail, resetEmail } = useEmail();
  const addEmail = useAddEmail();

  return (
    <>
      <Detail field="name">{user.name}</Detail>

      <Detail field="username">{user.username}</Detail>

      {user.email.isAuthenticated && user.email.address ? (
        <>
          <Detail field="email">{user.email.address}</Detail>
        </>
      ) : (
        <>
          {!user.email.address ? (
            <div className="flex w-full flex-col items-start justify-center">
              <h3 className="bold text-lg capitalize">Add an Email:</h3>
              <div className="flex w-full gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                  className="flex-grow"
                />
                <Button
                  onClick={() => addEmail.mutateAsync(email)}
                  className="w-8 border-2 border-black bg-orange-400"
                  disabled={addEmail.isPending || !email}
                >
                  +
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <h3 className="bold text-lg capitalize">Add an Email:</h3>
              <p>
                Email sent to: <strong>{user.email.address}</strong>
              </p>
              <div className="flex w-full gap-2">
                <Button
                  onClick={() => addEmail.mutateAsync(user.email.address || "")}
                  className="max-w-xs flex-grow border-2 border-black bg-yellow-400"
                  disabled={addEmail.isPending}
                >
                  Resend
                </Button>
                <Button
                  onClick={() => resetEmail()}
                  className="max-w-xs flex-grow border-2 border-black bg-purple-400"
                >
                  Change
                </Button>
              </div>
            </div>
          )}
          <HorizontalRule />
        </>
      )}
      <Button
        onClick={() => toggleOpen("logout")}
        className="mt-auto w-full max-w-xs self-center border-2 border-dashed border-black bg-red-400"
      >
        Logout
      </Button>

      <Logout />
    </>
  );
};

export default Info;
