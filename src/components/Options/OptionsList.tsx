interface IOptionsList {
  closeOptions: () => void;
  listRef: React.RefObject<HTMLUListElement>;
  children: React.ReactNode;
}
const OptionsList = ({ closeOptions, listRef, children }: IOptionsList) => {
  return (
    <ul
      ref={listRef}
      tabIndex={-1}
      className={`absolute right-0 top-16 z-20 flex w-44 flex-col border-2 border-black bg-white`}
      onClick={closeOptions}
    >
      {children}
    </ul>
  );
};

export default OptionsList;
