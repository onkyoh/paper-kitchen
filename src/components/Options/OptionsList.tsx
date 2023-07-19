interface IOptionsList {
  closeOptions: () => void;
  children: React.ReactNode;
}
const OptionsList = ({ closeOptions, children }: IOptionsList) => {
  return (
    <ul
      className={`absolute right-0 top-16 z-20 flex w-44 flex-col border-2 border-black bg-white`}
      onClick={closeOptions}
    >
      {children}
    </ul>
  );
};

export default OptionsList;
