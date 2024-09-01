> [!WARNING]
> This project is not actively maintained.

# nextjs-components

A collection of React components, transcribed from https://vercel.com/design. [^1]

[^1]: This is not affiliated with [Vercel](https://vercel.com)

![nextjs-components](https://user-images.githubusercontent.com/26389321/187589104-77ce2ff9-ecbd-47a6-98d2-0e809930b648.jpg)

## Motivation

[Blog post](https://thekevinwang.com/2022/01/09/nextjs-components/) from 01/09/2022

## Installation

```bash
# with npm
npm i nextjs-components
```

```bash
# with yarn
yarn add nextjs-components
```

This project needs to be transpiled to work with your Next.js application. It is recommended to use Next.js `13.1.0`’s [built-in module tranpilation](https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable). (Up until Next.js `13.1.0`, [`next-transpile-modules`](https://github.com/martpie/next-transpile-modules) handled this use case.)

```js
// next.config.js

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"],
  swcMinify: true,
  transpilePackages: ["nextjs-components"],
};

module.exports = nextConfig;
```

## Usage

Using Next 13's `app` directory

```tsx
"use client";

// ./app/layout.tsx
import { ThemeContextProvider } from "nextjs-components/src/contexts/ThemeContext";
import "nextjs-components/src/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
```

Using the _traditional_ custom `_app.tsx`

```tsx
// ./pages/_app.tsx
import {
  ThemeContextProvider,
  ToastArea,
  ToastsProvider,
} from "nextjs-components";
import "nextjs-components/src/styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <ToastsProvider>
        <Component {...pageProps} />
        <ToastArea />
      </ToastsProvider>
    </ThemeContextProvider>
  );
}

export default App;
```

Check out the [documentation site](https://nextjs-components-thekevinwang.vercel.app/) for more examples!

> [!WARNING]
> Dropped `create-react-app` support.
>
> In older versions, usage with `create-react-app` was supported. However, from `>=v1.0.0`, the pre-built `/dist` folder was dropped.
