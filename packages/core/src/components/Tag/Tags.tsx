import React from "react";

const Tags = ({ children }) => {
  return (
    <ul>
      <style jsx>{`
        ul {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          flex-wrap: wrap;
          list-style: none;
          padding: 0px;
          margin: 0px;
        }
        ul > :global(li) {
          margin-bottom: 5px;
          margin-right: 5px;
          margin-top: 5px;
        }
      `}</style>
      {children}
    </ul>
  );
};

export default Tags;
