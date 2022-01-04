<p align="center">
  <b>nextjs-components</b>
</p>

A collection of React components, transcribed from https://vercel.com/design

**Note:** This is not affiliated with [Vercel](https://vercel.com)

[![npm latest package](https://img.shields.io/npm/v/nextjs-components/latest.svg)](https://www.npmjs.com/package/nextjs-components)
[![npm next package](https://img.shields.io/npm/v/nextjs-components/next.svg)](https://www.npmjs.com/package/nextjs-components)

## Motivation

TBD

### Todo's

- [ ] Unit test coverage
- [ ] Unit tests in CI (Github workflows)
- [ ] Add every component to the docs site
- [ ] Deploy the docs site
- [ ] Bundle size?
- [ ] Figure out monorepo situation
  - Lerna? Turborepo?
  - 1 Large components-package or multiple per-component packages?

## Installation

```bash
# with npm
npm i nextjs-components
```

```bash
# with yarn
yarn add nextjs-components
```

This project uses TypeScript and CSS modules. It relies on [next-transpile-modules](https://github.com/martpie/next-transpile-modules) to work in a Next.js app.

```bash
yarn add next-transpile-modules
```

## Usage

Transpile ♻️

```js
// next.config.js
const withTM = require("next-transpile-modules")(["nextjs-components"]);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
```

Import Global CSS 💅

```tsx
// pages/_app.tsx
import "nextjs-components/src/styles/globals.css";
```

Import Components 🎉

```tsx
// pages/home.tsx
import { Badge } from "nextjs-components/src/components/Badge";

export default function Home() {
  return (
    <div>
      <Badge>A badge component</Badge>
    </div>
  );
}
```

## Docs Preview

![image](https://user-images.githubusercontent.com/26389321/148008111-2bde682a-991e-4fa8-b347-77aa9ec9fe49.png)
