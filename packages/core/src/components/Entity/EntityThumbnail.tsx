import { useContext } from "react";

import Skeleton from "../../components/Skeleton";
import styles from "./Entity.module.css";
import { PlaceHolderContext } from "./index";

interface EntityThumbnailProps {
  /** defaults to `32` */
  size?: number;
  children?: React.ReactNode;
  wrap?: boolean;
}

const EntityThumbnail = ({ size = 32, children }: EntityThumbnailProps) => {
  const placeholder = useContext(PlaceHolderContext);

  return (
    <div className={styles.avatar}>
      {placeholder ? <Skeleton height={size} width={size} rounded /> : children}
    </div>
  );
};

export default EntityThumbnail;
