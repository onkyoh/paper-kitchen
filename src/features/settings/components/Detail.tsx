import HorizontalRule from "@/components/Elements/HorizontalRule";

interface IDetail {
  field: string;
  children: React.ReactNode;
}

const Detail = ({ field, children }: IDetail) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <h3 className="bold text-lg capitalize">{field}:</h3>
        {children}
      </div>
      <HorizontalRule />
    </>
  );
};

export default Detail;
