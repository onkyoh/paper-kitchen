import Tag from "./Tag";
import TagInput from "./TagInput";
import TagList from "./TagList";
import useTags from "../../hooks/useTags";

import { TAG_FIELDS } from "../../utils/constants";
import { IRecipe } from "../../../../types";

interface ITitleContainerProps {
  card: IRecipe;
  editMode: boolean;
}

const TagsContainer = ({ editMode, card }: ITitleContainerProps) => {
  const { handleToggle, handleChange } = useTags();

  return (
    <div className="flex flex-col gap-2">
      {!editMode ? (
        <TagList card={card} />
      ) : (
        <>
          <ul className="flex gap-2">
            {TAG_FIELDS.map((field) => (
              <Tag field={field} key={field}>
                <TagInput
                  isBoolean={typeof card[field] === "boolean"}
                  handleChange={handleChange}
                  handleToggle={handleToggle}
                  value={card[field]}
                  field={field}
                />
              </Tag>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TagsContainer;
