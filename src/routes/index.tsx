import { Navigate, useRoutes } from "react-router-dom";

import Main from "../components/Layout/Main";
import Auth from "../features/auth/routes";
import Share from "../features/share/routes";
import GroceryLists from "@/features/recipes/routes/GroceryLists";
import Recipes from "@/features/recipes/routes/Recipes";
import { useAuth } from "@/features/auth/api/getUser";
import Spinner from "@/components/Elements/Spinner";
import useAuthStore from "@/features/auth/stores/useAuthStore";
import { useEffect } from "react";

const index = () => {
  const auth = useAuth();

  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (auth.isSuccess) {
      setUser(auth.data.data);
    }
  }, [auth.data, auth.isSuccess]);

  const commonRoutes = [{ path: "/join/:url", element: <Share /> }];

  const protectedRoutes = [
    {
      path: "/",
      element: <Main />,
      children: [
        { path: "/", element: <Navigate to="recipes" replace /> },
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
    return <Spinner />;
  }

  return <>{element}</>;
};

export default index;
