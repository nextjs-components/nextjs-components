import React from "react";
const OL: React.ComponentType = ({ children, ...props }) => {
  return (
    <ol {...props}>
      {children}
      <style jsx>{`
        ol {
          margin-left: var(--geist-gap);
          color: currentColor;
          padding: 0px;
        }
      `}</style>
    </ol>
  );
};

export default OL;
