import React from "react";

import { Button } from "../Button";

import { useMenu } from "./menu-context";

export const MenuButton: React.FC = ({ children }) => {
  const { menuId, buttonRef, setOpen, open } = useMenu();

  return (
    <Button
      data-geist-menu-button=""
      aria-describedby={menuId}
      aria-expanded={open}
      ref={buttonRef}
      onClick={() => setOpen(true)}
    >
      {children}
    </Button>
  );
};
