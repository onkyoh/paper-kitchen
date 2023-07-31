import Button from "../Elements/Button";

interface IOptionsButton {
  isOpen: boolean;
  toggleOpen: () => void;
  screen: "main" | "page";
}

const OptionsButton = ({ isOpen, toggleOpen, screen }: IOptionsButton) => {
  return isOpen ? (
    <Button onClick={toggleOpen} aria-label={`close options ${screen}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </Button>
  ) : (
    <Button onClick={toggleOpen} aria-label={`open options ${screen}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </Button>
  );
};

export default OptionsButton;
