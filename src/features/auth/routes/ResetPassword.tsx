import FormError from "@/components/Form/FormError";
import RainbowBackground from "@/components/Layout/RainbowBackground";
import { Link, useParams } from "react-router-dom";
import { useResetPassword } from "../api/resetPassword";
import { useState } from "react";
import InputContainer from "@/components/Form/InputContainer";
import Input from "@/components/Form/Input";
import Header from "@/components/Elements/Header";
import Form from "@/components/Form/Form";
import Button from "@/components/Elements/Button";

const ResetPassword = () => {
  const { url } = useParams();

  const resetPassword = useResetPassword();

  const [passwords, setPasswords] = useState({
    password: "",
    confirmedPassword: "",
  });

  const handleChangePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  if (resetPassword.isError || !url)
    return (
      <RainbowBackground>
        <div className="border-2 border-black bg-red-400 px-4 py-2">
          <FormError
            errorMessage={resetPassword.error}
            className="text-black"
          />
        </div>
      </RainbowBackground>
    );

  if (resetPassword.isSuccess)
    return (
      <RainbowBackground>
        <div className="flex w-72 flex-col gap-2 border-2  border-black bg-white p-4">
          Your email has been successfully changed. Follow the link to go to
          your paper kitchen.
          <Link to="/grocery-lists" className="text-center underline">
            Contine
          </Link>
        </div>
      </RainbowBackground>
    );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword.mutateAsync({
          url,
          password: passwords.confirmedPassword,
        });
      }}
    >
      <FormError errorMessage={resetPassword.error} className="text-red-400" />
      <Header>Reset Password</Header>
      <p>Create a new password for your account.</p>
      <InputContainer label="Password">
        <Input
          name="password"
          type="password"
          value={passwords.password}
          onChange={handleChangePasswords}
        />
      </InputContainer>
      <InputContainer label="Confirm Password">
        <Input
          name="confirmedPassword"
          type="password"
          value={passwords.confirmedPassword}
          onChange={handleChangePasswords}
          className={
            passwords.confirmedPassword &&
            passwords.confirmedPassword !== passwords.password
              ? "border-2 border-solid border-red-400 bg-red-100"
              : ""
          }
        />
      </InputContainer>
      <Button
        type="submit"
        className="w-full border-2 border-black bg-blue-400"
        disabled={
          resetPassword.isPending ||
          !passwords.password ||
          !passwords.confirmedPassword
        }
      >
        Submit
      </Button>
    </Form>
  );
};

export default ResetPassword;
