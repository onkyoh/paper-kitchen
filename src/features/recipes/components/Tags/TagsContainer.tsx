import Tag from "./Tag";
import TagInput from "./TagInput";
import TagList from "./TagList";
import useTags from "../../hooks/useTags";

import { TAG_FIELDS } from "../../utils/constants";
import { IRecipe } from "../../../../types";
import Checkbox from "@/components/Form/Checkbox";

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
            <Tag field="favourite" key="favourite">
              <Checkbox
                handleChange={handleToggle}
                name="favourite"
                isChecked={card.favourite}
                className="h-8 w-8"
              />
            </Tag>
            {TAG_FIELDS.map((field) => (
              <Tag field={field} key={field}>
                <TagInput
                  handleChange={handleChange}
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
