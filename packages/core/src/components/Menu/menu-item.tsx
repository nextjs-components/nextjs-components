import clsx from "clsx";
import React, { PointerEventHandler, forwardRef, useId, useRef } from "react";

import { IconSizeContext } from "../../contexts/IconSizeContext";
import classes from "./Menu.module.css";
import { useMenu } from "./menu-context";

interface MenuItemInnerProps {
  children?: any;
  Component?: any;
  href?: string;
  "aria-disabled": boolean | "true" | "false";
  "aria-labelledby"?: string;
  onPointerUp: () => void;
  onPointerMove: PointerEventHandler<HTMLLIElement>;
  "data-selected"?: "";
  className: string;
}

export const MenuItemInner: React.ForwardRefExoticComponent<
  MenuItemInnerProps & React.RefAttributes<unknown>
> = forwardRef(
  (
    {
      children,
      className,
      onPointerMove,
      onPointerUp,
      href,
      Component,
      ...props
    },
    ref,
  ) => {
    const { setOpen } = useMenu();
    if (Component) {
      return (
        <li
          role="none"
          ref={ref as any}
          data-geist-menu-item=""
          data-geist-menu-link=""
          data-selected={props["data-selected"]}
        >
          <Component
            aria-disabled={props["aria-disabled"]}
            aria-labelledby={props["aria-labelledby"]}
            data-selected={props["data-selected"]}
            data-descendant=""
            className={className}
            tabIndex={-1}
            {...{ href }}
            // Links won't use the `onClick` prop
            // onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            onTouchEnd={() => setTimeout(() => setOpen(false), 0)}
            onMouseUp={() => setTimeout(() => setOpen(false), 0)}
          >
            {children}
          </Component>
        </li>
      );
    }
    return (
      <li
        role="menuitem"
        ref={ref as any}
        data-geist-menu-item=""
        aria-disabled={props["aria-disabled"]}
        aria-labelledby={props["aria-labelledby"]}
        data-selected={props["data-selected"]}
        className={className}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        tabIndex={-1}
      >
        {children}
      </li>
    );
  },
);
MenuItemInner.displayName = "MenuItemInner";

interface MenuItemProps {
  disabled?: boolean;
  onClick?: () => void;
  value?: any; // fixme
  isLink?: boolean;
  type?: "error";
  error?: boolean;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
}

export const MenuItem: React.ComponentType<
  React.PropsWithChildren<MenuItemProps>
> = ({ children, onClick, type, error, disabled, prefix, suffix }) => {
  const { setOpen, selected, setSelected, listElement } = useMenu();

  const itemRef = useRef<HTMLLIElement>();

  // https://stackoverflow.com/a/23528539/9823455
  const idx = Array.from(listElement?.childNodes.values() ?? []).indexOf(
    itemRef.current,
  );

  const id = useId();

  return (
    <MenuItemInner
      ref={itemRef}
      aria-disabled={disabled ? "true" : undefined}
      aria-labelledby={`menu-item-${id}`}
      data-selected={selected === idx ? "" : undefined}
      className={clsx(classes.item, type && classes[type], {
        [classes.error]: !!error,
      })}
      onPointerUp={() => {
        if (disabled) return;
        onClick?.();
        setOpen(false);
      }}
      onPointerMove={() => {
        if (disabled) return;
        setSelected(idx);
      }}
    >
      <IconSizeContext.Provider value={{ size: 18 }}>
        {prefix && (
          <span className={classes.prefix} aria-hidden={true}>
            {prefix}
          </span>
        )}
        <span id={`menu-item-${id}`}>{children}</span>
        {suffix && (
          <span className={classes.suffix} aria-hidden={true}>
            {suffix}
          </span>
        )}
      </IconSizeContext.Provider>
    </MenuItemInner>
  );
};

export const MenuLink = ({
  href,
  children,
  disabled,
  type,
  error,
  onClick,
}) => {
  const { setOpen, selected, setSelected, listElement } = useMenu();

  const itemRef = useRef<HTMLLIElement>();

  // https://stackoverflow.com/a/23528539/9823455
  const idx = Array.from(listElement?.childNodes.values() ?? []).indexOf(
    itemRef.current,
  );

  const id = useId();

  return (
    <MenuItemInner
      href={href}
      Component={(props) => {
        return <a {...props} />;
      }}
      ref={itemRef}
      aria-disabled={disabled ? "true" : undefined}
      aria-labelledby={`menu-item-${id}`}
      data-selected={selected === idx ? "" : undefined}
      className={clsx(classes.item, classes[type], {
        [classes.error]: error,
        [classes.disabled]: disabled,
      })}
      onPointerUp={() => {
        if (disabled) return;
        onClick?.();
        setOpen(false);
      }}
      onPointerMove={() => {
        if (disabled) return;
        setSelected(idx);
      }}
    >
      <span id={`menu-item-${id}`}>{children}</span>
    </MenuItemInner>
  );
};
