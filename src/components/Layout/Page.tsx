import { IGroceryList, IRecipe } from "../../types";

interface IProps {
  back: () => void;
  currentCard: IRecipe | IGroceryList;
  children?: React.ReactNode;
}

const Page = ({ back, currentCard, children }: IProps) => {
  return (
    <div
      className={`fixed inset-0 z-10 flex h-full w-full flex-col ${currentCard.color}`}
    >
      <header className="flex h-16 items-center justify-between border-b-2 border-black px-4">
        <button onClick={back}>Back</button>
        <h2 className="font-bold">{currentCard.title}</h2>
        <div>
          <button>edit</button>
          <button>delete</button>
          <button>settings</button>
        </div>
      </header>
      <div className="max-w-5xl overflow-y-auto p-2 lg:mx-auto">{children}</div>
    </div>
  );
};

export default Page;
