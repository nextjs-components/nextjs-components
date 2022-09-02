import React from "react";

const Tag = ({ children }) => {
  return (
    <li>
      <div>{children}</div>
      <style jsx>{`
        li {
          color: var(--accents-6);
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: var(--geist-form-small-height);
        }
        div {
          background-color: var(--accents-1);
          border: 1px solid var(--accents-2);
          border-radius: var(--geist-radius);
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0px 6px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
        }
      `}</style>
    </li>
  );
};

export default Tag;
