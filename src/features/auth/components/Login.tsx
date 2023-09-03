import Input from "@/components/Form/Input";
import InputContainer from "@/components/Form/InputContainer";
import Form from "@/components/Form/Form";
import FormError from "@/components/Form/FormError";
import Button from "@/components/Elements/Button";

import { useState } from "react";
import { useLogin } from "../api/login";

import { Link } from "react-router-dom";

type Field = "username" | "password";

const Login = () => {
  const login = useLogin();

  const loginInputs: Field[] = ["username", "password"];

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        login.mutateAsync(loginForm);
      }}
    >
      <h2 className="text-center text-lg font-bold">Login</h2>
      <FormError errorMessage={login.error} className="text-red-400" />

      {loginInputs.map((field) => (
        <InputContainer label={field} key={field}>
          <Input
            name={field}
            id={field}
            value={loginForm[field]}
            onChange={handleChangeForm}
            type={field === "password" ? "password" : "text"}
          />
        </InputContainer>
      ))}

      <Button
        type="submit"
        className="w-full border-2 border-black bg-purple-400"
      >
        Submit
      </Button>

      <Link to="../register" className="text-center underline">
        Need an account?
      </Link>
    </Form>
  );
};

export default Login;
