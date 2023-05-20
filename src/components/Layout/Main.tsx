import { useState } from "react";
import Button from "../Elements/Button";
import Modal from "../Elements/Modal";
import Screen from "./Screen";

const Main = () => {
  const [screen, setScreen] = useState("Recipes");
  const [filtering, setFiltering] = useState(false);

  const navList = ["Recipes", "Groceries"];

  return (
    <main className="flex h-screen flex-col">
      <nav className="flex h-16 items-center justify-between border-b-2 border-dashed border-black px-4">
        <span className="hidden font-bold md:block md:flex-1">
          PaperKitchen
        </span>
        <span className="flex-1 font-bold md:hidden">PK</span>
        <div className="flex flex-1 items-center justify-center gap-4">
          {navList.map((value) => (
            <button
              onClick={() => setScreen(value)}
              aria-label={value}
              className={`${screen === value ? "selected" : ""} relative`}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button aria-label="create new">
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
          <Button
            onClick={() => setFiltering(true)}
            aria-label="filter"
            disabled={screen === "Groceries"}
            className="disabled:cursor-not-allowed disabled:opacity-50"
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
          </Button>
        </div>
      </nav>
      <div className="flex-grow overflow-y-auto bg-gray-200 p-4">
        <Screen screen={screen} />
      </div>
      {filtering && (
        <Modal>
          <Button onClick={() => setFiltering(false)} aria-label="close">
            Close
          </Button>
        </Modal>
      )}
    </main>
  );
};

export default Main;
