import clsx from "clsx";
import dynamic from "next/dynamic";
import { ToastsProvider } from "nextjs-components/src/components/Toast";
import React from "react";

import Navigation, { SiblingLinks, Sidebar } from "./navigation";

// ToastArea should not be ssr'd because it causes hydration issues
// TODO: figure out why and document it.
const ToastArea = dynamic(
  () => import("nextjs-components/src/components/Toast/ToastArea"),
  { ssr: false },
);

interface Props extends React.PropsWithChildren {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  paths?: string[];
}

const DesignLayout: React.FC<Props> = ({ children }) => {
  return (
    <ToastsProvider>
      <Navigation>
        <div
          id="design-page" // see globals.css
          className={clsx(
            "mx-auto my-0 min-h-screen max-w-[1250px] px-[--geist-gap] py-0",
          )}
        >
          <Sidebar />
          <main
            className={clsx(
              "ml-[300px] flex min-h-screen grow flex-col items-center pt-10",
              "max-[960px]:ml-0",
            )}
          >
            <div
              className={
                "mx-auto my-0 flex w-full max-w-[840px] shrink grow flex-col"
              }
            >
              {children}
              <SiblingLinks />
            </div>
          </main>
        </div>
        <ToastArea />
      </Navigation>
    </ToastsProvider>
  );
};
export default DesignLayout;
