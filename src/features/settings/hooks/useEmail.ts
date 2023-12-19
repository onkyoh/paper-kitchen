import React from "react";
import { useState } from "react";
import { IUser } from "@/types";
import useAuthStore from "@/features/auth/stores/useAuthStore";

const useEmail = () => {
  const { user, setUser } = useAuthStore();
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const resetEmail = () => {
    if (!user) return;
    const newUser: IUser = { ...user };
    newUser.email.address = "";
    setUser(newUser);
  };
  return {
    email,
    handleChangeEmail,
    resetEmail,
  };
};

export default useEmail;
