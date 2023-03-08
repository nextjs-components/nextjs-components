import React from "react";

import InfoFill from "../../icons/info-fill";
import { Tooltip } from "../tooltip";
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
        {tooltip && (
          <span className={styles.icon}>
            {
              <Tooltip text={tooltip}>
                <InfoFill
                  size={14}
                  color="var(--accents-2)"
                  style={
                    {
                      fill: "currentColor",
                      "--geist-stroke": "var(--geist-foreground)",
                    } as React.CSSProperties
                  }
                />
              </Tooltip>
            }
          </span>
        )}
      </dt>
      <dd>{content}</dd>
    </dl>
  );
};

export default Description;
