import { BACKGROUND_COLORS } from "@/utils/constants";

interface IRainbowBackground {
  children: React.ReactNode;
}

const RainbowBackground = ({ children }: IRainbowBackground) => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {children}
      <div
        className="absolute -z-10 flex h-fit rotate-45 flex-col "
        style={{
          width: "150vmax",
          height: "140vmax",
        }}
      >
        {BACKGROUND_COLORS.map((color, i) => (
          <div
            className={`flex-grow border-2 border-b border-black ${color}`}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RainbowBackground;
