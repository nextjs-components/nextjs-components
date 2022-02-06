import React from "react";
const LI: React.ComponentType = ({ children, ...props }) => {
  return (
    <li {...props}>
      {children}
      <style jsx>{`
        li {
          font-size: 1em;
          line-height: 1.625em;
          margin-bottom: 10px;
          color: currentColor;
        }
        li li {
          /* no margin for nested LI */
          /* expect this from .mdx */
          margin-bottom: 0px;
        }
      `}</style>
    </li>
  );
};

export default LI;
