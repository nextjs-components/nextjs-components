import React from "react";
// <MenuWrapper>
//   <MenuButton>Actions</MenuButton>
//   <Menu width={200}>
//     <MenuItem onClick={() => alert('One')}>One</MenuItem>
//     <MenuItem onClick={() => alert('Two')}>Two</MenuItem>
//     <MenuItem onClick={() => alert('Three')}>Three</MenuItem>
//     <MenuItem onClick={() => alert('Delete')} type="error">Delete</MenuItem>
//   </Menu>
// </MenuWrapper>
import { useState, createContext, useContext, MouseEventHandler } from "react";
import clsx from "clsx";
import Popover from "@material-ui/core/Popover";
import useMediaQuery from "hooks/useMediaQuery";

import { Button } from "../../components/Button";
import Drawer from "../../components/Drawer";

import styles from "./Menu.module.css";

interface IMenuContext {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  id?: string;
  handleClick: MouseEventHandler;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}
const MenuContext = createContext<IMenuContext>({
  anchorEl: null,
  open: false,
  id: undefined as string,
  handleClick: (e) => {},
  handleClose: (event, reason) => {},
});
const useMenu = () => useContext(MenuContext);

export const MenuWrapper = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <MenuContext.Provider
      value={{ anchorEl, open, id, handleClose, handleClick }}
    >
      {children}
    </MenuContext.Provider>
  );
};

interface MenuButtonProps {
  forTable?: boolean;
  onClick?: (...args: any) => void;
  variant?: "unstyled";
}
export const MenuButton: React.ComponentType<MenuButtonProps> = ({
  children,
  forTable,
  onClick,
  variant,
}) => {
  const { id, handleClick } = useMenu();
  // poor API/hack?
  if (forTable) {
    return (
      <div
        aria-describedby={id}
        onClick={handleClick}
        className={styles.menu_button}
      >
        {children}
      </div>
    );
  }
  if (variant) {
    return (
      <div aria-describedby={id} onClick={handleClick}>
        {children}
      </div>
    );
  }
  return (
    <Button aria-describedby={id} onClick={handleClick}>
      {children}
    </Button>
  );
};

export const Menu = ({ children, width = 200 }) => {
  const { anchorEl, open, id, handleClose } = useMenu();
  const isSmall = useMediaQuery("@media (max-width:600px)");

  if (isSmall) {
    return (
      <Drawer show={open} onDismiss={handleClose as any}>
        {children}
      </Drawer>
    );
  }
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        className: styles.menu,
        style: {
          width,
        },
        component: "ul",
      }}
    >
      <div
        className={styles.arrow}
        style={{
          left: `0px`,
          transform: `translate3d(32.5px, 0px, 0px)`,
        }}
      />
      {children}
    </Popover>
  );
};

interface MenuItemProps {
  onClick?: () => void;
  type?: "error";
  divide?: boolean;
  error?: boolean;
  disabled?: boolean;
}
export const MenuItem: React.ComponentType<MenuItemProps> = ({
  children,
  onClick,
  type,
  divide,
  error,
  disabled,
}) => {
  const { handleClose } = useMenu();
  return (
    <li
      className={clsx(styles.menu_item, styles[type], {
        [styles.divide]: divide,
        [styles.error]: error,
        [styles.disabled]: disabled,
      })}
      onClick={() => {
        if (disabled) return;
        onClick?.();
        handleClose(null, null);
      }}
    >
      {children}
    </li>
  );
};
