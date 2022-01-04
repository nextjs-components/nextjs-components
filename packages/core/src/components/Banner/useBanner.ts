import { useEffect, useState } from "react";

type UseBanner = (key: string) => [boolean, () => void];

const useBanner: UseBanner = (key) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setIsHidden(!!localStorage.getItem(key));
    }
  }, []);

  const handleClose = () => {
    setIsHidden(true);
    localStorage.setItem(key, "1");
  };

  return [!isHidden, handleClose];
};

export default useBanner;
