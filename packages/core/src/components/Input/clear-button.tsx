import clsx from "clsx";
import { useFocusRing } from "react-aria";

import XCircle from "../../icons/x-circle";
import reset from "../../styles/reset/reset.module.css";
import clearableStyles from "./clearable.module.css";

export const ClearButton = ({ onClick }) => {
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      type="button"
      className={clsx(clearableStyles.button, {
        [clearableStyles["focus-visible"]]: isFocusVisible,
        [reset.reset]: true,
      })}
      onClick={onClick}
      {...focusProps}
    >
      <span>
        <XCircle />
      </span>
    </button>
  );
};
