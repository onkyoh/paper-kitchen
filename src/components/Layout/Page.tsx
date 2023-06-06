import { Dispatch, SetStateAction } from "react";
import useCardStore from "../../features/recipes/stores/useCardStore";

interface IProps {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Page = ({ editMode, setEditMode, children }: IProps) => {
  const { card, back } = useCardStore();

  return (
    <div className={`fixed inset-0 z-10 h-full w-full ${card?.color}`}>
      <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b-2 border-black bg-inherit p-4">
        <button onClick={back}>&#8592;</button>
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditMode(!editMode)}>edit</button>
          <button>delete</button>
          <button>share</button>
        </div>
      </header>
      <div className="relative flex h-full max-w-5xl flex-col gap-2 overflow-y-auto px-2 pb-8 pt-20 lg:mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Page;
