# nextjs-components

For package changes and release steps, see [the release guide](https://github.com/nextjs-components/nextjs-components/blob/main/.changeset/README.md).

A collection of React components, transcribed from https://vercel.com/design. [^1]

[^1]: This is not affiliated with [Vercel](https://vercel.com)

![nextjs-components](https://user-images.githubusercontent.com/26389321/187589104-77ce2ff9-ecbd-47a6-98d2-0e809930b648.jpg)

## Motivation

[Blog post](https://thekevinwang.com/2022/01/09/nextjs-components/) from 01/09/2022

## Installation

```bash
npm i nextjs-components tailwindcss@^4
pnpm i nextjs-components tailwindcss@^4
bun i nextjs-components tailwindcss@^4
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

## Configure Tailwind CSS 4

The application must compile the library's utility classes with Tailwind CSS 4 or later. The package ships source files and a shared theme. Configure both the theme import and source detection below.

For Next.js, install the Tailwind PostCSS plugin:

```bash
npm install -D @tailwindcss/postcss@^4
```

Add it to the application's PostCSS configuration:

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Add the theme import and `@source` to the application's Tailwind stylesheet:

```css
/* app/globals.css */
@import "tailwindcss";
@import "nextjs-components/styles/theme.css";

@source "../node_modules/nextjs-components/src";
```

Tailwind skips `node_modules` by default. `@source` registers the package's classes with the application's build. Keep any source declarations already used by your app.

**Source paths are relative to this CSS file.** For `src/app/globals.css`, use `../../node_modules/nextjs-components/src`. In a monorepo, point to the `node_modules` directory that contains the installed package. This repository's `packages/docs/app/globals.css` uses `../../../node_modules/nextjs-components/src` and consumes the local package through `file:../core`.

The shared theme adds names such as `text-geist-gray-900`, `bg-geist-background-100`, and `font-geist-sans`. It preserves the application's Tailwind color palette, spacing, and font definitions. Components use ordinary Tailwind utilities with no utility prefix.

Import the application's Tailwind stylesheet and `nextjs-components/src/styles/globals.css` once in the root layout or custom app, as shown below. The package's global CSS supplies runtime design tokens and base styles; the theme provider selects light or dark values. Component CSS Modules load with their components.

For library development, keep utility names complete and static so the application's scanner can detect them. Run `npm run docs` to compile and check changes through the local consumer. There is no core CSS build or generated stylesheet to commit.

See Tailwind's [source detection guide](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources).

## Usage

Using the [Next.js App Router](https://nextjs.org/docs/app/glossary#app-router)

Configure the [styled-jsx registry](https://nextjs.org/docs/15/app/guides/css-in-js#styled-jsx), since `styled-jsx` is used in a few of the components.

```tsx
"use client";

// ./app/layout.tsx
import { ThemeProvider } from "nextjs-components/src/contexts/ThemeContext";
import "nextjs-components/src/styles/globals.css";
import "./globals.css";

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
import "../styles/globals.css";

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
