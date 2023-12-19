import Auth from "@/features/auth/routes";
import { Navigate } from "react-router-dom";

const publicRoutes = [
  {
    path: "/auth/*",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
];

export default publicRoutes;
