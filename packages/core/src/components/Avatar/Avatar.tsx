import React from "react";

import styles from "./Avatar.module.css";

const Avatar = ({ size, src }) => {
  return (
    <span className={styles.avatar} style={{ "--size": `${size}px` } as any}>
      <img
        width={size}
        height={size}
        decoding="async"
        loading="lazy"
        {...{ async: true }}
        {...{ importance: "low" }}
        alt="Avatar"
        title="Avatar"
        src={src}
        className={styles.ready}
      />
    </span>
  );
};

export default Avatar;
