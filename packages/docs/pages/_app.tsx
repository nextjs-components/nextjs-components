import "nextjs-components/dist/styles/globals.css";

import Head from "next/head";
import {
  ThemeContextProvider,
  ToastsProvider,
  ToastArea,
} from "nextjs-components";

function MyApp({ Component, pageProps }) {
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
          <Component {...pageProps} />
          <ToastArea />
        </ToastsProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
