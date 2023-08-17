interface ICheckedProps {
  id?: string;
  name: string;
  isChecked?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox = ({
  id,
  name,
  isChecked,
  handleChange,
  className,
}: ICheckedProps) => {
  return (
    <input
      type="checkbox"
      checked={isChecked || false}
      onChange={handleChange}
      id={id}
      name={name}
      className={`h-6 w-6 p-1 accent-black outline-dashed outline-2 outline-black checked:outline ${className}`}
    />
  );
};

export default Checkbox;
