import dynamic from "next/dynamic";
export const ToastArea = dynamic(() => import("./ToastArea"));
// export { ToastArea } from "./Toast";
export { default as ToastsProvider } from "./ToastsProvider";
export { default as useToasts } from "./useToasts";
