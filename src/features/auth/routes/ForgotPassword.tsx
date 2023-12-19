import Form from "@/components/Form/Form";
import Button from "@/components/Elements/Button";
import { useForgotPassword } from "../api/forgotPassword";
import Input from "@/components/Form/Input";
import FormError from "@/components/Form/FormError";
import { useState } from "react";
import Header from "@/components/Elements/Header";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const forgotPassword = useForgotPassword();

  const [email, setEmail] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      {forgotPassword.isSuccess ? (
        <div>
          A reset link has been sent to the provided email. If you cannot find
          it check your junk/spam folders and make sure the email you entered
          was correct.
        </div>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            forgotPassword.mutateAsync(email);
          }}
        >
          <FormError
            errorMessage={forgotPassword.error}
            className="text-red-400"
          />
          <Header>Reset Password</Header>
          <p>
            Enter your account's email and we will send a link for you to reset
            your password with.
          </p>
          <Input type="email" value={email} onChange={handleChangeEmail} />
          <Button
            type="submit"
            className="w-full border-2 border-black bg-purple-400"
            disabled={forgotPassword.isPending || !email}
          >
            Send
          </Button>
          <Link to="../login" className="text-center underline">
            Go back to login
          </Link>
        </Form>
      )}
    </>
  );
};

export default ForgotPassword;
