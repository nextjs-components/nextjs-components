import React from "react";

interface Props {
  y?: number;
  x?: number;
}
/**
 * y * 24
 */
const Spacer: React.ComponentType<Props> = ({ y = 1, x = 1 }) => {
  return (
    <span aria-hidden="true" className="geist-spacer">
      <style jsx>{`
        .geist-spacer {
          display: block;
          width: 1px;
          height: 1px;
          min-width: 1px;
          min-height: 1px;
          margin-left: calc(${24 * x}px - 1px);
          margin-top: calc(${24 * y}px - 1px);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </span>
  );
};

export default Spacer;
