import Input from "../../../../components/Form/Input";
import { TagField } from "../../../../types";

interface ITagInputProps {
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isBoolean: boolean;
  value: boolean | number | null;
  field: TagField;
}

const TagInput = ({
  handleChange,
  handleToggle,
  isBoolean,
  value,
  field,
}: ITagInputProps) => {
  return (
    <>
      {isBoolean ? (
        <input
          type="checkbox"
          checked={value as boolean}
          name={field}
          onChange={handleToggle}
        />
      ) : (
        <Input
          value={value?.toString() || ""}
          onChange={handleChange}
          name={field}
          type="text"
          className="w-10"
        />
      )}
    </>
  );
};

export default TagInput;
