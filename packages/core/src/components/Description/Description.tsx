import React from "react";

import styles from "./description.module.css";

interface Props {
  title: string;
  content: string;
  tooltip?: string;
}
/**
 * <Description
 *   title="Section Title"
 *   content="Data about this section."
 *   tooltip="Additional context about what this section refers to."
 * />
 */
const Description = ({ title, content, tooltip }: Props) => {
  return (
    <dl className={styles.description}>
      <dt>
        {title}
        {tooltip && <span className={styles.icon}>{/* <Tooltip/> */}</span>}
      </dt>
      <dd>{content}</dd>
    </dl>
  );
};

export default Description;
