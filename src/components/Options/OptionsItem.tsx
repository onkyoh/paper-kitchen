interface IOptionsItemProps {
  onClick?: () => void;
  isLast?: boolean;
  children: React.ReactNode;
  isHidden?: boolean;
}

const OptionsItem = ({
  onClick,
  isLast = false,
  isHidden,
  children,
}: IOptionsItemProps) => {
  return (
    <li
      className={`flex-start flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-300 ${
        isLast ? "" : "border-b-2 border-dashed border-black"
      } ${isHidden ? "hidden" : ""}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default OptionsItem;
