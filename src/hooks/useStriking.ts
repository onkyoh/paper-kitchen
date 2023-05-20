import {useState} from 'react'

const useStriking = () => {

    const [strikedArray, setStrikedArray] = useState<string[]>([]);

    function handleStrike(text: string) {
      const idx = strikedArray.indexOf(text);
      if (idx >= 0) {
        let tempStriked = [...strikedArray];
        tempStriked.splice(idx, 1);
        setStrikedArray([...tempStriked]);
      } else {
        setStrikedArray([...strikedArray, text]);
      }
    }

    return {
        strikedArray,
        handleStrike
    }
}

export default useStriking