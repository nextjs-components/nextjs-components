import { forwardRef, useRef } from "react";

import { mergeRefs } from "../../utils/merge-refs";
import { Props as BaseProps, default as Input } from "./Input";
import { ClearButton } from "./clear-button";

interface Props
  extends Omit<BaseProps, "suffix" | "suffixStyling" | "suffixContainer"> {}

const ClearableInput = forwardRef<HTMLInputElement, Props>(
  (props, externalRef) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <Input
        {...props}
        ref={mergeRefs([externalRef, inputRef])}
        suffix={
          props.value || inputRef.current?.value ? (
            <ClearButton
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                  inputRef.current.focus();
                  console.log(props);
                  props.onChange?.({
                    target: { value: "" },
                  } as any);
                }
              }}
            />
          ) : null
        }
        suffixContainer={false}
        suffixStyling={false}
      />
    );
  },
);

export default ClearableInput;
