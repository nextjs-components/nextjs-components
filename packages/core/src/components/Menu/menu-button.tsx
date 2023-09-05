"use client";

import { Button, ButtonProps } from "../Button";
import { useMenu } from "./menu-context";

export const MenuButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  onMouseDown,
  onKeyDown,
  ...props
}) => {
  const { menuId, buttonId, buttonRef, setOpen, open, listElement } = useMenu();

  return (
    <Button
      {...props}
      id={buttonId}
      aria-haspopup={true}
      aria-describedby={menuId}
      aria-expanded={open}
      data-geist-menu-button=""
      ref={buttonRef}
      onClick={(e) => {
        setOpen(true);
        onClick?.(e);
      }}
      onMouseDown={(e) => {
        setOpen(true);
        onMouseDown?.(e);
      }}
      onKeyDown={(e) => {
        // spacebar or enter
        if (e.key === " " || e.key === "Enter") {
          setOpen(true);
          onKeyDown?.(e);
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
