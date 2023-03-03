import React from "react";
import { forwardRef, useRef } from "react";

import Search from "../../icons/search";
import { mergeRefs } from "../../utils/merge-refs";
import { Spinner } from "../Spinner";
import { Props as BaseProps, default as Input } from "./Input";
import { ClearButton } from "./clear-button";

interface Props
  extends Omit<
    BaseProps,
    | "prefix"
    | "prefixStyling"
    | "prefixContainer"
    | "suffix"
    | "suffixStyling"
    | "suffixContainer"
  > {
  loading?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ loading, ...props }, externalRef) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <Input
        {...props}
        ref={mergeRefs([externalRef, inputRef])}
        aria-label={props["aria-label"] || "Search"}
        typeName="search"
        prefix={
          loading ? (
            <Spinner size={{ small: 16, large: 24 }[props.size]} />
          ) : (
            <Search />
          )
        }
        prefixStyling={false}
        suffix={
          props.value || inputRef.current?.value ? (
            <ClearButton
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = "";
                  inputRef.current.focus();
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

export default SearchInput;
