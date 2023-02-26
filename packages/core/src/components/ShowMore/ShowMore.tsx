import clsx from "clsx";
import React from "react";

import Chevron from "../../icons/chevron-down";

export interface ShowMoreProps {
  expanded?: boolean;
  onClick?: () => void;
}
const ShowMore: React.ComponentType<ShowMoreProps> = ({
  onClick,
  expanded,
}) => {
  return (
    <div className={clsx("expand-toggle", { expanded })}>
      <div className="line" />
      <button onClick={onClick}>
        {expanded ? "Show Less" : "Show More"}
        <span className={clsx({ expanded })}>
          <Chevron size={16} />
        </span>
      </button>
      <div className="line" />
      <style jsx>{`
        .expand-toggle {
          width: calc(100% - 40px);
          margin-top: 20px;
          margin-left: 20px;
          display: flex;
          align-items: center;
          min-height: 30px;
        }

        .line {
          flex-grow: 1;
          height: 1px;
          background-color: var(--accents-2);
        }

        button {
          border: 0;
          padding: 5px 15px;
          border-radius: 100px;
          box-shadow: var(--shadow-small);

          // Don't break accessibility on tab focus
          // outline: 0;
          cursor: pointer;
          font-size: 12px;
          text-transform: uppercase;
          color: var(--accents-5);
          height: 28px;
          background-color: var(--geist-background);
          transition: all 0.2s ease;

          // .geist-inline-center
          display: inline-flex;
          align-items: center;
          max-width: 100%;
        }
        button:hover,
        button:focus-visible {
          color: var(--geist-foreground);
          box-shadow: var(--shadow-medium);
        }

        span {
          display: inline-flex;
          margin-left: var(--geist-gap-quarter);
          transition: transform.2s ease-in-out;
        }
        span.expanded {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default ShowMore;
