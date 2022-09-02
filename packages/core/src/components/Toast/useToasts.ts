import { useContext } from "react";

import { ToastsContext } from "./ToastsProvider";

export default function useToasts() {
  return useContext(ToastsContext);
}
