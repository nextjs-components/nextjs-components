import clsx from "clsx";
import styles from "./TextField.module.css";

import { Label } from "components/Label";

type InputProps = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;
export interface Props extends Omit<InputProps, "size" | "prefix" | "suffix"> {
  size?: "small" | "large";
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  prefixStyling?: boolean;
  /** if false, omits a wrapper span */
  prefixContainer?: boolean;
  suffixStyling?: boolean;
  /** if false, omits a wrapper span */
  suffixContainer?: boolean;
  label?: string;
  error?: boolean;
}

export const TextField: React.ComponentType<Props> = ({
  size,
  className,
  prefix,
  prefixStyling = true,
  prefixContainer = true,
  suffix,
  suffixStyling = true,
  suffixContainer = true,
  label,
  error,
  ...props
}) => {
  const containerClassName = clsx(styles.container, {
    [styles[size]]: !!size,
    [styles.prefix]: !!prefix,
    [styles.suffix]: !!suffix,
    [styles.noPrefixStyle]: !prefixStyling,
    [styles.noSuffixStyle]: !suffixStyling,
    [styles.error]: error,
    [styles["geist-themed"]]: error,
    [styles.disabled]: props.disabled,
  });

  const inputClassName = clsx(styles.input, className, {
    [styles[size]]: !!size,
  });

  const _prefix = prefixContainer ? <span>{prefix}</span> : prefix;
  const _suffix = suffixContainer ? <span>{suffix}</span> : suffix;

  if (label) {
    return (
      <Label htmlFor={props.id || props.name} label={label}>
        <div className={containerClassName}>
          <input {...props} className={inputClassName} />
          {_prefix}
          {_suffix}
        </div>
      </Label>
    );
  }

  return (
    <div className={containerClassName}>
      <input {...props} className={inputClassName} />
      {_prefix}
      {_suffix}
    </div>
  );
};
