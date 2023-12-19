import Spinner from "@/components/Elements/Spinner";

import useAuthStore from "@/features/auth/stores/useAuthStore";

import { Link, Outlet, useLocation } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user) return <Spinner />;

  const settingsList = ["information", "preferences"];

  return (
    <div className="h-fitw-full mx-auto flex min-h-full max-w-2xl flex-col items-start justify-start gap-2 border-x-2 bg-white p-4 md:border-black">
      <nav className="flex h-12 w-full items-center justify-center">
        <ul className="flex h-full w-full items-center justify-center gap-2">
          {settingsList.map((item) => (
            <li
              key={item}
              className={`flex h-full flex-grow items-center justify-center text-center capitalize
                ${
                  location.pathname.includes(item)
                    ? "outline outline-2 outline-black"
                    : "border-2 border-dashed border-black"
                }`}
            >
              <Link
                to={item}
                className="flex h-full w-full items-center justify-center p-2 "
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Settings;
