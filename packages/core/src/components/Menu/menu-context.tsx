import React, { createContext, useContext } from "react";

export interface IMenuContext {
  popperRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  listElement: HTMLUListElement | null;
  setListElement: React.Dispatch<React.SetStateAction<HTMLUListElement>>;
  menuId: string;
  buttonId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  typeahead: string;
  afterSelect: () => void;
  selectFirstNonDisabled: () => void;
  handleKey: () => void;
  closeAndRestoreFocus: () => void;
}

const MenuContext = createContext<IMenuContext>({
  popperRef: { current: null },
  buttonRef: { current: null },
  listElement: null as HTMLUListElement | null,
  setListElement: (val: HTMLUListElement) => {},
  menuId: "menu-:r1:",
  buttonId: "menu-button-:r2:",
  open: false,
  setOpen: (val: boolean) => {},
  selected: null,
  setSelected: (val: number) => {},
  typeahead: "",
  afterSelect: () => {},
  selectFirstNonDisabled: () => {},
  handleKey: () => {},
  closeAndRestoreFocus: () => {},
});

export default MenuContext;
export const useMenu = () => useContext(MenuContext);
