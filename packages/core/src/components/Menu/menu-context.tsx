import { usePopper } from "react-popper";
import React, { createContext, useContext } from "react";

export interface IMenuContext {
  menuId: string;
  buttonId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  listRef: React.RefObject<HTMLUListElement>;
  popper: (val: any) => void;
  arrow: (el: HTMLDivElement) => void;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  typeahead: string;
  afterSelect: () => void;
  popperStyles: ReturnType<typeof usePopper>["styles"];
  popperAttributes: ReturnType<typeof usePopper>["attributes"];
  selectFirstNonDisabled: () => void;
  handleKey: () => void;
  closeAndRestoreFocus: () => void;
}

const MenuContext = createContext<IMenuContext>({
  menuId: "menu-90",
  buttonId: "menu-button-91",
  open: false,
  setOpen: (val: boolean) => {},
  listRef: null,
  popper: (val: any) => {},
  arrow: () => {},
  selected: null,
  setSelected: (val: number) => {},
  buttonRef: null,
  typeahead: "",
  afterSelect: () => {},
  popperStyles: {},
  popperAttributes: {},
  selectFirstNonDisabled: () => {},
  handleKey: () => {},
  closeAndRestoreFocus: () => {},
});

export default MenuContext;
export const useMenu = () => useContext(MenuContext);
