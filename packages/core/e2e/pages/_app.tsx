import type { NextPage } from "next";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastsProvider } from "nextjs-components/src/components/Toast";
import { ThemeContextProvider } from "nextjs-components/src/contexts/ThemeContext";
import "nextjs-components/src/styles/globals.css";
import type { ReactElement, ReactNode } from "react";

/**
 * @warn ToastArea should not be rendered on the server. It appears that its
 * portal usage causes hydration mismatch errors.
 */
const ToastArea = dynamic(
  () => import("nextjs-components/src/components/Toast/ToastArea"),
  { ssr: false },
);

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <AppHead />
      <ThemeContextProvider>
        <ToastsProvider>
          {getLayout(<Component {...pageProps} />, pageProps)}
          <ToastArea />
        </ToastsProvider>
      </ThemeContextProvider>
    </>
  );
};

export default MyApp;

// Misc Head stuff
const AppHead = () => {
  return (
    <Head>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
!(function () {
let m, t;
try {
m = localStorage.getItem("mode");
} catch (e) {}
let d = window.matchMedia("(prefers-color-scheme: dark)");
typeof d.matches == "boolean" && (t = d.matches);
m === null && t && document.documentElement.classList.add("dark-theme");
m === "dark" && document.documentElement.classList.add("dark-theme");
m === "system" && t && document.documentElement.classList.add("dark-theme");
(window.__mode = m || "system");
})();
`,
        }}
      />
    </Head>
  );
};
