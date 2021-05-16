import React, { useEffect, useRef, useState } from "react";

export const useComponentVisible: (
  initialIsVisible: boolean
) => [
  ref: React.RefObject<HTMLDivElement>,
  isVisible: boolean,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
] = (initialIsVisible) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current)
      if (!ref.current.contains(event.target)) {
        setIsVisible(false);
      }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  });

  return [ref, isVisible, setIsVisible];
};
