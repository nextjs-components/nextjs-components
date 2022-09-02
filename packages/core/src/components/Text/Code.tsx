import clsx from "clsx";
import React from "react";

import code from "./code.module.css";
import syntaxTheme from "./syntax-theme.module.css";

interface Props {
  children?: React.ReactNode;
  syntax?: string;
  lite?: boolean;
  style?: React.CSSProperties;
}

const Code = ({ children, syntax, lite, style }: Props) => {
  return (
    <pre
      className={clsx(code.pre, syntax, { [code.lite]: !!lite })}
      style={style}
    >
      <code className={clsx(syntaxTheme.code)}>{children}</code>
    </pre>
  );
};

/**
 * This is the cyan/magenta style code text.
 * @returns
 */
export const OldCode = ({ children, noWrap, noTicks, fontSize = 14 }: any) => {
  return (
    <code
      className={clsx(code.code, {
        [code["no-wrap"]]: !!noWrap,
        [code["no-ticks"]]: !!noTicks,
      })}
      style={{ fontSize: fontSize }}
    >
      {children}
    </code>
  );
};

export default Code;
