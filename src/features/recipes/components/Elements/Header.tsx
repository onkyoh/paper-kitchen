interface IHeaderProps {
  children: React.ReactNode;
}
const Header = ({ children }: IHeaderProps) => {
  return <h3 className="text-lg font-bold">{children}</h3>;
};

export default Header;
