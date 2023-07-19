import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import RainbowBackground from "@/components/Layout/RainbowBackground";

const Auth = () => {
  return (
    <RainbowBackground>
      <div className="w-72 border-2 border-black bg-white p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </RainbowBackground>
  );
};

export default Auth;
