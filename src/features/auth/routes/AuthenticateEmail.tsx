import FormError from "@/components/Form/FormError";
import RainbowBackground from "@/components/Layout/RainbowBackground";
import { Link, useParams } from "react-router-dom";
import { useAuthenticateEmail } from "../api/authenticateEmail";
import { useEffect } from "react";

const AuthenticateEmail = () => {
  const { url } = useParams();

  const authenticateEmail = useAuthenticateEmail();

  useEffect(() => {
    if (url) {
      authenticateEmail.mutateAsync(url);
    }
  }, [url]);

  if (authenticateEmail.isError)
    return (
      <RainbowBackground>
        <div className="flex flex-col items-center justify-center gap-2 border-2 border-black bg-red-400 px-4 py-2">
          <FormError
            errorMessage={authenticateEmail.error}
            className="text-black"
          />
          <Link to="/grocery-lists" className="text-center underline">
            Contine
          </Link>
        </div>
      </RainbowBackground>
    );

  return (
    <RainbowBackground>
      <div className="flex w-72 flex-col gap-2 border-2  border-black bg-white p-4">
        Your email has been successfully authenticated. Follow the link to go to
        your paper kitchen.
        <Link to="/grocery-lists" className="text-center underline">
          Contine
        </Link>
      </div>
    </RainbowBackground>
  );
};

export default AuthenticateEmail;
