import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";

import Share from "../features/share/routes";
import AuthenticateEmail from "@/features/auth/routes/AuthenticateEmail";
import publicRoutes from "./public";
import protectedRoutes from "./protected";

import { useAuth } from "@/features/auth/api/getUser";
import useAuthStore from "@/features/auth/stores/useAuthStore";

import {
  getPreferences,
  toggleDarkMode,
} from "@/features/settings/utils/preferences";

const Index = () => {
  const auth = useAuth();
  const location = useLocation();
  const { user } = useAuthStore();

  const [path, setPath] = useState("");
  const [defaultScreen, setDefaultScreen] = useState("");

  //if path is / = normal app open we go to preferences
  useEffect(() => {
    console.log(user, auth.data, location.pathname);
    if (!defaultScreen) {
      const preferences = getPreferences();
      setDefaultScreen(preferences.defaultScreen);
      if (preferences.theme === "dark") {
        toggleDarkMode("dark");
      }
    }
    if (!path) {
      setPath(location.pathname);
    }
  }, []);

  const commonRoutes = [
    { path: "/join/:url", element: <Share /> },
    { path: "/auth/authenticate-email/:url", element: <AuthenticateEmail /> },
  ];

  const routes = user
    ? [
        {
          path: "*",
          element: (
            <Navigate
              to={
                path !== "/" && !path.includes("auth")
                  ? path
                  : defaultScreen || "/grocery-lists"
              }
              replace
            />
          ),
        },
        ...protectedRoutes,
      ]
    : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  if (auth.isPending) {
    return <LoadingIcon />;
  }

  return <>{element}</>;
};

export default Index;

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
