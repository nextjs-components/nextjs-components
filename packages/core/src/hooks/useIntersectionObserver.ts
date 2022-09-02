import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";

/**
 * For now, this hook will trigger once, setting
 * `isIntersecting` to `true` and disconnect.
 */
export default function useIntersectionObserver(
  options: IntersectionObserverInit = {},
): [boolean, { ref: MutableRefObject<undefined> }] {
  const ref = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const io = useMemo(
    () =>
      typeof IntersectionObserver !== "undefined" &&
      new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      }, options),
    [],
  );

  useEffect(() => {
    if (io && ref.current) io.observe(ref.current);

    return () => {
      if (io) io.disconnect();
    };
  }, [io]);

  return [isIntersecting, { ref }];
}
