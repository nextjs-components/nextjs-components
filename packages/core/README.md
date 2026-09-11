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

## Styling components

The library builds Tailwind utilities with the `njc:` prefix. Its shared Tailwind theme maps colors, spacing, fonts, and shadows to the existing design tokens. Calendar uses these utilities with scoped CSS for compound states and mobile portals.

Tailwind CSS 4 or later is a required peer dependency. Consumers load the compiled utilities through `nextjs-components/src/styles/globals.css`, as shown above. The library's compiled styles do not require package source scanning. The build omits Tailwind Preflight; the package's existing global styles own the reset.

Apps that compile their own Tailwind utilities can import `nextjs-components/styles/theme.css` after `tailwindcss` in their CSS entry to use the shared design tokens. Next.js apps use the `@tailwindcss/postcss` plugin. The docs site uses this setup with Tailwind 4.

For library development, use complete utility names, such as `njc:flex njc:gap-2 njc:text-gray-900`. All files under `packages/core/src` are scanned, except tests and snapshots. Run `npm run build:styles`, or keep `npm run dev:styles` running while editing utility classes. Commit the generated `packages/core/src/styles/utilities.css` with source changes. Packing rebuilds it, and CI checks that it is current.

> [!WARNING]
> Dropped `create-react-app` support.
>
> In older versions, usage with `create-react-app` was supported. However, from `>=v1.0.0`, the pre-built `/dist` folder was dropped.
