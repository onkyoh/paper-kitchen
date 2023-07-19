import Input from "../../../../components/Form/Input";
import { TagField } from "../../../../types";

interface ITagInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean | number | null;
  field: TagField;
}

const TagInput = ({ handleChange, value, field }: ITagInputProps) => {
  return (
    <>
      <Input
        value={value?.toString() || ""}
        onChange={handleChange}
        name={field}
        type="text"
        className="w-10"
      />
    </>
  );
};

export default TagInput;
