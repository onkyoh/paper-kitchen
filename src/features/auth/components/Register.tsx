import FormError from "@/components/Form/FormError";
import Button from "@/components/Elements/Button";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import InputContainer from "@/components/Form/InputContainer";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useRegister } from "../api/register";

interface IRegisterValues {
  name: string;
  username: string;
  password: string;
}

type Field = "name" | "username" | "password";

const Register = () => {
  const register = useRegister();

  const registerInputs: Field[] = ["name", "username", "password"];

  const [registerForm, setRegisterForm] = useState<IRegisterValues>({
    name: "",
    username: "",
    password: "",
  });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        register.mutateAsync(registerForm);
      }}
    >
      <h2 className="text-center text-lg font-bold">Create an Account</h2>
      <FormError errorMessage={register.error} className="text-red-400" />
      {registerInputs.map((field) => (
        <InputContainer label={field} key={field}>
          <Input
            name={field}
            id={field}
            value={registerForm[field]}
            onChange={handleChangeForm}
            type={field === "password" ? "password" : "text"}
          />
        </InputContainer>
      ))}

      <Button
        type="submit"
        className="w-full border-2 border-black bg-yellow-400"
      >
        Submit
      </Button>

      <Link to="../login" className="text-center underline">
        Already have an account?
      </Link>
    </Form>
  );
};

export default Register;
