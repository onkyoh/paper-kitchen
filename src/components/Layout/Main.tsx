import Notification from "../Elements/Notification";
import Logout from "@/features/auth/components/Logout";
import OptionsItem from "../Options/OptionsItem";
import OptionsButton from "../Options/OptionsButton";
import OptionsList from "../Options/OptionsList";

import { Outlet, Link, useLocation } from "react-router-dom";

import { useState } from "react";
import useNavStore from "@/stores/useModalStore";

const Main = () => {
  const location = useLocation();
  const { toggleOpen } = useNavStore();
  const [optionsOpen, setOptionsOpen] = useState(false);

  const navList = [
    { label: "Recipes", path: "/recipes" },
    { label: "Groceries", path: "/grocery-lists" },
  ];

  return (
    <main>
      <nav className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-dashed border-black bg-white p-4">
        <span className="hidden font-bold md:flex md:flex-1">PaperKitchen</span>
        <span className="flex-1 font-bold md:hidden">PK</span>
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
        <div className="flex flex-1 justify-end">
          <OptionsButton
            isOpen={optionsOpen}
            toggleOpen={() => setOptionsOpen(!optionsOpen)}
          />
        </div>
        {optionsOpen && (
          <OptionsList closeOptions={() => setOptionsOpen(false)}>
            <OptionsItem
              onClick={() => toggleOpen("createNew")}
              key="createNew"
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
              Create New
            </OptionsItem>
            <OptionsItem
              onClick={() => toggleOpen("filter")}
              isHidden={location.pathname === "/grocery-lists"}
              key="filter"
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filter
            </OptionsItem>
            <OptionsItem
              isLast
              onClick={() => toggleOpen("logout")}
              key="logout"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </OptionsItem>
          </OptionsList>
        )}
      </nav>
      <div className="relative h-full min-h-screen overflow-y-auto bg-gray-200">
        <Outlet />
      </div>

      <Logout />

      <Notification />
    </main>
  );
};

export default Main;
