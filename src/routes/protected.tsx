import Spinner from "@/components/Elements/Spinner";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Main = lazy(() => import("@/components/Layout/Main"));
const GroceryListCard = lazy(
  () => import("@/features/recipes/routes/GroceryListCard")
);
const GroceryLists = lazy(
  () => import("@/features/recipes/routes/GroceryLists")
);
const RecipeCard = lazy(() => import("@/features/recipes/routes/RecipeCard"));
const Recipes = lazy(() => import("@/features/recipes/routes/Recipes"));
const Settings = lazy(() => import("@/features/settings/routes"));

const protectedRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Main />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Navigate to="/grocery-lists" replace /> },
      {
        path: "recipes",
        element: (
          <Suspense fallback={<Spinner />}>
            <Recipes />
          </Suspense>
        ),
      },
      {
        path: "grocery-lists",
        element: (
          <Suspense fallback={<Spinner />}>
            <GroceryLists />
          </Suspense>
        ),
      },
      {
        path: "recipes/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <RecipeCard />
          </Suspense>
        ),
      },
      {
        path: "grocery-lists/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <GroceryListCard />
          </Suspense>
        ),
      },
      {
        path: "settings/*",
        element: (
          <Suspense fallback={<Spinner />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
];

export default protectedRoutes;
