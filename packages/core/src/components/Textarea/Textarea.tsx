import React, { useState, forwardRef } from "react";
import clsx from "clsx";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean;
  errored?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ disabled, errored, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    return (
      <div
        className={clsx("wrapper", { disabled, errored, focused })}
        onMouseDown={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      >
        <textarea
          {...props}
          ref={ref}
          disabled={disabled}
          className={clsx({ ["focus-visible"]: focused })}
        />
        <style jsx>{`
          .wrapper {
            -webkit-box-align: center;
            align-items: center;
            border-radius: 5px;
            border: 1px solid var(--accents-2);
            display: flex;
            position: relative;
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
            vertical-align: middle;
            background: var(--geist-background);
          }
          .wrapper.disabled {
            border-color: var(--accents-2) !important;
          }
          .wrapper.disabled:placeholder {
            color: var(--accents-3);
          }
          .wrapper.errored {
            border: 1px solid var(--geist-error);
          }
          .wrapper.focused {
            border: 1px solid var(--accents-5);
          }
          .wrapper.errored.focused {
            border: 1px solid var(--geist-error);
            color: var(--geist-error);
          }
          .wrapper.errored textarea {
            color: var(--geist-error);
          }

          textarea {
            background-color: transparent;
            border-radius: 0px;
            border: none;
            box-shadow: none;
            box-sizing: border-box;
            display: block;
            font-family: var(--font-sans);
            font-size: 14px;
            line-height: 1.7;
            height: 100%;
            min-height: 100px;
            outline: 0px;
            padding: 7px 10px;
            resize: none;
            width: 100%;
            color: var(--geist-foreground);
          }
          textarea:disabled {
            background: var(--accents-1);
            color: var(--accents-4);
            border-radius: 5px;
            cursor: not-allowed;
          }
          textarea:disabled::placeholder {
            color: var(--accents-3);
            -webkit-text-fill-color: var(--accents-3);
          }
        `}</style>
      </div>
    );
  },
);

export default Textarea;
