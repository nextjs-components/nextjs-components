import type { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastsProvider } from "nextjs-components/src/components/Toast";
import { ThemeContextProvider } from "nextjs-components/src/contexts/ThemeContext";
import "nextjs-components/src/styles/globals.css";
import type { ReactElement, ReactNode } from "react";

import "./globals.css";

// Don't render this serverside. This avoids https://nextjs.org/docs/messages/react-hydration-error
const ToastArea = dynamic(
  () => import("nextjs-components/src/components/Toast/ToastArea"),
  { ssr: false },
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(){let e,t;try{e=localStorage.getItem("mode")}catch(e){}var d=window.matchMedia("(prefers-color-scheme: dark)");"boolean"==typeof d.matches&&(t=d.matches),null===e&&t&&document.documentElement.classList.add("dark-theme"),"dark"===e&&document.documentElement.classList.add("dark-theme"),"system"===e&&t&&document.documentElement.classList.add("dark-theme"),window.__mode=e||"system"}();`,
          }}
        />
      </Head>
      <ThemeContextProvider>
        <ToastsProvider>
          {getLayout(<Component {...pageProps} />)}
          <ToastArea />
        </ToastsProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
