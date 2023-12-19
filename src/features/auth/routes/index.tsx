import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "@/components/Elements/Spinner";
import RainbowBackground from "@/components/Layout/RainbowBackground";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));

const Auth = () => {
  return (
    <RainbowBackground>
      <div className="w-72 border-2 border-black bg-white p-4">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:url" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </div>
    </RainbowBackground>
  );
};

export default Auth;
