import "nextjs-components/dist/styles/globals.css";

import {
  ThemeContextProvider,
  ToastsProvider,
  ToastArea,
} from "nextjs-components";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <ToastsProvider>
        <Component {...pageProps} />
        <ToastArea />
      </ToastsProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
