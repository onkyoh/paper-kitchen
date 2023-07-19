import React from "react";
import useCardStore from "../../stores/useCardStore";
import Header from "../../../../components/Elements/Header";
import Input from "@/components/Form/Input";

interface ITitleProps {
  editMode: boolean;
  title: string;
}

const Title = ({ editMode, title }: ITitleProps) => {
  const updateCard = useCardStore((state) => state.updateCard);

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 30) return;
    updateCard({
      title: e.target.value,
    });
  }

  return (
    <Header>
      {editMode ? (
        <Input
          type="text"
          onChange={handleChangeTitle}
          value={title}
          className="w-72"
        />
      ) : (
        <>{title}</>
      )}
    </Header>
  );
};

export default Title;
