import React, { useCallback, useEffect, useRef, useState } from "react";

const useOptions = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);

  const toggleOptions = useCallback(() => {
    setOptionsOpen((prevOptionsOpen) => !prevOptionsOpen);
  }, [listRef]);

  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      if (!optionsOpen) return;
      if (!listRef.current?.contains(event.relatedTarget as Node)) {
        setOptionsOpen(false);
      }
    },
    [listRef]
  );

  useEffect(() => {
    if (optionsOpen) {
      listRef.current?.focus();
    }
  }, [optionsOpen]);

  return {
    optionsOpen,
    toggleOptions,
    listRef,
    handleBlur,
  };
};

export default useOptions;
