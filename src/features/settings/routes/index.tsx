import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "@/features/auth/stores/useAuthStore";
import Info from "./Info";
import Preferences from "./Preferences";
import Spinner from "@/components/Elements/Spinner";
import Settings from "./Settings";

const Index = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Spinner />;

  return (
    <Routes>
      <Route path="/" element={<Settings />}>
        <Route index element={<Navigate to="information" replace />} />
        <Route path="information" element={<Info user={user} />} />
        <Route path="preferences" element={<Preferences />} />
      </Route>
    </Routes>
  );
};

export default Index;
