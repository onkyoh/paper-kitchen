import { Navigate, useRoutes } from "react-router-dom";

import Main from "../components/Layout/Main";
import Auth from "../features/auth/routes";
import Share from "../features/share/routes";
import GroceryLists from "@/features/recipes/routes/GroceryLists";
import Recipes from "@/features/recipes/routes/Recipes";
import { useAuth } from "@/features/auth/api/getUser";

import useAuthStore from "@/features/auth/stores/useAuthStore";
import { useState, useEffect } from "react";

const index = () => {
  const auth = useAuth();
  const { user, setUser } = useAuthStore();

  const lastVisited = window.localStorage.getItem("last_visited") as string;

  useEffect(() => {
    if (auth.isSuccess) {
      setUser(auth.data);
    }
  }, [auth.data, auth.isSuccess]);

  const commonRoutes = [{ path: "/join/:url", element: <Share /> }];

  const protectedRoutes = [
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Navigate to={lastVisited || "recipes"} replace />,
        },
        { path: "recipes", element: <Recipes /> },
        { path: "grocery-lists", element: <GroceryLists /> },
      ],
    },
    { path: "*", element: <Navigate to="." /> },
  ];

  const publicRoutes = [
    {
      path: "/auth/*",
      element: <Auth />,
    },
    { path: "*", element: <Navigate to="/auth/login" /> },
  ];

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  if (auth.isLoading) {
    return <LoadingIcon />;
  }

  return <>{element}</>;
};

export default index;

const LoadingIcon = () => {
  const [text, setText] = useState("");
  const fullText = "PaperKitchen";

  useEffect(() => {
    const interval = setInterval(() => {
      setText((currentText) => {
        if (currentText.length < fullText.length) {
          return fullText.slice(0, currentText.length + 1);
        } else {
          clearInterval(interval);
          return currentText;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <p className="text-3xl font-bold text-black">{text}</p>
    </div>
  );
};
