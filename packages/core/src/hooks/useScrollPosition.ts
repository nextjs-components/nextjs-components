import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

interface ScrollPosition {
  x: number;
  y: number;
}

function getScrollPosition(): ScrollPosition {
  return isBrowser
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

const useScrollPosition = (): ScrollPosition => {
  const [position, setScrollPosition] = useState<ScrollPosition>(
    getScrollPosition(),
  );

  useEffect(() => {
    let requestRunning: number = null;

    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return position;
};

export default useScrollPosition;
