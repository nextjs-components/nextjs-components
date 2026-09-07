> [!WARNING]
> This project is not actively maintained.

# nextjs-components

For package changes and release steps, see [the release guide](https://github.com/nextjs-components/nextjs-components/blob/main/.changeset/README.md).

A collection of React components, transcribed from https://vercel.com/design. [^1]

[^1]: This is not affiliated with [Vercel](https://vercel.com)

![nextjs-components](https://user-images.githubusercontent.com/26389321/187589104-77ce2ff9-ecbd-47a6-98d2-0e809930b648.jpg)

## Motivation

[Blog post](https://thekevinwang.com/2022/01/09/nextjs-components/) from 01/09/2022

## Installation

```bash
npm i nextjs-components
pnpm i nextjs-components
bun i nextjs-components
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
  transpilePackages: ["nextjs-components"],
};

module.exports = nextConfig;
```

## Usage

Using the [Next.js App Router](https://nextjs.org/docs/app/glossary#app-router)

Configure the [styled-jsx registry](https://nextjs.org/docs/15/app/guides/css-in-js#styled-jsx), since `styled-jsx` is used in a few of the components.

```tsx
"use client";

// ./app/layout.tsx
import { ThemeProvider } from "nextjs-components/src/contexts/ThemeContext";
import "nextjs-components/src/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

Using the [Pages router](https://nextjs.org/docs/pages)

```tsx
// ./pages/_app.tsx
import { ThemeProvider, ToastArea, ToastsProvider } from "nextjs-components";
import "nextjs-components/src/styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ToastsProvider>
        <Component {...pageProps} />
        <ToastArea />
      </ToastsProvider>
    </ThemeProvider>
  );
}

export default App;
```

Check out the [documentation site](https://nextjs-components-thekevinwang.vercel.app/) for more examples!

> [!WARNING]
> Dropped `create-react-app` support.
>
> In older versions, usage with `create-react-app` was supported. However, from `>=v1.0.0`, the pre-built `/dist` folder was dropped.
