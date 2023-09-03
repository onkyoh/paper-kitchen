const PageList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto flex h-full max-w-2xl flex-col gap-2 overflow-y-auto px-4 pb-8 pt-20">
      {children}
    </div>
  );
};

export default PageList;
