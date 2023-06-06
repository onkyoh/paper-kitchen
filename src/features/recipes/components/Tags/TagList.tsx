import Tag from "./Tag";
import useAuthStore from "../../../auth/stores/useAuthStore";
import { IRecipe } from "../../../../types";
import { TAG_FIELDS } from "../../utils/constants";

interface ITagListProps {
  card: IRecipe;
}

const TagList = ({ card }: ITagListProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <ul className="flex flex-wrap gap-2">
      {user?.id === card.ownerId && <Tag field="owner" />}
      {card.favourite && <Tag field="favourite" />}
      {TAG_FIELDS.filter((field) => card[field] && field !== "favourite").map(
        (field) => (
          <Tag field={field} key={field}>
            {<span>{card[field]}</span>}
          </Tag>
        )
      )}
    </ul>
  );
};

export default TagList;
