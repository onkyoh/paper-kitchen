import Notification from "../Elements/Notification";
import Button from "../Elements/Button";

import { Outlet, Link, useLocation } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useNavStore from "@/stores/useModalStore";
import FilterButton from "@/features/recipes/components/FilterButton";

const Main = () => {
  const { toggleOpen } = useNavStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navList = [
    {
      label: "Recipes",
      path: "/recipes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" x2="18" y1="17" y2="17" />
        </svg>
      ),
    },
    {
      label: "Groceries",
      path: "/grocery-lists",
      icon: (
        <svg viewBox="0 0 512 512" fill="currentColor" className="h-8 w-8">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M192 416 A16 16 0 0 1 176 432 A16 16 0 0 1 160 416 A16 16 0 0 1 192 416 z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M416 416 A16 16 0 0 1 400 432 A16 16 0 0 1 384 416 A16 16 0 0 1 416 416 z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M48 80h64l48 272h256"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const url = sessionStorage.getItem("join-link");
    if (url) {
      navigate(`/join/${url}`);
    }
  }, []);

  return (
    <main className="fixed inset-0 h-full w-full">
      {/* DESKTOP NAV */}
      <nav className="fixed top-0 z-10 hidden h-16 w-full items-center justify-between border-b-2 border-dashed border-black bg-white p-4 md:flex">
        <Link to="/" className="hidden text-lg font-bold md:flex md:flex-1">
          PaperKitchen
        </Link>
        <div className="flex flex-1 items-center justify-center gap-4">
          {navList.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={`${
                location.pathname === item.path ? "selected" : ""
              } relative`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <ul className="flex flex-1 justify-end gap-2">
          <li>
            <Button
              onClick={() => toggleOpen("createNew")}
              aria-label="create new"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </li>
          <li
            className={location.pathname === "/grocery-lists" ? "hidden" : ""}
          >
            <FilterButton />
          </li>
          <li className="flex items-center justify-center">
            <Link to="../settings" aria-label="to settings">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 z-10 h-16 w-full bg-white p-4 outline-dashed outline-2 outline-black md:hidden">
        <ul className="flex h-full w-full items-center justify-between">
          {navList.map((item) => (
            <MobileNavItem
              isSelected={location.pathname.includes(item.path) ? true : false}
              key={item.path}
            >
              <Link
                to={item.path}
                aria-label={item.label}
                className={`flex flex-col items-center justify-center text-sm`}
              >
                {item.icon}
                {item.label}
              </Link>
            </MobileNavItem>
          ))}

          <MobileNavItem isSelected={location.pathname.includes("/settings")}>
            <Link
              to="/settings"
              aria-label="settings"
              className={`flex flex-col items-center justify-center text-sm`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                className="h-8 w-8"
              >
                <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
              Settings
            </Link>
          </MobileNavItem>
        </ul>
      </nav>

      <div className="relative h-full min-h-screen overflow-y-auto bg-gray-200 pb-16 md:pb-0 md:pt-16">
        <Outlet />
      </div>

      <Notification />
    </main>
  );
};

export default Main;

const MobileNavItem = ({
  isSelected,
  children,
  onClick,
}: {
  isSelected: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <li
      className={`${
        isSelected ? "font-bold opacity-100" : "opacity-70"
      } flex w-20 list-none flex-col items-center justify-center text-sm`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
