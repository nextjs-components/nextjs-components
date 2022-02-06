import React from "react";
/**
 * Notes
 * https://github.com/vercel/styled-jsx/issues/121#issuecomment-280332737
 */
const UL: React.ComponentType = ({ children, ...props }) => {
  return (
    <ul {...props}>
      {children}
      <style jsx>{`
        ul {
          list-style-type: none;
          margin-left: var(--geist-gap);
          color: currentColor;
          padding: 0px;
        }
        ul > :global(li::before) {
          content: "–";
          display: inline-block;
          color: var(--accents-4);
          position: absolute;
          margin-left: -15px;
        }
      `}</style>
    </ul>
  );
};

export default UL;
