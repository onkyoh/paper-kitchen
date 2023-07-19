import { useCallback, useState } from "react";

const useStriking = () => {
  const [strikedArray, setStrikedArray] = useState<string[]>([]);

  const handleStrike = useCallback((text: string) => {
    setStrikedArray((prevStrikedArray) => {
      const idx = prevStrikedArray.indexOf(text);
      if (idx >= 0) {
        let tempStriked = [...prevStrikedArray];
        tempStriked.splice(idx, 1);
        return [...tempStriked];
      } else {
        return [...prevStrikedArray, text];
      }
    });
  }, []);

  return {
    strikedArray,
    handleStrike,
  };
};

export default useStriking;
