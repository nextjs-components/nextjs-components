import { useEffect, useState } from "react";

/**
 * @usage `const sm_up = useMediaQuery('(min-width: 576px)');`
 *
 * @param {string} query
 * @returns {boolean} a true/false value for if the media query is matched or not
 */
const useMediaQuery = (query: string) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    const mediaQueryList: MediaQueryList = window?.matchMedia(query);
    const onChange = () => {
      setState(mediaQueryList.matches);
    };
    mediaQueryList.addEventListener("change", onChange);
    setState(mediaQueryList.matches);
    return () => {
      mediaQueryList.removeEventListener("change", onChange);
    };
  }, [query]);
  return state;
};
export default useMediaQuery;
